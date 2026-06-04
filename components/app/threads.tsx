'use client'

import { SearchIcon } from '@databricks/design-system'
import { InboxIcon, SquarePenIcon } from 'lucide-react'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { PanelLeftCloseIcon } from '@/app/assets/icons/panel-left-close'
import { PanelLeftOpenIcon } from '@/app/assets/icons/panel-left-open'

import { Thread } from '@/data/threads'
import { useThreads } from '@/components/app/threads-context'

import { Button } from '@/components/ui/button'

type SortBy = 'updated_at' | 'created_at'
type ThreadStatus = NonNullable<Thread['status']>

const STATUS_DOT_CLASS: Record<ThreadStatus, string> = {
    investigating: 'bg-[rgb(200,45,76)]',
    not_an_issue: 'bg-[rgb(111,111,111)]',
    open: 'bg-[rgb(190,80,30)]',
    resolved: 'bg-[rgb(39,124,67)]',
}

interface ThreadsProps {
    panelOpen: boolean
    onToggle: () => void
}

function Threads({ panelOpen, onToggle }: ThreadsProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { threads, addThread } = useThreads()
    const [sortBy, setSortBy] = useState<SortBy>('updated_at')

    function isActive(href: string) {
        return pathname === href
    }

    function handleNewThread() {
        const now = new Date().toISOString()
        const thread: Thread = { id: crypto.randomUUID(), label: `Thread ${threads.length + 1}`, created_at: now, updated_at: now }
        addThread(thread)
        router.push(`/c/${thread.id}`)
    }

    const visibleThreads = threads
        .sort((a, b) => (b[sortBy] ?? '').localeCompare(a[sortBy] ?? ''))

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className={`items-center border-b flex gap-2 ${panelOpen ? 'justify-between pl-3 pr-2' : 'justify-center px-2'} py-2`}>
                {panelOpen && <span className="text-[13px] font-semibold">Genie Code</span>}
                <Button
                    className="group"
                    onClick={onToggle}
                    size="icon"
                    variant="ghost"
                >
                    {panelOpen ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
                </Button>
            </div>

            {panelOpen && (
                <div className="flex flex-col gap-3 p-2">
                    <div className="flex flex-col gap-1">
                        <Button
                            className="text-[13px] font-normal gap-2 justify-start"
                            onClick={handleNewThread}
                            variant="ghost"
                        >
                            <SquarePenIcon className="size-4" />
                            New thread
                        </Button>

                        <Button
                            className="text-[13px] font-normal gap-2 justify-start"
                            variant="ghost"
                        >
                            <SearchIcon
                                className="size-4"
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                            />
                            Search
                        </Button>

                        {/* <Button
                            className={`gap-2 justify-start ${isActive('/c/configure') ? 'bg-muted' : ''}`}
                            onClick={() => router.push('/c/configure')}
                            variant="ghost"
                        >
                            <SettingsIcon className="size-4" />
                            Configure
                        </Button> */}
                    </div>

                    <div className="flex flex-col">
                        <Button
                            className={`text-[13px] font-normal gap-2 justify-start ${isActive('/c/inbox') ? 'bg-muted' : ''}`}
                            onClick={() => router.push('/c/inbox')}
                            variant="ghost"
                        >
                            <InboxIcon className="size-4" />
                            Autopilot Inbox
                        </Button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="items-center flex gap-2 justify-between pl-3 pr-1">
                            <span className="text-muted-foreground text-xs">Recents</span>
                        </div>
                        {visibleThreads.map((thread) => (
                            <Button
                                className={`${isActive(`/c/${thread.id}`) ? 'bg-muted' : ''} gap-2 justify-start`}
                                key={thread.id}
                                onClick={() => router.push(`/c/${thread.id}`)}
                                variant="ghost"
                            >
                                <span className="shrink-0 size-2">
                                    {thread.status && <span className={`rounded-full ${STATUS_DOT_CLASS[thread.status]} block size-2`} />}
                                </span>
                                <span className="text-[13px] font-normal text-left truncate w-full">{thread.label}</span>
                                <span aria-describedby="Last updated" className="text-muted-foreground text-xs mt-0.5">
                                    2m
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export { Threads }
export type { ThreadsProps }
export default Threads
