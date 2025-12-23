"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations, Locale, TranslationKey } from "./translations"

type I18nContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en')

    // Load from localStorage or System
    useEffect(() => {
        const stored = localStorage.getItem('app-locale') as Locale
        if (stored && (stored === 'en' || stored === 'tr')) {
            setLocale(stored)
        } else {
            // System detection
            const sysLang = typeof navigator !== 'undefined' ? navigator.language : 'en'
            if (sysLang.startsWith('tr')) {
                setLocale('tr')
            }
        }
    }, [])

    const t = (key: string) => {
        const keys = key.split('.')
        let current: any = translations[locale]

        for (const k of keys) {
            if (current[k] === undefined) return key
            current = current[k]
        }

        return typeof current === 'string' ? current : key
    }

    const changeLocale = (newLocale: Locale) => {
        setLocale(newLocale)
        localStorage.setItem('app-locale', newLocale)
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider")
    }
    return context
}
