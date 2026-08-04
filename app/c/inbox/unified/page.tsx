'use client'

import { format, isValid } from 'date-fns'

import { CircleIcon, CloseIcon, ReplyIcon, SlidersIcon } from '@/lib/icons'
import { ArchiveIcon, ArrowUpIcon, EllipsisVerticalIcon, FunnelIcon, MicIcon } from 'lucide-react'

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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { Thread } from '@/data/threads'

// ── Row model ────────────────────────────────────────────────────────────────
// One central inbox lists two kinds of thread as peers: Insight threads (what
// Genie ZeroOps surfaces) and Automation-run threads (each scheduled task run
// produces its own thread). Genie ZeroOps itself is the background engine — it
// is never a row; it lives in the header ("Active" + Configuration).

type RowKind = 'insight' | 'automation_run'

// A single State column spans both lifecycles: insight statuses and run states.
type RowState = 'open' | 'investigating' | 'resolved' | 'not_an_issue' | 'completed' | 'running' | 'failed'
type Severity = NonNullable<Thread['severity']>

const KIND_META: Record<RowKind, { label: string }> = {
    insight: { label: 'Insight' },
    automation_run: { label: 'Automation run' },
}

const STATE_META: Record<RowState, { dotClass: string; label: string }> = {
    open: { dotClass: 'bg-[rgb(190,80,30)]', label: 'Open' },
    investigating: { dotClass: 'bg-[rgb(200,45,76)]', label: 'Investigating' },
    resolved: { dotClass: 'bg-[rgb(39,124,67)]', label: 'Resolved' },
    not_an_issue: { dotClass: 'bg-[rgb(111,111,111)]', label: 'Not an issue' },
    completed: { dotClass: 'bg-[rgb(39,124,67)]', label: 'Completed' },
    running: { dotClass: 'bg-[rgb(34,114,180)]', label: 'Running' },
    failed: { dotClass: 'bg-[rgb(200,45,76)]', label: 'Failed' },
}

const SeverityLabel: Record<Severity, string> = {
    minor: 'Minor',
    moderate: 'Moderate',
    critical: 'Critical',
}

interface UnifiedRow {
    id: string
    kind: RowKind
    name: string
    severity?: Severity
    state: RowState
    /** ISO timestamp of the row's latest activity (insight updated / run time). */
    date: string
    href: string
}

// ── Automation-run stimulus data ─────────────────────────────────────────────
// Research variant only: each scheduled task run surfaces as its own thread.
// Kept local to this route so shared data stays clean and the variant is easy
// to remove after the study.
const automationRuns: UnifiedRow[] = [
    { id: 'run-0001', kind: 'automation_run', name: 'Nightly SLA freshness watcher', state: 'completed', date: '2026-04-20T02:00:00+00:00', href: '/c/run-0001' },
    { id: 'run-0002', kind: 'automation_run', name: 'Schema drift monitor', state: 'completed', date: '2026-04-20T15:00:00+00:00', href: '/c/run-0002' },
    { id: 'run-0003', kind: 'automation_run', name: 'Deprecated runtime scanner', state: 'running', date: '2026-04-20T15:20:00+00:00', href: '/c/run-0003' },
    { id: 'run-0004', kind: 'automation_run', name: 'Cost anomaly sweep', state: 'failed', date: '2026-04-20T11:30:00+00:00', href: '/c/run-0004' },
]

function threadToRow(t: Thread): UnifiedRow {
    return {
        id: t.id,
        kind: 'insight',
        name: t.label,
        severity: t.severity,
        state: (t.status ?? 'open') as RowState,
        date: t.updated_at,
        href: `/c/${t.id}`,
    }
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

function UnifiedTable({ emptyLabel, rows, onSelect }: { emptyLabel: string; rows: UnifiedRow[]; onSelect: (href: string) => void }) {
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
                <TableRow className="hover:bg-transparent">
                    <TableHead className="w-full">Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => {
                    const dateTitle = formatFullLocale(row.date)
                    const { label: kindLabel } = KIND_META[row.kind]
                    return (
                        <TableRow className="cursor-pointer" key={row.id} onClick={() => onSelect(row.href)}>
                            <TableCell className="max-w-0 truncate">{row.name}</TableCell>
                            <TableCell>
                                <span className="bg-muted rounded-sm text-muted-foreground inline-flex text-xs max-w-full whitespace-nowrap px-1.5 py-0.5">
                                    <span className="min-w-0 truncate">{kindLabel}</span>
                                </span>
                            </TableCell>
                            <TableCell>
                                {row.severity ? (
                                    <span className="bg-muted rounded-sm text-muted-foreground inline-flex text-xs max-w-full px-1.5 py-0.5">
                                        <span className="min-w-0 truncate">{SeverityLabel[row.severity]}</span>
                                    </span>
                                ) : (
                                    <span className="text-muted-foreground text-xs">—</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className="items-center bg-muted rounded-sm text-muted-foreground inline-flex text-xs max-w-full gap-1 px-1.5 py-0.5">
                                    <span className={`${STATE_META[row.state].dotClass} rounded-full block shrink-0 size-2`} />
                                    <span className="min-w-0 truncate">{STATE_META[row.state].label}</span>
                                </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground w-[1%] max-w-[7.5rem] whitespace-nowrap tabular-nums">
                                <span
                                    className="block cursor-default truncate text-left"
                                    title={dateTitle === '—' ? undefined : dateTitle}
                                >
                                    {formatRelativeSince(row.date)}
                                </span>
                            </TableCell>
                            <TableCell className="items-center flex gap-1 justify-end">
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Button aria-label="Archive" size="icon-sm" variant="ghost">
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
    kinds: RowKind[]
    severities: Severity[]
    states: RowState[]
}

const KIND_OPTIONS: RowKind[] = ['insight', 'automation_run']
const SEVERITY_OPTIONS: Severity[] = ['critical', 'moderate', 'minor']
const STATE_OPTIONS: RowState[] = ['open', 'investigating', 'resolved', 'not_an_issue', 'completed', 'running', 'failed']

/** `Open`, `Open or Resolved`, `Not an issue, Open, or Resolved` */
const orList = new Intl.ListFormat('en', { type: 'disjunction' })

function FilterChip({ field, onClear, values }: { field: string; onClear: () => void; values: string[] }) {
    return (
        <span className="items-center bg-background border border-border rounded-full flex text-[13px] leading-[20px] gap-1 h-8 pl-3 pr-1 dark:bg-input/30 dark:border-input">
            <span className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]">{field} is</span>
            <span className="text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)]">{orList.format(values)}</span>
            <Button
                aria-label={`Clear ${field} filter`}
                className="rounded-full"
                onClick={onClear}
                size="icon-xs"
                variant="ghost"
            >
                <CloseIcon className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]" />
            </Button>
        </span>
    )
}

/**
 * Research variant: one central inbox that lists Insight threads and
 * Automation-run threads together as peers, with a single filter (Type ·
 * Severity · State). Genie ZeroOps is the background engine, not a row.
 * Sibling to the standard /c/inbox so the two can be compared in a study.
 */
function Page() {
    const router = useRouter()
    const { addThread, sendUserMessage, threads } = useThreads()

    const [filter, setFilter] = useState<FilterState>({ kinds: [], severities: [], states: [] })
    const [searchQuery, setSearchQuery] = useState('')
    const [threadsOpen, setThreadsOpen] = useState(true)

    const threadsPanelRef = usePanelRef()

    // Combine both thread kinds into one list, newest activity first.
    const insightRows = threads
        .filter((t) => t.type === 'incident' && !t.archived_at)
        .map(threadToRow)
    const allRows = [...insightRows, ...automationRuns].sort((a, b) =>
        (b.date ?? '').localeCompare(a.date ?? '')
    )

    function handleThreadsToggle() {
        if (threadsOpen) {
            threadsPanelRef.current?.collapse()
        } else {
            threadsPanelRef.current?.expand()
        }
        setThreadsOpen((o) => !o)
    }

    function toggleKind(val: RowKind) {
        setFilter((prev) => ({
            ...prev,
            kinds: prev.kinds.includes(val) ? prev.kinds.filter((k) => k !== val) : [...prev.kinds, val],
        }))
    }

    function toggleSeverity(val: Severity) {
        setFilter((prev) => ({
            ...prev,
            severities: prev.severities.includes(val) ? prev.severities.filter((s) => s !== val) : [...prev.severities, val],
        }))
    }

    function toggleState(val: RowState) {
        setFilter((prev) => ({
            ...prev,
            states: prev.states.includes(val) ? prev.states.filter((s) => s !== val) : [...prev.states, val],
        }))
    }

    function filterRows(list: UnifiedRow[]) {
        return list
            .filter((r) => filter.kinds.length === 0 || filter.kinds.includes(r.kind))
            .filter((r) => filter.severities.length === 0 || (r.severity && filter.severities.includes(r.severity)))
            .filter((r) => filter.states.length === 0 || filter.states.includes(r.state))
    }

    const activeFilterCount = filter.kinds.length + filter.severities.length + filter.states.length

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
            <DropdownMenuTrigger
                render={
                    <Button className="rounded-full text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] text-[13px] leading-[20px]" variant="outline">
                        <FunnelIcon className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] size-4" />
                        Filter
                        {activeFilterCount > 0 && (
                            <span className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] text-[12px] leading-[18px]">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>
                }
            />
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Type</DropdownMenuLabel>
                    {KIND_OPTIONS.map((val) => (
                        <DropdownMenuCheckboxItem
                            key={val}
                            checked={filter.kinds.includes(val)}
                            onCheckedChange={() => toggleKind(val)}
                        >
                            {KIND_META[val].label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Severity</DropdownMenuLabel>
                    {SEVERITY_OPTIONS.map((val) => (
                        <DropdownMenuCheckboxItem
                            key={val}
                            checked={filter.severities.includes(val)}
                            onCheckedChange={() => toggleSeverity(val)}
                        >
                            {SeverityLabel[val]}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>State</DropdownMenuLabel>
                    {STATE_OPTIONS.map((val) => (
                        <DropdownMenuCheckboxItem
                            key={val}
                            checked={filter.states.includes(val)}
                            onCheckedChange={() => toggleState(val)}
                        >
                            {STATE_META[val].label}
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

                                <div className="items-center flex gap-3">
                                    <div className="items-center flex gap-1">
                                        <CircleIcon className="text-[rgb(39,124,67)] dark:text-[rgb(59,166,94)] size-3" />
                                        <span className="text-[13px] leading-[20px]">Active</span>
                                    </div>
                                    <Button
                                        aria-label="ZeroOps configuration"
                                        className="rounded-[4px] text-[13px] leading-[20px]"
                                        onClick={handleConfigure}
                                        variant="outline"
                                    >
                                        <SlidersIcon className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]" />
                                        <span>Configuration</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
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

                                        <Button className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-full text-[13px] font-normal leading-[20px] gap-1.5 w-fit" variant="secondary">
                                            <ReplyIcon
                                                className="size-4 [&_path]:[fill:url(#reply-icon-gradient)]"
                                            />
                                            <span>What can ZeroOps do?</span>
                                        </Button>
                                        <Button className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-full text-[13px] font-normal leading-[20px] gap-1.5 w-fit" variant="secondary">
                                            <ReplyIcon
                                                className="size-4 [&_path]:[fill:url(#reply-icon-gradient)]"
                                            />
                                            <span>Configure ZeroOps</span>
                                        </Button>
                                    </div>
                                </div>

                                <section className="flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {filterDropdown}
                                        {filter.kinds.length > 0 && (
                                            <FilterChip
                                                field="Type"
                                                onClear={() => setFilter((prev) => ({ ...prev, kinds: [] }))}
                                                values={filter.kinds.map((val) => KIND_META[val].label)}
                                            />
                                        )}
                                        {filter.severities.length > 0 && (
                                            <FilterChip
                                                field="Severity"
                                                onClear={() => setFilter((prev) => ({ ...prev, severities: [] }))}
                                                values={filter.severities.map((val) => SeverityLabel[val])}
                                            />
                                        )}
                                        {filter.states.length > 0 && (
                                            <FilterChip
                                                field="State"
                                                onClear={() => setFilter((prev) => ({ ...prev, states: [] }))}
                                                values={filter.states.map((val) => STATE_META[val].label)}
                                            />
                                        )}
                                    </div>
                                    <UnifiedTable emptyLabel="No threads" onSelect={(href) => router.push(href)} rows={filterRows(allRows)} />
                                </section>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
