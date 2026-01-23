import { useSettingsStore } from "@/lib/store/settings-store"

export type GenerateContentParams = {
    systemPrompt?: string
    userPrompt: string
    model?: string
    locale?: string
}

export class AIService {
    private getSettings() {
        return useSettingsStore.getState().ai
    }

    async generateText(params: GenerateContentParams): Promise<string> {
        const settings = this.getSettings()
        const apiKey = settings.apiKey

        // Fallback to env var if no key in settings (as per user request style, though client-side access to env is limited usually, assume configured or user input)
        // Actually, let's strictly require it or try.
        if (!apiKey) {
            // Check if we can get it from env in this context? 
            // In Next.js client side, process.env.GEMINI_API_KEY might not be available unless prefixed NEXT_PUBLIC.
            // But we will stick to requiring it or passing it if present.
            // throw new Error("Missing API Key.")
        }

        // Check for active character persona
        const { useCharacterStore } = await import('@/lib/store/character-store')
        const activeChar = useCharacterStore.getState().getActiveCharacter()

        // Priority: Param Override -> Character Persona -> Global Default
        let systemPrompt = params.systemPrompt || activeChar?.systemPersona || settings.systemPrompt

        // Force language based on locale
        if (params.locale === 'tr') {
            systemPrompt = `IMPORTANT: Your primary language is Turkish. You MUST respond in Turkish unless explicitly asked to speak another language.\n\n${systemPrompt}`
        } else if (params.locale === 'en') {
            systemPrompt = `IMPORTANT: Your primary language is English. You MUST respond in English unless explicitly asked to speak another language.\n\n${systemPrompt}`
        }

        try {
            return this.callGemini(apiKey, "gemini-2.5-flash", systemPrompt, params.userPrompt)
        } catch (error: any) {
            console.error("AI Service Error:", error)
            throw new Error(error.message || "Failed to generate text")
        }
    }

    private async callGemini(apiKey: string, model: string, system: string, prompt: string): Promise<string> {
        try {
            const { GoogleGenAI } = await import("@google/genai")

            // Allow apiKey to be empty if the environment variable is set in the background (Node.js context)
            // But usually we pass what we have.
            const ai = new GoogleGenAI({ apiKey });

            const response = await ai.models.generateContent({
                model: model, // "gemini-2.5-flash" passed from caller
                contents: `${system ? `System Prompt: ${system}\n\n` : ''}${prompt}`,
            });

            return response.text || "";
        } catch (error: any) {
            console.error("Gemini SDK Error:", error)
            throw new Error(error.message || "Gemini generation failed")
        }
    }




}

export const aiService = new AIService()
