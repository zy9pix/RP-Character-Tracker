"use client"

import { useCharacterStore } from "@/lib/store/character-store"
import { useDashboardStore } from "@/lib/store/dashboard-store"
import { BentoGrid, BentoCard, BentoTitle } from "@/components/dashboard/bento-grid"
import { User, Wallet, History, Zap, Settings2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChatWidget } from "@/components/dashboard/chat-widget"
import { useI18n } from "@/lib/i18n-context"

export default function Dashboard() {
  const { getActiveCharacter, updateCharacter } = useCharacterStore()
  const { t } = useI18n()
  const activeChar = getActiveCharacter()
  const { widgets, toggleWidget, reorderWidgets, updateWidgetSize } = useDashboardStore()

  const [localWidgets, setLocalWidgets] = useState(widgets)
  const [isEditing, setIsEditing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setLocalWidgets(widgets)
  }, [widgets])

  if (!isMounted) return null

  if (!activeChar) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">{t('dashboard.welcome')}</h1>
          <p className="text-muted-foreground">{t('dashboard.select_to_begin')}</p>
        </div>
      </div>
    )
  }

  const renderWidget = (id: string) => {
    switch (id) {
      case 'id-card':
        return (
          <BentoCard className="h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c23] to-[#121418] z-0" />

            {/* ID Card Visual Background Elements */}
            <div className="absolute top-0 left-0 w-full h-16 bg-[#2c2f38]/50 z-0" />
            <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-[10px] border-white/5 z-0" />

            <div className="relative z-10 h-full flex flex-col justify-between p-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-zinc-800 border-2 border-white/10 overflow-hidden shrink-0">
                    {activeChar?.avatarUrl ? (
                      <img src={activeChar.avatarUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">IMG</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t('dashboard.id_card.location')}</div>
                    <div className="text-lg font-bold leading-none">{activeChar?.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-muted-foreground">{t('dashboard.id_card.id_class')}</div>
                  <div className="font-mono font-bold text-primary">A</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-[9px] uppercase text-muted-foreground mb-0.5">{t('dashboard.id_card.occupation')}</div>
                  <div className="text-sm font-medium truncate">{activeChar?.role || t('dashboard.id_card.unemployed')}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-muted-foreground mb-0.5">{t('dashboard.id_card.dob')}</div>
                  <div className="text-sm font-mono">{activeChar?.gtaInfo?.birthDate || t('dashboard.id_card.unknown')}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[9px] uppercase text-muted-foreground mb-0.5">{t('dashboard.id_card.signature')}</div>
                  <div className="text-xl font-handwriting opacity-75">{activeChar?.name}</div>
                </div>
              </div>
            </div>

            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ backgroundPosition: '0% 0%' }} />
          </BentoCard>
        )
      case 'last-entries':
        const w = widgets.find(w => w.id === 'last-entries')
        const size = w?.size || 'wide'
        let limit = 1
        if (size === 'wide') limit = 2
        if (size === 'large') limit = 4

        const entries = (activeChar?.diary || [])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit)

        return (
          <BentoCard className="h-full">
            <BentoTitle icon={History}>{t('dashboard.widgets.last_entries')}</BentoTitle>
            <div className="mt-2 space-y-2">
              {entries.length > 0 ? (
                entries.map(entry => (
                  <div key={entry.id} className="text-sm border-b border-white/5 pb-2 last:border-0">
                    <div className="font-bold text-white truncate">{entry.title}</div>
                    <div className="text-muted-foreground line-clamp-1 mt-0.5 text-xs">{entry.summary || entry.content}</div>
                    <div className="text-[10px] text-zinc-500 mt-1">{new Date(entry.date).toLocaleDateString()}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground italic">{t('dashboard.last_entries.no_entries')}</div>
              )}
            </div>
          </BentoCard>
        )
      case 'quick-actions':
        return (
          <BentoCard className="h-full">
            <BentoTitle icon={Zap}>{t('dashboard.widgets.quick_actions')}</BentoTitle>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link href="/diary?new=true" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                {t('dashboard.quick_actions.new_entry')}
              </Link>
              <Link href="/timeline?new=true" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                {t('dashboard.quick_actions.new_event')}
              </Link>
              <Link href="/profile?edit=true" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                {t('dashboard.quick_actions.edit')}
              </Link>
            </div>
          </BentoCard>
        )
      case 'notes':
        // Note: In a real app, strict separation of concerns would move this to a component.
        // For now, implementing "Inline Component" logic here for speed.
        return <QuickNotesWidget activeChar={activeChar} updateCharacter={updateCharacter} />
      case 'ai-chat':
        return <ChatWidget activeChar={activeChar} updateCharacter={updateCharacter} />
      default:
        return null
    }
  }

  // Filter visible widgets and sort by order (although Reorder group handles order visually)
  const visibleWidgets = widgets.filter(w => w.visible) // rely on store order

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-primary/10 text-primary border-primary" : ""}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? t('dashboard.done_editing') : t('dashboard.customize')}
        </Button>
      </div>

      {isEditing && (
        <div className="p-4 bg-card/30 border border-border rounded-xl mb-6">
          <h3 className="font-medium mb-3 text-sm text-muted-foreground">Toggle Widgets</h3>
          <div className="flex flex-wrap gap-2">
            {widgets.map(w => (
              <button
                key={w.id}
                onClick={() => toggleWidget(w.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                  w.visible
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-zinc-900 text-muted-foreground border-zinc-800 opacity-50 hover:opacity-100"
                )}
              >
                {t(`dashboard.widgets.${w.id.replace(/-/g, '_')}` as any)}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {t('dashboard.editing_hint')}
          </p>
        </div>
      )}

      {/* Reorderable Grid Layout */}
      <motion.div layout className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
        {/* 
            Note: Framer Motion Reorder.Group is great for lists, but tricky for CSS grids.
            For a true masonry/bento drag-and-drop, we need a specialized library like dnd-kit or react-grid-layout.
            However, for this "Bento" style simplified implementation, we will use Reorder.Group with a flex/grid hybrid 
            OR simple list reordering and apply grid spans.
            
            Given I need to stick to standard libraries available:
            I will use a simple mapping and manual order update if Reorder.Group is too complex for 2D grids without plugins.
            Check: Reorder.Group is primarily for 1D lists.
            
            Pivot: I will use a custom sortable interface for now if I can't easily do 2D drag/drop.
            Actually, the user asked for "resize and move". Move could just be "Move Up/Down" buttons or similar if full DnD is hard.
            BUT, let's try Reorder.Group as a wrapped flex list first, which effectively acts as a grid if items have width.
         */}

        {/* NOTE: Since Reorder.Group is 1D, visual reordering in 2D grid is buggy. 
             I will use a standard map + LayoutGroup for animation, but 'Move' buttons for robustness unless I install dnd-kit.
             Wait, user specifically asked 'Cant resize and move'.
             I will implement 'Move Left/Right' arrows in Edit Mode for reliability without heavy deps.
         */}

        {visibleWidgets.map((w, index) => (
          <motion.div
            layout
            key={w.id}
            className={cn(
              "relative group",
              w.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                w.size === 'wide' ? 'md:col-span-2' :
                  w.size === 'tall' ? 'md:row-span-2' : ''
            )}
            transition={{ duration: 0.2 }}
          >
            {isEditing && (
              <div className="absolute top-2 right-2 z-20 flex gap-1 bg-black/80 rounded-md p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Size Controls */}
                <button onClick={() => updateWidgetSize(w.id, 'small')} className={cn("p-1.5 rounded hover:bg-white/20", w.size === 'small' && "text-primary")} title="Small (1x1)">
                  <div className="w-3 h-3 border-2 border-current rounded-sm" />
                </button>
                <button onClick={() => updateWidgetSize(w.id, 'wide')} className={cn("p-1.5 rounded hover:bg-white/20", w.size === 'wide' && "text-primary")} title="Wide (2x1)">
                  <div className="w-5 h-3 border-2 border-current rounded-sm" />
                </button>
                <button onClick={() => updateWidgetSize(w.id, 'large')} className={cn("p-1.5 rounded hover:bg-white/20", w.size === 'large' && "text-primary")} title="Large (2x2)">
                  <div className="w-5 h-5 border-2 border-current rounded-sm" />
                </button>

                <div className="w-px h-4 bg-white/20 mx-1 self-center" />

                {/* Move Controls (Simple Swap) */}
                <button
                  disabled={index === 0}
                  onClick={() => {
                    const newWidgets = [...widgets]
                    const visibleIdx = newWidgets.findIndex(x => x.id === w.id);
                    if (visibleIdx > 0) {
                      // Swap with prev
                      [newWidgets[visibleIdx], newWidgets[visibleIdx - 1]] = [newWidgets[visibleIdx - 1], newWidgets[visibleIdx]];
                      reorderWidgets(newWidgets);
                    }
                  }}
                  className="p-1.5 rounded hover:bg-white/20 disabled:opacity-30"
                  title="Move Back"
                >
                  ←
                </button>
                <button
                  disabled={index === visibleWidgets.length - 1}
                  onClick={() => {
                    const newWidgets = [...widgets]
                    const visibleIdx = newWidgets.findIndex(x => x.id === w.id);
                    if (visibleIdx < newWidgets.length - 1) {
                      // Swap with next
                      [newWidgets[visibleIdx], newWidgets[visibleIdx + 1]] = [newWidgets[visibleIdx + 1], newWidgets[visibleIdx]];
                      reorderWidgets(newWidgets);
                    }
                  }}
                  className="p-1.5 rounded hover:bg-white/20 disabled:opacity-30"
                  title="Move Next"
                >
                  →
                </button>
              </div>
            )}

            {/* Overlay in edit mode to prevent interaction while moving */}
            {isEditing && <div className="absolute inset-0 z-10 border-2 border-transparent hover:border-primary/50 rounded-xl transition-colors pointer-events-none" />}

            {renderWidget(w.id)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function QuickNotesWidget({ activeChar, updateCharacter }: { activeChar: any, updateCharacter: any }) {
  const { t } = useI18n()
  const [note, setNote] = useState(activeChar?.quickNotes || "")

  // Sync local state when char changes
  useEffect(() => {
    setNote(activeChar?.quickNotes || "")
  }, [activeChar?.id, activeChar?.quickNotes])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeChar && note !== activeChar.quickNotes) {
        updateCharacter(activeChar.id, { quickNotes: note })
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [note, activeChar, updateCharacter])

  return (
    <BentoCard className="h-full">
      <BentoTitle>{t('dashboard.widgets.notes')}</BentoTitle>
      <textarea
        className="w-full h-full min-h-[5rem] mt-2 bg-transparent text-sm resize-none focus:outline-none text-muted-foreground p-1"
        placeholder={t('dashboard.quick_notes.placeholder')}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </BentoCard>
  )
}
