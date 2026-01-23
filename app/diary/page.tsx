"use client"

import { useState, useEffect, Suspense } from 'react'
import { useCharacterStore } from '@/lib/store/character-store'
import { DiaryEntry } from '@/lib/types'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/core'
import DiaryEditor from '@/components/diary/editor'
import { aiService } from '@/lib/ai/service'
import { Sparkles, Loader2, Plus, Search, Calendar, ChevronRight, Save, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from "sonner"

import { useSearchParams, useRouter } from 'next/navigation'
import { useI18n } from "@/lib/i18n-context"

function DiaryContent() {
    const { getActiveCharacter, addDiaryEntry, updateDiaryEntry, deleteDiaryEntry } = useCharacterStore()
    const { t } = useI18n()
    const activeChar = getActiveCharacter()
    const searchParams = useSearchParams()

    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [editDate, setEditDate] = useState('')
    const [isMounted, setIsMounted] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
        if (searchParams.get('new') === 'true') {
            handleCreateNew()
            router.replace('/diary')
        }
    }, [searchParams])

    if (!activeChar) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Card className="max-w-md text-center bg-card/50">
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-bold mb-2">{t('common.no_character')}</h2>
                        <p className="text-muted-foreground mb-4">{t('common.select_character')}</p>
                        <Button onClick={() => window.location.href = '/'}>{t('common.no_character_button') || "Go to Dashboard"}</Button>
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
        setEditDate(new Date().toISOString().slice(0, 16)) // Default to now (YYYY-MM-DDTHH:mm)
    }

    useEffect(() => {
        setIsMounted(true)
        if (searchParams.get('new') === 'true') {
            handleCreateNew()
            router.replace('/diary')
        }
    }, [searchParams])

    const handleSave = () => {
        if (!editTitle.trim()) return

        const newEntry: DiaryEntry = {
            id: selectedEntryId || crypto.randomUUID(),
            title: editTitle,
            content: editContent,
            date: editDate ? new Date(editDate).toISOString() : new Date().toISOString(),
            tags: [],
        }

        if (selectedEntryId && !isCreating) {
            updateDiaryEntry(activeChar.id, newEntry)
            toast.success(t('common.updated'))
        } else {
            addDiaryEntry(activeChar.id, newEntry)
            toast.success(t('common.created'))
        }

        setIsCreating(false)
        setSelectedEntryId(newEntry.id)
    }

    const handleSelectEntry = (entry: DiaryEntry) => {
        setSelectedEntryId(entry.id)
        setIsCreating(false)
        setEditTitle(entry.title)
        setEditContent(entry.content)
        // Convert ISO string to datetime-local format (YYYY-MM-DDTHH:mm)
        // This handles timezones loosely, ideally use date-fns format
        try {
            const d = new Date(entry.date)
            setEditDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 16))
        } catch (e) {
            setEditDate(new Date().toISOString().slice(0, 16))
        }
    }

    const handleDelete = (e: React.MouseEvent, entryId: string) => {
        e.stopPropagation()
        if (confirm(t('common.confirm_delete'))) {
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

            const prompt = t('diary.generate_prompt') || `Write a diary entry for today based on the recent events. Maintain the character's voice.`
            const contextLabel = t('diary.context_label') || "Context"

            const generatedText = await aiService.generateText({
                userPrompt: prompt + `\n\n${contextLabel}:\n` + context,
                locale: t('locale_code') || 'en'
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
                    <h2 className="text-2xl font-bold">{t('diary.title')}</h2>
                    <Button size="sm" onClick={handleCreateNew}>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('diary.new_entry')}
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder={t('diary.search')} className="pl-9 bg-card/50" />
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
                            {t('diary.no_entries')}
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
                                placeholder={t('diary.title_placeholder')}
                                className="text-lg font-bold bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary flex-1 mr-4"
                            />
                            {/* Date Picker */}
                            <Input
                                type="datetime-local"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-auto bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0"
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating}
                                    className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary"
                                >
                                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    {t('diary.generate')}
                                </Button>
                                <Button onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {t('diary.save')}
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
                        {t('diary.select_prompt')}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function DiaryPage() {
    return (
        <Suspense fallback={
            <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <DiaryContent />
        </Suspense>
    )
}
