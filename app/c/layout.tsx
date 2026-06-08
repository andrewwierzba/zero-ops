'use client'

import { SidebarProvider } from '@/components/app/application-shell'
import { ThreadsProvider } from '@/components/app/threads-context'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ThreadsProvider>{children}</ThreadsProvider>
        </SidebarProvider>
    )
}
