import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'



export interface AISettings {
    apiKey: string
    systemPrompt: string
}

interface SettingsState {
    ai: AISettings
    updateAISettings: (settings: Partial<AISettings>) => void
}

const DEFAULT_SYSTEM_PROMPT = `You are a helpful roleplay assistant. 
Analyze the character's diary and provide insights in the tone of a dedicated archivist or a mystical observer.
Be concise and focus on plot development and character consistency.`

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            ai: {
                apiKey: '',
                systemPrompt: DEFAULT_SYSTEM_PROMPT,
            },
            updateAISettings: (settings) =>
                set((state) => ({
                    ai: { ...state.ai, ...settings },
                })),
        }),
        {
            name: 'rp-tracker-settings',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
