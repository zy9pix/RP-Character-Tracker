"use client"

import { useState } from "react"
import { useCharacterStore } from "@/lib/store/character-store"
import { Button, Input, Label, Card } from "@/components/ui/core"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CreateCharacterDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateCharacterDialog({ open, onOpenChange }: CreateCharacterDialogProps) {
    const { addCharacter } = useCharacterStore()
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [gameType, setGameType] = useState("gta5")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !role) return

        addCharacter({
            id: crypto.randomUUID(),
            name,
            role,
            gameType,
            cash: 0,
            bank: 0,
            story: "",
            attributes: [],
            traits: [],
            contacts: [],
            timeline: [],
            diary: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })

        // Reset
        setName("")
        setRole("")
        onOpenChange(false)
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => onOpenChange(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md"
                    >
                        <Card className="bg-card border-border shadow-2xl">
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <h2 className="text-xl font-bold">New Character</h2>
                                <button onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="e.g. Hana Sterling"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role / Job</Label>
                                    <Input
                                        id="role"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        placeholder="e.g. Architecture Student"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Universe</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setGameType('gta5')}
                                            className={`p-2 rounded border text-sm ${gameType === 'gta5' ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                                        >
                                            GTA V
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGameType('rdr2')}
                                            className={`p-2 rounded border text-sm ${gameType === 'rdr2' ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                                        >
                                            RDR 2
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                                    <Button type="submit">Create Character</Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
