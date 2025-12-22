"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DiaryEditorProps {
    content?: string
    onChange: (content: string) => void
    editable?: boolean
}

export default function DiaryEditor({ content = '', onChange, editable = true }: DiaryEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Dear Diary...',
            }),
        ],
        content,
        editable,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px]',
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div className="border border-border rounded-lg bg-card/30 overflow-hidden">
            {editable && (
                <div className="flex items-center gap-1 p-2 border-b border-border bg-card/50">
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                    >
                        <Bold className="w-4 h-4" />
                    </ToolbarBtn>
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                    >
                        <Italic className="w-4 h-4" />
                    </ToolbarBtn>
                    <div className="w-px h-6 bg-border mx-1" />
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                    >
                        <List className="w-4 h-4" />
                    </ToolbarBtn>
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                    >
                        <ListOrdered className="w-4 h-4" />
                    </ToolbarBtn>
                    <ToolbarBtn
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                    >
                        <Quote className="w-4 h-4" />
                    </ToolbarBtn>
                </div>
            )}
            <div className="p-4">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

function ToolbarBtn({ children, onClick, isActive }: { children: React.ReactNode; onClick: () => void; isActive: boolean }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                isActive && "bg-primary/20 text-primary"
            )}
        >
            {children}
        </button>
    )
}
