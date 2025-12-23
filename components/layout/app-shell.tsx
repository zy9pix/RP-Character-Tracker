"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Book, Settings, User, Calendar, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CharacterSwitcher } from '@/components/features/character-switcher'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n-context'

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { t } = useI18n()
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
        { href: '/profile', label: t('nav.profile'), icon: User },
        { href: '/diary', label: t('nav.diary'), icon: Book },
        { href: '/timeline', label: t('nav.timeline'), icon: Calendar },
        { href: '/settings', label: t('nav.settings'), icon: Settings },
    ]

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="h-screen bg-background text-foreground flex overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-xl shrink-0 absolute top-0 w-full z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                        R
                    </div>
                    <span className="font-bold text-xl tracking-tighter">RP Tracker</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground hover:text-foreground">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Sidebar / Dock */}
            <aside className={cn(
                "fixed inset-0 z-10 bg-background lg:static w-full lg:w-64 border-r border-border h-full flex flex-col bg-card/95 lg:bg-card/50 backdrop-blur-xl lg:backdrop-blur-xl shrink-0 transition-transform duration-300 lg:translate-x-0 pt-16 lg:pt-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="hidden lg:flex p-4 items-center justify-center lg:justify-start gap-3 h-16 border-b border-border">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                        R
                    </div>
                    <span className="font-bold text-xl hidden lg:block tracking-tighter">RP Tracker</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                                <span className="block font-medium lg:hidden xl:block">{item.label}</span>
                                <span className="hidden lg:block xl:hidden font-medium ml-2">{item.label.slice(0, 1)}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary hidden lg:block shadow-[0_0_8px_var(--primary)]" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <CharacterSwitcher />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto min-h-0 pt-16 lg:pt-0">
                <div className="max-w-7xl mx-auto p-4 lg:p-10 min-h-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
