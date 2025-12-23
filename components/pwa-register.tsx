"use client"

import { useEffect } from "react"

declare global {
    interface Window {
        workbox: any
    }
}

export default function RegisterPWA() {
    useEffect(() => {
        if ("serviceWorker" in navigator && window.workbox !== undefined) {
            const wb = window.workbox
            wb.register()
                .then((registration: any) => {
                    console.log("SW Registered: ", registration)
                })
                .catch((err: any) => {
                    console.error("SW Registration Failed: ", err)
                })
        } else if ("serviceWorker" in navigator) {
            // Fallback if workbox isn't available globally
            navigator.serviceWorker.register("/sw.js")
                .then(reg => console.log("Standard SW Registered:", reg))
                .catch(err => console.error("Standard SW Failed:", err))
        }
    }, [])

    return null
}
