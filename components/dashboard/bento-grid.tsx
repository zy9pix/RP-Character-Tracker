
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface BentoCardProps {
    children: React.ReactNode
    className?: string
    colSpan?: number
    rowSpan?: number
}

export function BentoGrid({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground rounded-2xl border border-border/50 p-6 flex flex-col relative overflow-hidden transition-all duration-300 hover:border-primary/50 group",
                colSpan === 2 && "lg:col-span-2",
                colSpan === 3 && "lg:col-span-3",
                rowSpan === 2 && "lg:row-span-2",
                className
            )}
        >
            {children}
        </div>
    )
}

export function BentoTitle({ children, className, icon: Icon }: { children: React.ReactNode, className?: string, icon?: LucideIcon }) {
    return (
        <div className={cn("text-lg font-bold flex items-center gap-2 mb-2 text-foreground/90", className)}>
            {Icon && <Icon className="w-5 h-5 text-primary" />}
            {children}
        </div>
    )
}

export function BentoValue({ children, className, size = 'lg' }: { children: React.ReactNode, className?: string, size?: 'md' | 'lg' | 'xl' }) {
    return (
        <div
            className={cn(
                "font-mono tracking-tighter text-foreground font-bold",
                size === 'md' && "text-xl",
                size === 'lg' && "text-3xl",
                size === 'xl' && "text-5xl",
                className
            )}
        >
            {children}
        </div>
    )
}
