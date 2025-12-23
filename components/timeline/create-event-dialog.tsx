import { useState, useEffect } from "react"
import { useCharacterStore } from "@/lib/store/character-store"
import { useI18n } from "@/lib/i18n-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { v4 as uuidv4 } from 'uuid'
import { Calendar } from "lucide-react"
import { TimelineEvent } from "@/lib/types"

export function CreateEventDialog({ open, onOpenChange, eventToEdit }: { open: boolean, onOpenChange: (open: boolean) => void, eventToEdit?: TimelineEvent | null }) {
    const { getActiveCharacter, updateCharacter, updateTimelineEvent } = useCharacterStore()
    const { t } = useI18n()
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

        const eventData: TimelineEvent = {
            id: eventToEdit ? eventToEdit.id : uuidv4(),
            title,
            date,
            type,
            summary
        }

        updateTimelineEvent(activeChar.id, eventData)

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{eventToEdit ? t('timeline.dialog.edit_title') : t('timeline.dialog.add_title')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>{t('timeline.dialog.title_label')}</Label>
                        <Input
                            placeholder="e.g. Moved to Los Santos"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>{t('timeline.dialog.date_label')}</Label>
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
                        <Label>{t('timeline.dialog.type_label')}</Label>
                        <Select value={type} onValueChange={(val: any) => setType(val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">{t('timeline.types.personal')}</SelectItem>
                                <SelectItem value="business">{t('timeline.types.business')}</SelectItem>
                                <SelectItem value="relationship">{t('timeline.types.relationship')}</SelectItem>
                                <SelectItem value="crime">{t('timeline.types.crime')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>{t('timeline.dialog.summary_label')}</Label>
                        <Textarea
                            placeholder="Brief description of the event..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">{eventToEdit ? t('timeline.save_event') : t('timeline.add_event')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
