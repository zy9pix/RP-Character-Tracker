"use client"

import { useCharacterStore } from "@/lib/store/character-store"
import { TimelineView } from "@/components/timeline/timeline-view"
import { CreateEventDialog } from "@/components/timeline/create-event-dialog"
import { Button } from "@/components/ui/core"
import { Card, CardContent } from "@/components/ui/core"
import { Plus, Loader2 } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function TimelineContent() {
    const { getActiveCharacter } = useCharacterStore()
    const activeChar = getActiveCharacter()
    const searchParams = useSearchParams()

    const [showCreate, setShowCreate] = useState(false)
    const [editingEvent, setEditingEvent] = useState<any>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (searchParams.get('new') === 'true') {
            setEditingEvent(null)
            setShowCreate(true)
        }
    }, [searchParams])

    if (!isMounted) return null;

    if (!activeChar) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Card className="max-w-md text-center bg-card/50">
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-bold mb-2">No Character Selected</h2>
                        <p className="text-muted-foreground mb-4">Select a character to view their life events.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
                    <p className="text-muted-foreground">Chronological history of {activeChar.name}</p>
                </div>
                <Button onClick={() => { setEditingEvent(null); setShowCreate(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                </Button>
            </div>

            <TimelineView
                events={activeChar.timeline || []}
                onEdit={(event) => {
                    setEditingEvent(event)
                    setShowCreate(true)
                }}
            />
            <CreateEventDialog
                open={showCreate}
                onOpenChange={(open) => {
                    setShowCreate(open)
                    if (!open) setEditingEvent(null)
                }}
                eventToEdit={editingEvent}
            />
        </div>
    )
}

export default function TimelinePage() {
    return (
        <Suspense fallback={
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <TimelineContent />
        </Suspense>
    )
}
