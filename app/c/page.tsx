'use client'

import { ChevronDoubleLeftIcon, ForkIcon, GearIcon, PlusIcon, ShareIcon } from '@databricks/design-system'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePanelRef } from 'react-resizable-panels'

import { GenieCodeIcon } from '@/app/assets/icons/genie-code'

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
        if (threadsPanelRef.current?.isCollapsed()) {
            threadsPanelRef.current?.expand()
        } else {
            threadsPanelRef.current?.collapse()
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
                        defaultSize="296px"
                        minSize="200px"
                        onResize={() => {
                            setThreadsOpen(!threadsPanelRef.current?.isCollapsed())
                        }}
                        panelRef={threadsPanelRef}
                    >
                        <Threads onToggle={handleThreadsToggle} panelOpen={threadsOpen} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="flex flex-col text-[13px]" minSize="200px">
                        <div className="border-b flex gap-2 justify-between p-2 shrink-0">
                            <div className="items-center flex gap-2 min-w-0">
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    onClick={() => router.push('/c')}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronDoubleLeftIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} size={4} />
                                </Button>
                                <span className="text-[13px] font-semibold min-w-0 truncate">New thread</span>
                            </div>
                            <div className="items-center flex gap-1">
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    disabled
                                    size="icon"
                                    variant="ghost"
                                >
                                    <PlusIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} size={4} />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <GearIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} size={4} />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ShareIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} size={4} />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ForkIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} size={4} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <div className="flex flex-col min-h-full">
                                <div className="flex-1 flex items-center justify-center p-6">
                                    <div className="flex flex-col items-center gap-4">
                                        <GenieCodeIcon size={64} />
                                        <div className="flex flex-col gap-2 text-center">
                                            <span className="text-2xl font-semibold">Genie Code</span>
                                            <span className="text-muted-foreground">Send a message to start the conversation.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] bottom-0 sticky">
                                    <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[rgb(255,255,255)] dark:from-[rgb(17,23,28)] to-transparent pointer-events-none" />
                                    <div className="max-w-3xl mx-auto px-6 pb-6">
                                        <Chatbox className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)]" />
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
