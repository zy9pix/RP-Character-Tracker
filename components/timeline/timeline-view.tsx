"use client"

import { TimelineEvent } from "@/lib/types"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Briefcase, Heart, Skull, Calendar } from "lucide-react"

import { useCharacterStore } from "@/lib/store/character-store"
import { Button } from "@/components/ui/core"
import { Pencil, Trash2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export function TimelineView({ events, onEdit }: { events: TimelineEvent[], onEdit: (event: TimelineEvent) => void }) {
    const { getActiveCharacter, deleteTimelineEvent } = useCharacterStore()
    const { t } = useI18n()
    const activeChar = getActiveCharacter()

    if (!events || events.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
                {t('timeline.no_events')}
            </div>
        )
    }

    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const getIcon = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'business': return <Briefcase className="w-4 h-4" />
            case 'relationship': return <Heart className="w-4 h-4" />
            case 'crime': return <Skull className="w-4 h-4" />
            default: return <Calendar className="w-4 h-4" />
        }
    }

    const getColor = (type: TimelineEvent['type']) => {
        switch (type) {
            case 'business': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'relationship': return 'bg-pink-500/10 text-pink-500 border-pink-500/20'
            case 'crime': return 'bg-red-500/10 text-red-500 border-red-500/20'
            default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
        }
    }

    const handleDelete = (e: React.MouseEvent, eventId: string) => {
        e.stopPropagation()
        if (confirm(t('common.confirm_delete'))) {
            if (activeChar) {
                deleteTimelineEvent(activeChar.id, eventId)
            }
        }
    }

    return (
        <div className="relative border-l border-border ml-4 space-y-8 py-4">
            {sortedEvents.map((event, index) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                >
                    {/* Dot */}
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-background ${getColor(event.type).replace('/10', '')} bg-background border-2 border-current`} />

                    <div className="bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors group relative">
                        <div className="flex items-center justify-between mb-2 pr-20">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${getColor(event.type)}`}>
                                {getIcon(event.type)}
                                {t(`timeline.types.${event.type}`)}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                                {format(new Date(event.date), "MMMM d, yyyy")}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors pr-16">{event.title}</h3>
                        <p className="text-muted-foreground text-sm">{event.summary}</p>

                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(event)}>
                                <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={(e) => handleDelete(e, event.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
