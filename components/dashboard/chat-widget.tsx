"use client"

import { useState, useRef, useEffect } from "react"
import { BentoCard, BentoTitle } from "./bento-grid"
import { MessageSquare, Send, Loader2, Trash2 } from "lucide-react"
import { Button, Input } from "@/components/ui/core"
import { aiService } from "@/lib/ai/service"
import { Character } from "@/lib/types"

interface ChatWidgetProps {
    activeChar: Character
    updateCharacter: (id: string, updates: Partial<Character>) => void
}

export function ChatWidget({ activeChar, updateCharacter }: ChatWidgetProps) {
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const messages = activeChar.chatHistory || []

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        setInput("")
        setIsLoading(true)

        // Optimistic update
        const newHistory = [...messages, { role: 'user' as const, content: userMsg }]
        updateCharacter(activeChar.id, { chatHistory: newHistory })

        try {
            const systemPrompt = `You are ${activeChar.name}, a ${activeChar.role} in a roleplay server (${activeChar.gameType || 'GTA'}). 
            Your backstory: ${activeChar.story.slice(0, 500)}. 
            Traits: ${(activeChar.traits as any)?.personality?.join(', ') || 'N/A'}. 
            Respond to the user (who is your player/manager) in character or as a helper depending on context. Be concise.`

            // Construct simple message history for context
            // Taking last 6 messages to save tokens context
            const contextMsgs = newHistory.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')

            const responseText = await aiService.generateText({
                systemPrompt: systemPrompt,
                userPrompt: contextMsgs,
                model: 'gemini-pro' // Default or use settings
            })

            updateCharacter(activeChar.id, {
                chatHistory: [...newHistory, { role: 'assistant', content: responseText }]
            })

        } catch (error) {
            updateCharacter(activeChar.id, {
                chatHistory: [...newHistory, { role: 'assistant', content: "Error: Could not connect to AI mind." }]
            })
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        if (confirm("Clear chat history?")) {
            updateCharacter(activeChar.id, { chatHistory: [] })
        }
    }

    return (
        <BentoCard className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <BentoTitle icon={MessageSquare}>AI Chat</BentoTitle>
                <button onClick={clearChat} className="p-1 hover:text-red-500 text-muted-foreground transition-colors" title="Clear Chat">
                    <Trash2 className="w-3 h-3" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-1 text-sm custom-scrollbar" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground italic mt-4 text-xs">
                        Start a conversation with {activeChar.name}...
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg px-3 py-1.5 ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-zinc-800 text-zinc-200'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-lg px-3 py-1.5 flex items-center">
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            <span className="text-xs">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Message..."
                    className="h-8 text-xs bg-zinc-900/50 border-zinc-800 focus-visible:ring-primary/50"
                    disabled={isLoading}
                />
                <Button size="sm" className="h-8 w-8 p-0" onClick={handleSend} disabled={isLoading}>
                    <Send className="w-3 h-3" />
                </Button>
            </div>
        </BentoCard>
    )
}
