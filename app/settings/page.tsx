"use client"

import { useSettingsStore } from "@/lib/store/settings-store"
import { useCharacterStore } from "@/lib/store/character-store"
import { useI18n } from "@/lib/i18n-context"
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/core"
import { Save, Cpu, Key, Database, Sparkles, Globe, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"



export default function SettingsPage() {
    const { ai, updateAISettings } = useSettingsStore()
    const { getActiveCharacter, updateCharacter } = useCharacterStore()
    const { t, locale, setLocale } = useI18n()
    const activeChar = getActiveCharacter()

    const [formData, setFormData] = useState(ai)
    const [characterPersona, setCharacterPersona] = useState("")
    const [isClient, setIsClient] = useState(false)

    // Hydration fix & Sync
    useEffect(() => {
        setFormData(ai)
        if (activeChar) {
            setCharacterPersona(activeChar.systemPersona || "")
        }
        setIsClient(true)
    }, [ai, activeChar])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        updateAISettings({
            apiKey: formData.apiKey,
        })

        if (activeChar) {
            updateCharacter(activeChar.id, { systemPersona: characterPersona })
        }

        toast.success("Settings saved successfully!")
    }

    if (!isClient) return <div className="p-8 text-muted-foreground">Loading settings...</div>

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{t('settings.title')}</h1>
                <p className="text-muted-foreground">{t('settings.subtitle')}</p>
            </div>

            {/* Language Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Globe className="w-5 h-5 text-blue-500" />
                            </div>
                            <CardTitle>{t('settings.language')}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{t('settings.language_desc')}</p>
                            <div className="flex gap-2">
                                <Button
                                    variant={locale === 'en' ? 'default' : 'outline'}
                                    onClick={() => setLocale('en')}
                                    className="w-1/2"
                                >
                                    English
                                    {locale === 'en' && <Check className="w-4 h-4 ml-2" />}
                                </Button>
                                <Button
                                    variant={locale === 'tr' ? 'default' : 'outline'}
                                    onClick={() => setLocale('tr')}
                                    className="w-1/2"
                                >
                                    Türkçe
                                    {locale === 'tr' && <Check className="w-4 h-4 ml-2" />}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Cpu className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle>{t('settings.ai_layer')}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* API Key */}
                        <div className="space-y-2">
                            <Label htmlFor="apiKey" className="flex items-center gap-2">
                                <Key className="w-4 h-4" />
                                API Key
                            </Label>
                            <Input
                                id="apiKey"
                                name="apiKey"
                                type="password"
                                value={formData.apiKey}
                                onChange={handleChange}
                                placeholder="sk-..."
                            />
                            <p className="text-xs text-muted-foreground">
                                {t('settings.api_key_desc')}
                            </p>
                        </div>

                        {/* System Prompt (Per Character) */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="systemPrompt">{t('settings.system_persona')} ({activeChar ? activeChar.name : t('common.no_character')})</Label>
                                {activeChar ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs text-primary hover:text-primary hover:bg-primary/10"
                                        onClick={async () => {
                                            if (!activeChar) return
                                            const { aiService } = await import('@/lib/ai/service')
                                            const toastId = toast.loading("Analyzing character data...")

                                            try {
                                                // Construct context
                                                const context = `
                                                Name: ${activeChar.name}
                                                Role: ${activeChar.role}
                                                Story: ${activeChar.story}
                                                
                                                Stats: Cash $${activeChar.cash}, Bank $${activeChar.bank}
                                                
                                                Recent History:
                                                ${(activeChar.timeline || []).slice(0, 5).map(e => `- ${e.date}: ${e.title} (${e.summary})`).join('\n')}
                                                
                                                Recent Thoughts:
                                                ${(activeChar.diary || []).slice(0, 3).map(e => `- ${e.title}: ${e.content.slice(0, 200)}...`).join('\n')}
                                                `

                                                const prompt = `
                                                You are an expert roleplay assistant. 
                                                Analyze the character data below and write a "System Persona" (System Instructions) for an AI to roleplay as this character.
                                                
                                                The persona should:
                                                1. Be written in 2nd person commands ("You are Hana...", "Speak with a rough tone...").
                                                2. Capture their specific personality, speech patterns, and current life situation.
                                                3. Be concise but comprehensive (max 3-4 sentences).
                                                
                                                Character Data:
                                                ${context}
                                                `

                                                const result = await aiService.generateText({
                                                    userPrompt: prompt,
                                                    locale: t('locale_code') || 'en'
                                                })
                                                setCharacterPersona(result.trim())
                                                toast.success("Persona generated!", { id: toastId })
                                            } catch (err: any) {
                                                console.error(err)
                                                toast.error("Analysis failed: " + err.message, { id: toastId })
                                            }
                                        }}
                                    >
                                        <Sparkles className="w-3 h-3 mr-1.5" />
                                        {t('settings.analyze_autofill')}
                                    </Button>
                                ) : (
                                    <span className="text-xs text-yellow-500">{t('settings.select_char_persona')}</span>
                                )}
                            </div>
                            <textarea
                                id="systemPrompt"
                                name="systemPrompt"
                                rows={4}
                                disabled={!activeChar}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={characterPersona}
                                onChange={(e) => setCharacterPersona(e.target.value)}
                                placeholder="Define how the AI should behave for this specific character..."
                            />
                            <p className="text-xs text-muted-foreground">
                                This persona is unique to <strong>{activeChar?.name || 'the current character'}</strong>.
                            </p>
                        </div>

                        <Button onClick={handleSave} className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            {t('common.save')}
                        </Button>

                    </CardContent>
                </Card>
            </motion.div>

            {/* Data Management Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Database className="w-5 h-5 text-green-500" />
                            </div>
                            <CardTitle>{t('settings.data_management')}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-border">
                            <h3 className="font-bold mb-2">{t('settings.import')}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('settings.import_desc')}
                            </p>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-zinc-800/50 hover:border-primary/50 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Database className="w-8 h-8 mb-3 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold">{t('settings.click_upload')}</span> {t('settings.drag_drop')}</p>
                                    <p className="text-xs text-zinc-500">JSON files only</p>
                                </div>
                                <input type="file" className="hidden" accept=".json" onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return

                                    try {
                                        const text = await file.text()
                                        const json = JSON.parse(text)
                                        const { validateAndMigrateCharacter } = await import('@/lib/import-utils')
                                        const { useCharacterStore } = await import('@/lib/store/character-store')

                                        const character = validateAndMigrateCharacter(json)
                                        useCharacterStore.getState().addCharacter(character)
                                        toast.success(`Successfully imported: ${character.name}`)
                                    } catch (err) {
                                        console.error(err)
                                        toast.error("Failed to import file. Check console for details.")
                                    }
                                }} />
                            </label>
                        </div>

                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-border">
                            <h3 className="font-bold mb-2">{t('settings.export')}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t('settings.export_desc')}
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => {
                                const activeChar = useCharacterStore.getState().getActiveCharacter()
                                if (!activeChar) {
                                    toast.error("No active character to export")
                                    return
                                }
                                const dataStr = JSON.stringify(activeChar, null, 2)
                                const dataBlob = new Blob([dataStr], { type: 'application/json' })
                                const url = URL.createObjectURL(dataBlob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = `${activeChar.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_character.json`
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                                URL.revokeObjectURL(url)
                            }}>
                                <Save className="w-4 h-4 mr-2" />
                                {t('settings.export')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div >
    )
}
