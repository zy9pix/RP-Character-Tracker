import { useState, useEffect } from "react"
import { useCharacterStore } from "@/lib/store/character-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { v4 as uuidv4 } from 'uuid'
import { Calendar } from "lucide-react"
import { TimelineEvent } from "@/lib/types"

export function CreateEventDialog({ open, onOpenChange, eventToEdit }: { open: boolean, onOpenChange: (open: boolean) => void, eventToEdit?: TimelineEvent | null }) {
    const { getActiveCharacter, updateCharacter, updateTimelineEvent } = useCharacterStore()
    const activeChar = getActiveCharacter()

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [type, setType] = useState<"crime" | "relationship" | "business" | "personal">("personal")
    const [summary, setSummary] = useState("")

    useEffect(() => {
        if (open && eventToEdit) {
            setTitle(eventToEdit.title)
            setDate(eventToEdit.date)
            setType(eventToEdit.type)
            setSummary(eventToEdit.summary)
        } else if (open) {
            // Reset for create
            setTitle("")
            setDate("")
            setType("personal")
            setSummary("")
        }
    }, [open, eventToEdit])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!activeChar) return

        if (eventToEdit) {
            // Update
            updateTimelineEvent(activeChar.id, {
                id: eventToEdit.id,
                title,
                date,
                type,
                summary
            })
        } else {
            // Create
            const newEvent: TimelineEvent = {
                id: uuidv4(),
                title,
                date,
                type,
                summary
            }
            const currentEvents = activeChar.timeline || []
            updateCharacter(activeChar.id, {
                timeline: [...currentEvents, newEvent]
            })
        }

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{eventToEdit ? "Edit Timeline Event" : "Add Timeline Event"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Event Title</Label>
                        <Input
                            placeholder="e.g. Moved to Los Santos"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Date</Label>
                        <div className="relative">
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select value={type} onValueChange={(val: any) => setType(val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="relationship">Relationship</SelectItem>
                                <SelectItem value="crime">Crime</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Summary</Label>
                        <Textarea
                            placeholder="Brief description of the event..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">{eventToEdit ? "Save Changes" : "Add Event"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
