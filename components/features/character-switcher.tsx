"use client"

import { useCharacterStore } from "@/lib/store/character-store"
import { ChevronDown, Plus, User } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CreateCharacterDialog } from "./create-character-dialog"

export function CharacterSwitcher() {
    const { characters, getActiveCharacter, setActiveCharacter } = useCharacterStore()
    const activeChar = getActiveCharacter()
    const [isOpen, setIsOpen] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className="flex items-center gap-3 w-full p-2 rounded-lg opacity-50">
                <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
                <div className="hidden lg:block space-y-2">
                    <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-2 w-12 bg-zinc-800 rounded animate-pulse" />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold overflow-hidden">
                        {activeChar?.avatarUrl ? (
                            <img src={activeChar.avatarUrl} alt={activeChar.name} className="w-full h-full object-cover" />
                        ) : (
                            activeChar?.name.charAt(0) || <User className="w-4 h-4" />
                        )}
                    </div>
                    <div className="flex-1 overflow-hidden hidden lg:block">
                        <p className="text-sm font-bold truncate">{activeChar?.name || "Select Character"}</p>
                        <p className="text-xs text-muted-foreground truncate">{activeChar?.role || "No active session"}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block" />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute bottom-full mb-2 left-0 w-64 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                            >
                                <div className="p-2 space-y-1">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">My Characters</div>
                                    {characters.map((char) => (
                                        <button
                                            key={char.id}
                                            onClick={() => {
                                                setActiveCharacter(char.id)
                                                setIsOpen(false)
                                            }}
                                            className={cn(
                                                "w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors",
                                                activeChar?.id === char.id
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-current" />
                                            {char.name}
                                        </button>
                                    ))}

                                    {characters.length === 0 && (
                                        <div className="px-2 py-2 text-xs text-muted-foreground">No characters found.</div>
                                    )}

                                    <div className="h-px bg-border my-2" />

                                    <button
                                        onClick={() => {
                                            setShowCreate(true)
                                            setIsOpen(false)
                                        }}
                                        className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create New Character
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            <CreateCharacterDialog open={showCreate} onOpenChange={setShowCreate} />
        </>
    )
}
