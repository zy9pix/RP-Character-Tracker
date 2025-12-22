"use client"

import { useState, useEffect } from 'react'
import { useCharacterStore } from '@/lib/store/character-store'
import { DiaryEntry } from '@/lib/types'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/core'
import DiaryEditor from '@/components/diary/editor'
import { aiService } from '@/lib/ai/service'
import { Sparkles, Loader2, Plus, Search, Calendar, ChevronRight, Save, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from "sonner"

import { useSearchParams } from 'next/navigation'

export default function DiaryPage() {
    const { getActiveCharacter, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry } = useCharacterStore()
    const activeChar = getActiveCharacter()
    const searchParams = useSearchParams()

    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [isMounted, setIsMounted] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (searchParams.get('new') === 'true') {
            handleCreateNew()
        }
    }, [searchParams])

    if (!isMounted) return null

    if (!activeChar) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Card className="max-w-md text-center bg-card/50">
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-bold mb-2">No Character Selected</h2>
                        <p className="text-muted-foreground mb-4">You need to create or select a character to access your diary.</p>
                        <Button onClick={() => window.location.href = '/'}>Go to Dashboard</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const sortedEntries = [...(activeChar.diary || [])].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const handleCreateNew = () => {
        setSelectedEntryId(null)
        setIsCreating(true)
        setEditTitle('')
        setEditContent('')
    }

    const handleSave = () => {
        if (!editTitle.trim()) return

        const newEntry: DiaryEntry = {
            id: selectedEntryId || crypto.randomUUID(),
            title: editTitle,
            content: editContent,
            date: selectedEntryId ? (activeChar.diary?.find(e => e.id === selectedEntryId)?.date || new Date().toISOString()) : new Date().toISOString(),
            tags: [],
        }

        if (selectedEntryId && !isCreating) {
            updateDiaryEntry(activeChar.id, newEntry)
            toast.success("Diary entry updated")
        } else {
            addDiaryEntry(activeChar.id, newEntry)
            toast.success("Diary entry created")
        }

        setIsCreating(false)
        setSelectedEntryId(newEntry.id)
    }

    const handleSelectEntry = (entry: DiaryEntry) => {
        setSelectedEntryId(entry.id)
        setIsCreating(false)
        setEditTitle(entry.title)
        setEditContent(entry.content)
    }

    const handleDelete = (e: React.MouseEvent, entryId: string) => {
        e.stopPropagation()
        if (confirm("Are you sure you wish to delete this entry?")) {
            deleteDiaryEntry(activeChar.id, entryId)
            if (selectedEntryId === entryId) {
                setSelectedEntryId(null)
                setIsCreating(false)
            }
            toast.success("Entry deleted")
        }
    }

    const handleGenerateAI = async () => {
        if (!activeChar) return
        setIsGenerating(true)

        try {
            // Gather context
            const recentEvents = (activeChar.timeline || [])
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)

            const recentEntries = (activeChar.diary || [])
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)

            const context = `
            Character: ${activeChar.name} (${activeChar.role})
            BioSummary: ${activeChar.story.slice(0, 300)}...
            
            Recent Events:
            ${recentEvents.map(e => `- ${e.date}: ${e.title} (${e.summary})`).join('\n')}
            
            Recent Diary Entries for Style Reference:
            ${recentEntries.map(e => `[${e.title}]: ${e.content.slice(0, 100)}...`).join('\n')}
            `

            const prompt = `Write a diary entry for today based on the recent events. Maintain the character's voice.`

            const generatedText = await aiService.generateText({
                userPrompt: prompt + "\n\nContext:\n" + context
            })

            // If new, set title too maybe?
            if (!editTitle) setEditTitle(`Entry: ${new Date().toLocaleDateString()}`)
            setEditContent(prev => prev + (prev ? "\n\n" : "") + generatedText)
            toast.success("Generated entry content")

        } catch (error: any) {
            toast.error("AI Generation Failed: " + error.message)
        } finally {
            setIsGenerating(false)
        }
    }

    const selectedEntry = activeChar.diary?.find(e => e.id === selectedEntryId)

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">

            {/* Sidebar List */}
            <div className="w-1/3 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Diary</h2>
                    <Button size="sm" onClick={handleCreateNew}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Entry
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search entries..." className="pl-9 bg-card/50" />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    <AnimatePresence mode="popLayout">
                        {sortedEntries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={() => handleSelectEntry(entry)}
                                className={`
                    p-4 rounded-xl border cursor-pointer transition-all group relative pr-10
                    ${selectedEntryId === entry.id
                                        ? 'bg-primary/10 border-primary shadow-[0_0_15px_-5px_var(--primary)]'
                                        : 'bg-card border-border hover:border-primary/50'}
                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-semibold truncate ${selectedEntryId === entry.id ? 'text-primary' : ''}`}>
                                        {entry.title}
                                    </h3>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedEntryId === entry.id ? 'text-primary rotate-90' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`} />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(entry.date), 'MMM d, yyyy')}
                                </div>
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => handleDelete(e, entry.id)}
                                    title="Delete Entry"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {sortedEntries.length === 0 && (
                        <div className="text-center p-8 text-muted-foreground border border-dashed border-border rounded-xl">
                            No entries yet. Start writing!
                        </div>
                    )}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col gap-4">
                {(selectedEntryId || isCreating) ? (
                    <motion.div
                        key={selectedEntryId || 'new'}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex gap-4 mb-4 justify-between">
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Entry Title..."
                                className="text-lg font-bold bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary flex-1 mr-4"
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating}
                                    className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary"
                                >
                                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    Generate
                                </Button>
                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <DiaryEditor
                                content={editContent}
                                onChange={setEditContent}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground border border-dashed border-border rounded-xl bg-card/20">
                        Select an entry or create a new one.
                    </div>
                )}
            </div>
        </div>
    )
}
