'use client'

import { ArrowLeftIcon, BotIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { usePanelRef } from 'react-resizable-panels'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import { useThreads } from '@/components/app/threads-context'
import Threads from '@/components/app/threads'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

function Page() {
    const router = useRouter()
    const { agents, addAgent, addThread } = useThreads()
    const [threadsOpen, setThreadsOpen] = useState(true)
    const threadsPanelRef = usePanelRef()
    const [searchQuery, setSearchQuery] = useState('')

    function handleThreadsToggle() {
        if (threadsOpen) {
            threadsPanelRef.current?.collapse()
        } else {
            threadsPanelRef.current?.expand()
        }
        setThreadsOpen((o) => !o)
    }

    const filteredAgents = agents.filter((a) =>
        a.configuration.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                    <ResizablePanel className="flex flex-col" minSize="200px">
                        <div className="border-b p-2">
                            <Button onClick={() => router.push('/c/configure')} variant="ghost">
                                <ArrowLeftIcon className="size-4" />
                                Configure
                            </Button>
                        </div>
                        <div className="flex flex-1 flex-col gap-6 max-w-3xl mx-auto p-6 w-full">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-2xl font-semibold">Automations</h1>
                                    <span className="text-muted-foreground text-sm">Create and manage automated agents.</span>
                                </div>
                                <Button onClick={() => {
                                    const id = crypto.randomUUID()
                                    const now = Date.now()
                                    const nowIso = new Date(now).toISOString()
                                    addThread({ id, label: 'New agent', type: 'automation', created_at: nowIso, updated_at: nowIso })
                                    addAgent({
                                        active: false,
                                        id,
                                        configuration: {
                                            name: 'New agent',
                                            instructions: '',
                                            scope: [],
                                            run_as: '',
                                            created_at: nowIso,
                                            updated_at: nowIso,
                                        },
                                        markdown: '',
                                        created_at: nowIso,
                                        updated_at: nowIso,
                                    })
                                    router.push(`/c/${id}`)
                                }}>
                                    <PlusIcon className="size-4" />
                                    New automation
                                </Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <SearchIcon />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search automations…"
                                        value={searchQuery}
                                    />
                                </InputGroup>

                                {filteredAgents.length === 0 ? (
                                    <div className="items-center bg-neutral-100 border rounded-md flex justify-center p-4 dark:bg-neutral-900">
                                        <p className="text-muted-foreground text-sm">No automations configured</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col divide-y">
                                        {filteredAgents.map((agent) => (
                                            <div
                                                className="items-center cursor-pointer flex gap-2 text-sm px-3 py-2 hover:bg-muted/50"
                                                key={agent.id}
                                                onClick={() => router.push(`/c/configure/automation/${agent.id}`)}
                                            >
                                                <div className="p-1">
                                                    <BotIcon className="text-muted-foreground size-4" />
                                                </div>
                                                <span>{agent.configuration.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
