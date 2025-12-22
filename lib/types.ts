export type CharacterAttribute = {
    id: string
    name: string
    value: number // 0-100 or similar
    category: 'physical' | 'mental' | 'social'
}

export type Trait = {
    id: string
    label: string
    type: 'personality' | 'physical' | 'behavior'
}

export type Contact = {
    id: string
    name: string
    relation: string
    lastContact: string
    notes: string
}

export type TimelineEvent = {
    id: string
    title: string
    date: string
    type: 'crime' | 'relationship' | 'business' | 'personal'
    summary: string
}

export type DiaryEntry = {
    id: string
    title: string
    content: string // HTML or Markdown
    date: string // ISO String
    tags: string[]
    summary?: string
    sentiment?: 'neutral' | 'positive' | 'negative'
}

export type Character = {
    id: string
    name: string
    role: string
    gameType: 'gta5' | 'rdr2' | 'gta' | string // Flexible for imports
    avatarUrl?: string // Custom avatar URL

    // Stats & Info
    cash: number
    bank: number
    story: string
    quickNotes?: string

    // Collections
    attributes: CharacterAttribute[]
    traits: Trait[] | { personality: string[], physical: string[], behavior: string[] } | any // Flexible for legacy/import
    contacts: Contact[]
    timeline: TimelineEvent[]
    diary: DiaryEntry[]

    // Extra fields from import
    gtaInfo?: Record<string, string>
    systemPersona?: string // Per-character AI persona
    abilities?: { id: string; name: string; level: number }[]
    chatHistory?: { role: 'user' | 'assistant'; content: string }[]

    // Meta
    createdAt: string
    updatedAt: string
}

export type CharacterState = {
    activeCharacterId: string | null
    characters: Character[]

    // Actions
    setActiveCharacter: (id: string) => void
    addCharacter: (character: Character) => void
    updateCharacter: (id: string, updates: Partial<Character>) => void
    deleteCharacter: (id: string) => void
    updateTimelineEvent: (characterId: string, event: TimelineEvent) => void
    deleteTimelineEvent: (characterId: string, eventId: string) => void
    addDiaryEntry: (characterId: string, entry: DiaryEntry) => void
    updateDiaryEntry: (characterId: string, entry: DiaryEntry) => void
    deleteDiaryEntry: (characterId: string, entryId: string) => void

    // Computed
    getActiveCharacter: () => Character | undefined
}
