'use client'

import { ChevronsLeftIcon, GitForkIcon, PlusIcon, SettingsIcon, ShareIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePanelRef } from 'react-resizable-panels'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import { Chatbox } from '@/components/app/chatbox'
import Threads from '@/components/app/threads'

import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

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
                        onResize={(size) => setThreadsOpen(size.inPixels > 48)}
                    >
                        <Threads onToggle={handleThreadsToggle} panelOpen={threadsOpen} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="flex flex-col text-[13px]" minSize="200px">
                        <div className="border-b flex gap-2 justify-between p-2 shrink-0">
                            <div className="items-center flex gap-1">
                                <Button
                                    onClick={() => router.push('/c')}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronsLeftIcon className="size-4" />
                                </Button>
                                <span className="font-semibold">New thread</span>
                            </div>
                            <div className="items-center flex gap-1">
                                <Button
                                    disabled
                                    size="icon-sm"
                                    variant="ghost"
                                >
                                    <PlusIcon className="size-4" />
                                </Button>
                                <Button size="icon-sm" variant="ghost">
                                    <SettingsIcon className="size-4" />
                                </Button>
                                <Button size="icon-sm" variant="ghost">
                                    <ShareIcon className="size-4" />
                                </Button>
                                <Button size="icon-sm" variant="ghost">
                                    <GitForkIcon className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <div className="flex flex-col min-h-full">
                                <div className="flex-1 flex items-center justify-center p-6">
                                    <span className="text-muted-foreground">New thread</span>
                                </div>
                                <div className="bg-background bottom-0 sticky">
                                    <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                                    <div className="max-w-3xl mx-auto px-6 pb-6">
                                        <Chatbox />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    );
}

export default Page
