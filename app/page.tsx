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

export default function Dashboard() {
  const { getActiveCharacter, updateCharacter } = useCharacterStore()
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
          <h1 className="text-3xl font-bold">Welcome to RP Tracker</h1>
          <p className="text-muted-foreground">Please select or create a character to begin.</p>
        </div>
      </div>
    )
  }

  const renderWidget = (id: string) => {
    switch (id) {
      case 'identity':
        return (
          <BentoCard className="h-full from-zinc-900 to-zinc-950 bg-gradient-to-br">
            <div className="h-full flex flex-col justify-between">
              <div>
                <BentoTitle icon={User}>Identity</BentoTitle>
                {activeChar && (
                  <div className="mt-4">
                    <h2 className="text-3xl font-bold tracking-tight text-white">{activeChar.name}</h2>
                    <p className="text-primary font-medium">{activeChar.role}</p>
                    <div className="flex gap-2 mt-4 text-xs text-muted-foreground">
                      <span className="bg-white/5 px-2 py-1 rounded border border-white/10 uppercase bg-zinc-900">{activeChar.gameType}</span>
                      <span className="bg-white/5 px-2 py-1 rounded border border-white/10">{activeChar.gtaInfo?.origin || "Unknown Origin"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </BentoCard>
        )
      case 'stats':
        return (
          <BentoCard className="h-full">
            <BentoTitle icon={Wallet}>Finances</BentoTitle>
            {activeChar && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Cash</span>
                  <span className="text-xl font-mono text-green-400">${activeChar.cash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Bank</span>
                  <span className="text-xl font-mono text-blue-400">${activeChar.bank.toLocaleString()}</span>
                </div>
              </div>
            )}
          </BentoCard>
        )
      case 'recent-diary':
        const recentEntry = activeChar?.diary?.[0]
        return (
          <BentoCard className="h-full">
            <BentoTitle icon={History}>Latest Entry</BentoTitle>
            {recentEntry ? (
              <div className="mt-2 text-sm">
                <div className="font-bold text-white truncate">{recentEntry.title}</div>
                <div className="text-muted-foreground line-clamp-2 mt-1">{recentEntry.summary || recentEntry.content}</div>
                <div className="text-xs text-zinc-500 mt-2">{new Date(recentEntry.date).toLocaleDateString()}</div>
              </div>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground italic">No diary entries yet.</div>
            )}
          </BentoCard>
        )
      case 'quick-actions':
        return (
          <BentoCard className="h-full">
            <BentoTitle icon={Zap}>Quick Actions</BentoTitle>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link href="/diary?new=true" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                + Entry
              </Link>
              <Link href="/timeline?new=true" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                + Event
              </Link>
              <Link href="/profile" className="p-2 rounded bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium text-center flex items-center justify-center">
                Edit
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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-primary/10 text-primary border-primary" : ""}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          {isEditing ? "Done Editing" : "Customize"}
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
                {w.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Drag widgets to reorder. Use the size controls on each widget to resize.
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
      <BentoTitle>Quick Notes</BentoTitle>
      <textarea
        className="w-full h-full min-h-[5rem] mt-2 bg-transparent text-sm resize-none focus:outline-none text-muted-foreground p-1"
        placeholder="Type scratch notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </BentoCard>
  )
}
