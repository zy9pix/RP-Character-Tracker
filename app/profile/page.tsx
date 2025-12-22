"use client"

import { useCharacterStore } from "@/lib/store/character-store"
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "@/components/ui/core"
import { Scroll, Shield, Zap, Pencil, Save, X, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Character } from "@/lib/types"

export default function ProfilePage() {
    const { getActiveCharacter, updateCharacter } = useCharacterStore()
    const activeChar = getActiveCharacter()

    const [isMounted, setIsMounted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    // Form State
    const [formData, setFormData] = useState<Partial<Character>>({})
    const [traitsInput, setTraitsInput] = useState({
        personality: "",
        physical: ""
    })

    useEffect(() => {
        setIsMounted(true)
        if (activeChar) {
            resetForm(activeChar)
        }
    }, [activeChar])

    const resetForm = (char: Character) => {
        setFormData(JSON.parse(JSON.stringify(char))) // Deep copy

        // Handle legacy traits structure safely
        const pTraits = (char.traits as any)?.personality || []
        const phTraits = (char.traits as any)?.physical || []

        setTraitsInput({
            personality: Array.isArray(pTraits) ? pTraits.join(", ") : "",
            physical: Array.isArray(phTraits) ? phTraits.join(", ") : ""
        })
    }

    if (!isMounted) return null

    if (!activeChar) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">No Character Selected</h2>
                    <p className="text-muted-foreground">Select a character to view their profile.</p>
                </div>
            </div>
        )
    }

    const handleSave = () => {
        if (!formData) return

        // Process traits back to arrays
        const processedTraits = {
            personality: traitsInput.personality.split(',').map(s => s.trim()).filter(Boolean),
            physical: traitsInput.physical.split(',').map(s => s.trim()).filter(Boolean),
            behavior: [] // Preserve if exists? ignoring for now as per UI
        }

        updateCharacter(activeChar.id, {
            ...formData,
            traits: processedTraits
        })

        setIsEditing(false)
    }

    const handleCancel = () => {
        resetForm(activeChar)
        setIsEditing(false)
    }

    const updateAbility = (index: number, field: string, value: any) => {
        const newAbilities = [...(formData.abilities || [])]
        newAbilities[index] = { ...newAbilities[index], [field]: value }
        setFormData({ ...formData, abilities: newAbilities })
    }

    const addAbility = () => {
        setFormData({
            ...formData,
            abilities: [...(formData.abilities || []), { id: crypto.randomUUID(), name: "New Skill", level: 1 }]
        })
    }

    const removeAbility = (index: number) => {
        const newAbilities = [...(formData.abilities || [])]
        newAbilities.splice(index, 1)
        setFormData({ ...formData, abilities: newAbilities })
    }

    const updateGtaInfo = (field: string, value: string) => {
        setFormData({
            ...formData,
            gtaInfo: { ...(formData.gtaInfo || {}), [field]: value }
        })
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    {activeChar.avatarUrl ? (
                        <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-primary overflow-hidden">
                            <img src={activeChar.avatarUrl} alt={activeChar.name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-primary flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary">{activeChar.name.charAt(0)}</span>
                        </div>
                    )}

                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <Input
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="text-2xl font-bold font-sans"
                                    placeholder="Character Name"
                                />
                                <div className="flex gap-2">
                                    <Input
                                        value={formData.avatarUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                                        className="text-xs"
                                        placeholder="Avatar URL (https://...)"
                                    />
                                    <Input
                                        value={formData.role || ''}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="text-xs w-32"
                                        placeholder="Role"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-4xl font-bold tracking-tight">{activeChar.name}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs uppercase tracking-wider font-bold">
                                        {activeChar.gameType}
                                    </span>
                                    <span>{activeChar.role}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="ghost" onClick={handleCancel}>
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Stats & Traits */}
                <div className="space-y-6">
                    {/* Vitals - Read Only (Removed from Edit Scope per user request) */}
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                Vitals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Health</span>
                                    <span className="text-emerald-500 font-bold">100%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Armor</span>
                                    <span className="text-blue-500 font-bold">50%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="w-1/2 h-full bg-blue-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats / Abilities */}
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" />
                                Abilities & Skills
                            </CardTitle>
                            {isEditing && (
                                <Button size="sm" variant="ghost" onClick={addAbility} className="h-6 w-6 p-0">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {formData.abilities && formData.abilities.length > 0 ? (
                                formData.abilities.map((ability: any, index: number) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex justify-between text-sm mb-1 items-center">
                                            {isEditing ? (
                                                <input
                                                    className="bg-transparent border-b border-white/10 focus:border-primary outline-none w-1/2 text-sm"
                                                    value={ability.name}
                                                    onChange={(e) => updateAbility(index, 'name', e.target.value)}
                                                />
                                            ) : (
                                                <span>{ability.name}</span>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <span className="text-primary font-bold">{ability.level}/10</span>
                                                {isEditing && (
                                                    <Trash2
                                                        className="w-3 h-3 text-red-500 cursor-pointer hover:text-red-400"
                                                        onClick={() => removeAbility(index)}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {isEditing ? (
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                value={ability.level}
                                                onChange={(e) => updateAbility(index, 'level', parseInt(e.target.value))}
                                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        ) : (
                                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(ability.level / 10) * 100}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No abilities listed.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Traits */}
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" />
                                Traits
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <span className="text-xs text-muted-foreground uppercase">Personality</span>
                                    {isEditing ? (
                                        <Input
                                            value={traitsInput.personality}
                                            onChange={(e) => setTraitsInput({ ...traitsInput, personality: e.target.value })}
                                            placeholder="Brave, Calm, etc. (comma separated)"
                                            className="text-xs h-8"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-1.5">
                                            {(activeChar.traits as any)?.personality?.map((t: string) => (
                                                <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-xs border border-zinc-700">{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs text-muted-foreground uppercase">Physical</span>
                                    {isEditing ? (
                                        <Input
                                            value={traitsInput.physical}
                                            onChange={(e) => setTraitsInput({ ...traitsInput, physical: e.target.value })}
                                            placeholder="Tall, Scarred (comma separated)"
                                            className="text-xs h-8"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-1.5">
                                            {(activeChar.traits as any)?.physical?.map((t: string) => (
                                                <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-xs border border-zinc-700 text-zinc-400">{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Center/Right: Details & Bio */}
                <div className="lg:col-span-2 space-y-6">

                    {/* GTA Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-card/50">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Origin & Why LS</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                {isEditing ? (
                                    <>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Origin</Label>
                                            <Input value={formData.gtaInfo?.origin || ""} onChange={(e) => updateGtaInfo('origin', e.target.value)} />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Why Los Santos?</Label>
                                            <Input value={formData.gtaInfo?.whyLS || ""} onChange={(e) => updateGtaInfo('whyLS', e.target.value)} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold">{activeChar.gtaInfo?.origin || "Unknown"}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{activeChar.gtaInfo?.whyLS}</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Family & Contact</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                {isEditing ? (
                                    <>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Family / Kin</Label>
                                            <Input value={formData.gtaInfo?.family || ""} onChange={(e) => updateGtaInfo('family', e.target.value)} />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Phone Number</Label>
                                            <Input value={formData.gtaInfo?.phoneNumber || ""} onChange={(e) => updateGtaInfo('phoneNumber', e.target.value)} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold">{activeChar.gtaInfo?.family || "None"}</p>
                                        <p className="font-mono text-primary text-sm mt-1">{activeChar.gtaInfo?.phoneNumber || "N/A"}</p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 sm:col-span-2">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Address & Status</CardTitle></CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <div className="flex gap-4">
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-xs">Residential Address</Label>
                                            <Input value={formData.gtaInfo?.address || ""} onChange={(e) => updateGtaInfo('address', e.target.value)} />
                                        </div>
                                        <div className="w-1/3 space-y-1">
                                            <Label className="text-xs">Status</Label>
                                            <Input value={formData.gtaInfo?.currentStatus || ""} onChange={(e) => updateGtaInfo('currentStatus', e.target.value)} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <p className="truncate text-sm" title={activeChar.gtaInfo?.address}>{activeChar.gtaInfo?.address || "Homeless"}</p>
                                        <span className="text-xs px-2 py-1 rounded bg-zinc-800 border border-zinc-700">{activeChar.gtaInfo?.currentStatus}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="h-full bg-card/50 min-h-[400px]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Scroll className="w-4 h-4 text-primary" />
                                Background Story
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-full pb-16">
                            <textarea
                                className={`w-full h-[400px] bg-transparent border-0 resize-none focus:outline-none leading-relaxed p-0 ${isEditing ? 'text-foreground' : 'text-muted-foreground'}`}
                                value={formData.story || ""}
                                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                                placeholder="Write your character's backstory here..."
                                readOnly={!isEditing}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
