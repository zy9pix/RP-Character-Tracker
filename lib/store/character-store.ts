import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Character, CharacterState } from '@/lib/types'

export const useCharacterStore = create<CharacterState>()(
    persist(
        (set, get) => ({
            activeCharacterId: null,
            characters: [],

            setActiveCharacter: (id) => set({ activeCharacterId: id }),

            addCharacter: (character) =>
                set((state) => ({
                    characters: [...state.characters, character],
                    activeCharacterId: character.id,
                })),

            updateCharacter: (id, updates) =>
                set((state) => ({
                    characters: state.characters.map((char) =>
                        char.id === id ? { ...char, ...updates, updatedAt: new Date().toISOString() } : char
                    ),
                })),

            deleteCharacter: (id) =>
                set((state) => ({
                    characters: state.characters.filter((char) => char.id !== id),
                    activeCharacterId: state.activeCharacterId === id ? null : state.activeCharacterId,
                })),

            updateTimelineEvent: (characterId, event) =>
                set((state) => ({
                    characters: state.characters.map((char) => {
                        if (char.id !== characterId) return char
                        const currentTimeline = char.timeline || []
                        const eventIndex = currentTimeline.findIndex(e => e.id === event.id)
                        let newTimeline

                        if (eventIndex >= 0) {
                            // Update existing
                            newTimeline = [...currentTimeline]
                            newTimeline[eventIndex] = event
                        } else {
                            // Add new (fallback)
                            newTimeline = [...currentTimeline, event]
                        }

                        return { ...char, timeline: newTimeline, updatedAt: new Date().toISOString() }
                    })
                })),

            deleteTimelineEvent: (characterId, eventId) =>
                set((state) => ({
                    characters: state.characters.map((char) => {
                        if (char.id !== characterId) return char
                        return {
                            ...char,
                            timeline: (char.timeline || []).filter(e => e.id !== eventId),
                            updatedAt: new Date().toISOString()
                        }
                    })
                })),

            addDiaryEntry: (characterId, entry) =>
                set((state) => ({
                    characters: state.characters.map((char) => {
                        if (char.id !== characterId) return char
                        return {
                            ...char,
                            diary: [entry, ...(char.diary || [])],
                            updatedAt: new Date().toISOString()
                        }
                    })
                })),

            updateDiaryEntry: (characterId, entry) =>
                set((state) => ({
                    characters: state.characters.map((char) => {
                        if (char.id !== characterId) return char
                        return {
                            ...char,
                            diary: (char.diary || []).map(e => e.id === entry.id ? entry : e),
                            updatedAt: new Date().toISOString()
                        }
                    })
                })),

            deleteDiaryEntry: (characterId, entryId) =>
                set((state) => ({
                    characters: state.characters.map((char) => {
                        if (char.id !== characterId) return char
                        return {
                            ...char,
                            diary: (char.diary || []).filter(e => e.id !== entryId),
                            updatedAt: new Date().toISOString()
                        }
                    })
                })),

            getActiveCharacter: () => {
                const state = get()
                return state.characters.find((c) => c.id === state.activeCharacterId)
            },
        }),
        {
            name: 'rp-character-tracker-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
