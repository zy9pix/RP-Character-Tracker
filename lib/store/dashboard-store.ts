import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DashboardWidget {
    id: string
    label: string
    visible: boolean
    order: number
    size: 'small' | 'wide' | 'large' | 'tall'
}

interface DashboardState {
    widgets: DashboardWidget[]
    toggleWidget: (id: string) => void
    reorderWidgets: (newOrder: DashboardWidget[]) => void
    updateWidgetSize: (id: string, size: DashboardWidget['size']) => void
    resetLayout: () => void
}

const DEFAULT_WIDGETS: DashboardWidget[] = [
    { id: 'id-card', label: 'ID Card', visible: true, order: 0, size: 'wide' },
    { id: 'last-entries', label: 'Last Entries', visible: true, order: 1, size: 'wide' },
    { id: 'quick-actions', label: 'Quick Actions', visible: true, order: 2, size: 'small' },
    { id: 'notes', label: 'Quick Notes', visible: true, order: 3, size: 'wide' },
    { id: 'ai-chat', label: 'AI Assistant', visible: false, order: 4, size: 'wide' },
]

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set) => ({
            widgets: DEFAULT_WIDGETS,

            toggleWidget: (id) => set((state) => ({
                widgets: state.widgets.map((w) =>
                    w.id === id ? { ...w, visible: !w.visible } : w
                )
            })),

            reorderWidgets: (newOrder) => set({ widgets: newOrder }),

            updateWidgetSize: (id, size) => set((state) => ({
                widgets: state.widgets.map((w) =>
                    w.id === id ? { ...w, size } : w
                )
            })),

            resetLayout: () => set({ widgets: DEFAULT_WIDGETS })
        }),
        {
            name: 'dashboard-layout-storage',
        }
    )
)
