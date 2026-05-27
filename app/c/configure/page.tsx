'use client'

import { ClockIcon, PlugIcon, WrenchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { usePanelRef } from 'react-resizable-panels'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import Threads from '@/components/app/threads'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const configItems = [
    {
        description: 'Connect your systems and services.',
        href: '/c/connections',
        icon: PlugIcon,
        title: 'Connections',
    },
    {
        description: 'Extend capabilities with tools.',
        href: '/c/tools',
        icon: WrenchIcon,
        title: 'Tools',
    },
    {
        description: 'Create and manage automated agents.',
        href: '/c/configure/automation',
        icon: ClockIcon,
        title: 'Automations',
    },
]

function Page() {
    const router = useRouter()
    const [threadsOpen, setThreadsOpen] = useState(true)
    const threadsPanelRef = usePanelRef()

    function handleThreadsToggle() {
        if (threadsOpen) {
            threadsPanelRef.current?.collapse()
        } else {
            threadsPanelRef.current?.expand()
        }
        setThreadsOpen((o) => !o)
    }

    return (
        <ApplicationShell>
            <ApplicationContent>
                <ResizablePanelGroup>
                    <ResizablePanel
                        className="flex"
                        collapsedSize="48px"
                        collapsible
                        defaultSize="200px"
                        minSize="200px"
                        panelRef={threadsPanelRef}
                    >
                        <Threads panelOpen={threadsOpen} onToggle={handleThreadsToggle} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="flex" minSize="200px">
                        <div className="flex flex-1 flex-col gap-6 max-w-3xl mx-auto p-6">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-2xl font-semibold">Configure</h1>
                                <span className="text-muted-foreground text-sm ">Manage connections, tools, and automations.</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {configItems.map(({ icon: Icon, title, description, href }) => (
                                    <Card
                                        className="cursor-pointer transition-shadow hover:shadow-md"
                                        key={title}
                                        onClick={() => router.push(href)}
                                    >
                                        <CardHeader className="flex gap-3">
                                            <div className="bg-neutral-100 rounded-sm p-2">
                                                <Icon className="text-muted-foreground size-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <CardTitle className="text-sm">{title}</CardTitle>
                                                <CardDescription>{description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
