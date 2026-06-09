'use client'

import { format, isValid } from 'date-fns'

import { ReplyIcon } from '@/lib/icons'
import { ArchiveIcon, ArrowUpIcon, EllipsisVerticalIcon, FunnelIcon, MicIcon, SlidersHorizontal } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { usePanelRef } from 'react-resizable-panels'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import { useThreads } from '@/components/app/threads-context'
import Threads from '@/components/app/threads'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Thread } from '@/data/threads'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type ThreadStatus = NonNullable<Thread['status']>

const StatusMetadata: Record<ThreadStatus, { iconClass: string; badgeClass: string; label: string; }> = {
    investigating: { badgeClass: 'bg-[rgb(200,45,76)]/5', iconClass: 'bg-[rgb(200,45,76)]', label: 'Investigating' },
    not_an_issue: { badgeClass: 'bg-[rgb(111,111,111)]/5', iconClass: 'bg-[rgb(111,111,111)]', label: 'Not an issue' },
    open: { badgeClass: 'bg-[rgb(190,80,30)]/5', iconClass: 'bg-[rgb(190,80,30)]', label: 'Open' },
    resolved: { badgeClass: 'bg-[rgb(39,124,67)]/5', iconClass: 'bg-[rgb(39,124,67)]', label: 'Resolved' },
}

const SeverityLabel: Record<NonNullable<Thread['severity']>, string> = {
    minor: 'Minor',
    moderate: 'Moderate',
    critical: 'Critical',
}

function threadDate(iso: string) {
    const d = new Date(iso)
    return isValid(d) ? d : null
}

/** Compact elapsed time: `3m ago`, `2h ago`, `4d ago`, `2w ago`; older dates fall back to `MMM d, yyyy`. */
function formatRelativeSince(iso: string, now: Date = new Date()) {
    const d = threadDate(iso)
    if (!d) return '—'
    const ms = now.getTime() - d.getTime()
    if (ms < 0) return format(d, 'MMM d, yyyy')
    const minutes = Math.floor(ms / 60_000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    const weeks = Math.floor(days / 7)
    if (weeks < 8) return `${weeks}w ago`
    return format(d, 'MMM d, yyyy')
}

function formatFullLocale(iso: string) {
    const d = threadDate(iso)
    return d ? d.toLocaleString() : '—'
}

function ThreadsTable({ emptyLabel, rows, onSelect }: { emptyLabel: string; rows: Thread[]; onSelect: (id: string) => void }) {
    if (rows.length === 0) {
        return (
            <div className="items-center bg-neutral-100 border rounded-md flex justify-center p-4 dark:bg-neutral-900">
                <p className="text-muted-foreground text-sm">{emptyLabel}</p>
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full">Insight</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => {
                    const updatedTitle = formatFullLocale(row.updated_at)
                    const reportedTitle = formatFullLocale(row.created_at)
                    return (
                    <TableRow className="cursor-pointer" key={row.id} onClick={() => onSelect(row.id)}>
                        <TableCell className="max-w-0 truncate">{row.label}</TableCell>
                        <TableCell>
                            <span className="bg-muted rounded-sm text-muted-foreground inline-flex text-xs max-w-full px-1.5 py-0.5">
                                <span className="min-w-0 truncate">{row.severity ? SeverityLabel[row.severity] : "Training"}</span>
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="items-center bg-muted rounded-sm text-muted-foreground inline-flex text-xs max-w-full gap-1 px-1.5 py-0.5">
                                <span className="shrink-0 size-2">
                                    {row.status && <span className={`${StatusMetadata[row.status].iconClass} rounded-full block size-2`} />}
                                </span>
                                <span className="min-w-0 truncate">{row.status ? StatusMetadata[row.status].label : 'Training'}</span>
                            </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground w-[1%] max-w-[7.5rem] whitespace-nowrap tabular-nums">
                            <span
                                className="block cursor-default truncate text-left"
                                title={updatedTitle === '—' ? undefined : updatedTitle}
                            >
                                {formatRelativeSince(row.updated_at)}
                            </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground w-[1%] max-w-[7.5rem] whitespace-nowrap tabular-nums">
                            <span
                                className="block cursor-default truncate text-left"
                                title={reportedTitle === '—' ? undefined : reportedTitle}
                            >
                                {formatRelativeSince(row.created_at)}
                            </span>
                        </TableCell>
                        <TableCell className="items-center flex gap-1 justify-end">
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <Button
                                            aria-label="Archive"
                                            size="icon-sm"
                                            variant="ghost"
                                        >
                                            <ArchiveIcon className="text-muted-foreground" />
                                            <span className="sr-only">Archive thread</span>
                                        </Button>
                                    }
                                />
                                <TooltipContent>
                                    <span>Archive</span>
                                </TooltipContent>
                            </Tooltip>
                            <Button variant="ghost" size="icon-sm">
                                <EllipsisVerticalIcon className="text-muted-foreground" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

type FilterState = {
    severities: NonNullable<Thread['severity']>[]
    statuses: NonNullable<Thread['status']>[]
}

const SEVERITY_OPTIONS: NonNullable<Thread['severity']>[] = ['minor', 'moderate', 'critical']
const STATUS_OPTIONS: NonNullable<Thread['status']>[] = ['investigating', 'not_an_issue', 'open', 'resolved']

function Page() {
    const router = useRouter()
    const { addThread, sendUserMessage, threads } = useThreads()

    const [filter, setFilter] = useState<FilterState>({ severities: [], statuses: [] })
    const [searchQuery, setSearchQuery] = useState('')
    const [threadsOpen, setThreadsOpen] = useState(true)

    const threadsPanelRef = usePanelRef()

    const incidentThreads = threads.filter((t) => t.type === 'incident')
    const activeThreads = incidentThreads.filter((t) => !t.archived_at)

    // const recentThreads = incidentThreads.filter((t) => !!t.archived_at)

    function handleThreadsToggle() {
        if (threadsOpen) {
            threadsPanelRef.current?.collapse()
        } else {
            threadsPanelRef.current?.expand()
        }
        setThreadsOpen((o) => !o)
    }

    function toggleSeverity(val: NonNullable<Thread['severity']>) {
        setFilter((prev) => ({
            ...prev,
            severities: prev.severities.includes(val)
                ? prev.severities.filter((s) => s !== val)
                : [...prev.severities, val],
        }))
    }

    function toggleStatus(val: NonNullable<Thread['status']>) {
        setFilter((prev) => ({
            ...prev,
            statuses: prev.statuses.includes(val)
                ? prev.statuses.filter((s) => s !== val)
                : [...prev.statuses, val],
        }))
    }

    function filterThreads(list: Thread[]) {
        return list
            .filter((t) => filter.severities.length === 0 || (t.severity && filter.severities.includes(t.severity)))
            .filter((t) => filter.statuses.length === 0 || (t.status && filter.statuses.includes(t.status)))
    }

    const activeFilterCount = filter.severities.length + filter.statuses.length

    function handleConfigure() {
        const nowIso = new Date().toISOString()
        const thread: Thread = {
            id: crypto.randomUUID(),
            label: 'Configure ZeroOps',
            type: 'automation',
            scenario_id: 'zeroops-configure',
            created_at: nowIso,
            updated_at: nowIso,
        }
        addThread(thread)
        sendUserMessage(thread.id, 'How is ZeroOps configured?')
        router.push(`/c/${thread.id}`)
    }

    const filterDropdown = (
        <DropdownMenu>
            <DropdownMenuTrigger className="items-center flex gap-1.5 rounded-md px-1.5 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <FunnelIcon className="size-3.5" />
                Filter
                {activeFilterCount > 0 && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {activeFilterCount}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Severity</DropdownMenuLabel>
                    {SEVERITY_OPTIONS.map((val) => (
                        <DropdownMenuCheckboxItem
                            key={val}
                            checked={filter.severities.includes(val)}
                            onCheckedChange={() => toggleSeverity(val)}
                        >
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    {STATUS_OPTIONS.map((val) => (
                        <DropdownMenuCheckboxItem
                            key={val}
                            checked={filter.statuses.includes(val)}
                            onCheckedChange={() => toggleStatus(val)}
                        >
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

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
                        panelRef={threadsPanelRef}
                    >
                        <Threads panelOpen={threadsOpen} onToggle={handleThreadsToggle} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="flex" minSize="200px">
                        <div className="flex flex-1 flex-col gap-6 max-w-3xl mx-auto p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-2xl font-bold">Inbox</h1>
                                </div>
                                <Button
                                    aria-label="Configure ZeroOps"
                                    className="rounded-[4px] text-[13px] leading-[20px]"
                                    onClick={handleConfigure}
                                    variant="outline"
                                >
                                    <SlidersHorizontal className="size-4" />
                                    <span>Configure</span>
                                </Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <InputGroup className="border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] rounded-full text-[13px] leading-[20px] min-h-10 pr-0.5">
                                    <InputGroupInput
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Ask ZeroOps…"
                                        value={searchQuery}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <Button
                                            aria-label={searchQuery ? 'search' : 'record'}
                                            className="rounded-full"
                                            size="icon-sm"
                                            variant="default"
                                        >
                                            {searchQuery ? <ArrowUpIcon /> : <MicIcon />}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    <svg
                                        aria-hidden
                                        className="absolute"
                                        height="0"
                                        width="0"
                                    >
                                        <defs>
                                            <linearGradient
                                                gradientUnits="userSpaceOnUse"
                                                id="reply-icon-gradient"
                                                x1="-1.16831"
                                                x2="12.4619"
                                                y1="1.18452"
                                                y2="18.6312"
                                            >
                                                <stop offset="0.235" stopColor="#4299E0" />
                                                <stop offset="0.47" stopColor="#CA42E0" />
                                                <stop offset="0.76" stopColor="#FF5F46" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <Button className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-[12px] rounded-tl-none text-[13px] leading-[20px] gap-1.5 w-fit" variant="secondary">
                                        <ReplyIcon
                                            className="size-3.5 [&_path]:[stroke:url(#reply-icon-gradient)]"
                                        />
                                        <span>What can ZeroOps do?</span>
                                    </Button>
                                    <Button className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-[12px] rounded-tl-none text-[13px] leading-[20px] gap-1.5 w-fit" variant="secondary">
                                        <ReplyIcon
                                            className="size-3.5 [&_path]:[stroke:url(#reply-icon-gradient)]"
                                        />
                                        <span>Configure ZeroOps</span>
                                    </Button>
                                </div>

                                <section className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] text-[13px] font-bold leading-[20px]">Insights</h2>
                                        {filterDropdown}
                                    </div>
                                    <ThreadsTable emptyLabel="No active threads" onSelect={(id) => router.push(`/c/${id}`)} rows={filterThreads(activeThreads)} />
                                </section>

                                {/* <section className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium text-muted-foreground">Recents</h2>
                                        {filterDropdown}
                                    </div>
                                    <ThreadsTable emptyLabel="No recent threads" onSelect={(id) => router.push(`/c/${id}`)} rows={filterThreads(recentThreads)} />
                                </section> */}
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
