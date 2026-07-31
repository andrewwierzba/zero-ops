'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/patterns/chat/bubble', label: 'Bubble' },
    { href: '/patterns/chat/chart', label: 'Chart' },
    { href: '/patterns/chat/code-block', label: 'Code block' },
    { href: '/patterns/chat/code-change', label: 'Code change' },
    { href: '/patterns/chat/graph', label: 'Graph' },
    { href: '/patterns/chat/preview', label: 'Preview' },
] as const

function ChatNav() {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col gap-1 p-6 shrink-0 w-64">
            <span className="text-muted-foreground text-xs font-medium px-3 py-2">Components</span>
            {navItems.map(({ href, label }) => {
                const active = pathname === href

                return (
                    <Link
                        aria-current={active ? 'page' : undefined}
                        className="hover:bg-accent rounded-lg text-sm px-3 py-2 data-active:bg-accent"
                        data-active={active || undefined}
                        href={href}
                        key={href}
                    >
                        {label}
                    </Link>
                )
            })}

            <span className="text-muted-foreground text-xs font-medium px-3 py-2">Explorations</span>
        </nav>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
            <ChatNav />
            <div className="flex-1 text-[13px] min-w-0 overflow-y-auto py-6">
                {children}
            </div>
        </div>
    )
}
