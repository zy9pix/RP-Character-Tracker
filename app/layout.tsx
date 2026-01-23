import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/app-shell";
import RegisterPWA from "@/components/pwa-register";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Set base URL for metadata resolution
  title: "RoleBase",
  description: "Advanced tracker and diary for your roleplay characters.",
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon-16x16.png',
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Often desired for PWA to feel native
};

import { I18nProvider } from "@/lib/i18n-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <AppShell>
            {children}
          </AppShell>
        </I18nProvider>
        <RegisterPWA />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

import { Toaster } from "sonner";
