import { Character, Trait, TimelineEvent, DiaryEntry } from '@/lib/types'

export function validateAndMigrateCharacter(data: any): Character {
    // Basic validation
    if (!data.name) throw new Error("Character must have a name")

    // Generate ID if missing
    const id = data.id || crypto.randomUUID()

    // Migrate Traits (Object -> Array if needed, but keeping object support in type might be easier, 
    // let's normalize to the type system if possible, or keep as is if the UI supports it.
    // For now, we'll store the object in the definition but casting to any for flexibility if needed,
    // or ideally converting. Let's convert simple string arrays to Trait objects if we want strictness, 
    // but for now let's just allow the import to flow.)

    // Map timelines
    // content in JSON is "timelineEvents", in type its "timeline"
    const timeline: TimelineEvent[] = (data.timelineEvents || data.timeline || []).map((e: any) => ({
        id: e.id || crypto.randomUUID(),
        title: e.title || "Untitled Event",
        date: e.date || new Date().toISOString(),
        type: e.type || 'personal',
        summary: e.summary || ''
    }))

    return {
        id,
        name: data.name,
        role: data.gtaInfo?.job || "Unknown Role", // Infer role from job
        gameType: data.gameType || 'gta5',

        cash: data.cash || 0,
        bank: data.bank || 0,
        story: data.story || "",

        attributes: data.attributes || [],
        traits: data.traits || { personality: [], physical: [], behavior: [] },
        contacts: data.contacts || [],
        timeline,
        diary: data.diary || [],

        gtaInfo: data.gtaInfo,
        abilities: data.abilities || [],

        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}
