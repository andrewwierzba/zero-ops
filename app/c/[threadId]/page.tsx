'use client'

import { use, useState } from 'react'

import { BugIcon, ChevronDoubleLeftIcon, CloseIcon, CopyIcon, ForkIcon, GearIcon, PlusIcon, ReplyIcon, ShareIcon, SyncIcon, ThumbsDownIcon, ThumbsUpIcon } from '@/lib/icons'

import { useRouter } from 'next/navigation'
import { usePanelRef } from 'react-resizable-panels'

import { GenieCodeIcon } from '@/app/assets/icons/genie-code'
import { PanelRightCloseIcon } from '@/app/assets/icons/panel-right-close'
import { PanelRightOpenIcon } from '@/app/assets/icons/panel-right-open'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import { Chatbox } from '@/components/app/chatbox'
import { MessageContent } from '@/components/app/message-content'
import { ThoughtBlock } from '@/components/app/thought-block'
import Threads from '@/components/app/threads'
import { useThreads } from '@/components/app/threads-context'

import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { MessageAction } from '@/data/messages'
import { Thread } from '@/data/threads'

const ACTION_ICONS: Record<NonNullable<MessageAction['icon']>, React.ComponentType<any>> = {
    thumbs_up: ThumbsUpIcon,
    thumbs_down: ThumbsDownIcon,
    regenerate: SyncIcon,
    copy: CopyIcon,
    copy_debug: BugIcon,
}

type ThreadStatus = NonNullable<Thread['status']>
type ThreadSeverity = NonNullable<Thread['severity']>
type ThreadProgressStatus = NonNullable<NonNullable<Thread['progress_updates']>[number]['status']>

const StatusMetadata: Record<ThreadStatus, { dotClass: string; label: string; }> = {
    investigating: { dotClass: 'bg-[rgb(200,45,76)]', label: 'Investigating' },
    not_an_issue: { dotClass: 'bg-[rgb(111,111,111)]', label: 'Not an issue' },
    open: { dotClass: 'bg-[rgb(190,80,30)]', label: 'Open' },
    resolved: { dotClass: 'bg-[rgb(39,124,67)]', label: 'Resolved' },
}

const SeverityLabel: Record<ThreadSeverity, string> = {
    minor: 'Minor',
    moderate: 'Moderate',
    critical: 'Critical',
}

const ProgressDotClass: Record<ThreadProgressStatus, string> = {
    completed: 'bg-blue-500',
    current: 'bg-muted-foreground/45',
    pending: 'bg-muted-foreground/30',
}

const ProgressStatusLabel: Record<ThreadProgressStatus, string> = {
    completed: 'Completed',
    current: 'In progress',
    pending: 'Queued',
}

function formatThoughtDuration(ms: number) {
    const seconds = Math.max(1, Math.round(ms / 1000))
    return `Thought for ${seconds} second${seconds === 1 ? '' : 's'}`
}

interface PageProps {
    params: Promise<{ threadId: string }>
}

function Page({ params }: PageProps) {
    const { threadId } = use(params)
    const router = useRouter()
    const [threadsOpen, setThreadsOpen] = useState(true)
    const threadsPanelRef = usePanelRef()

    const { threads, messages, sendUserMessage, thinking } = useThreads()

    const thread = threads.find((t) => t.id === threadId)
    const threadMessages = messages[threadId] ?? []
    const threadThinking = thinking[threadId] ?? null
    const lastMessage = threadMessages[threadMessages.length - 1]
    const latestAgentMessageId = lastMessage?.role === 'agent' ? lastMessage.id : undefined

    const [showAutomationPanel, setShowAutomationPanel] = useState(false)
    const [showIncidentPanel, setShowIncidentPanel] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [showRootCauseSummary, setShowRootCauseSummary] = useState(false)
    const isIncidentThread = thread?.type === 'incident'
    const isSidePanelOpen = isIncidentThread ? showIncidentPanel : showAutomationPanel

    function handleSubmit(content: string) {
        sendUserMessage(threadId, content)
    }

    function handleThreadsToggle() {
        if (threadsPanelRef.current?.isCollapsed()) {
            threadsPanelRef.current?.expand()
        } else {
            threadsPanelRef.current?.collapse()
        }
    }

    function handleSidePanelOpen() {
        if (isIncidentThread) {
            setShowIncidentPanel(true)
            setShowAutomationPanel(false)
            return
        }

        setShowAutomationPanel(true)
        setShowIncidentPanel(false)
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
                    <ResizablePanel className="flex flex-col" minSize="200px">
                        {/* Thread header */}
                        <div className="border-b flex gap-2 justify-between p-2">
                            <div className="items-center flex gap-2 min-w-0">
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    onClick={() => router.push('/c')}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronDoubleLeftIcon className="size-4" />
                                </Button>

                                {/* Thread label */}
                                <span className="text-[13px] font-semibold min-w-0 truncate">{thread?.label ?? threadId}</span>
                                {thread?.type === 'incident' && (
                                    <>
                                        <span className="bg-muted rounded-sm text-muted-foreground inline-flex text-xs px-1.5 py-0.5">
                                            <span className="min-w-0 truncate">
                                                {thread.severity ? SeverityLabel[thread.severity] : 'Minor'}
                                            </span>
                                        </span>
                                        <span className="items-center bg-background border rounded-sm text-muted-foreground inline-flex text-xs gap-1 px-1.5 py-0.5">
                                            <span className="shrink-0 size-2">
                                                {thread.status && <span className={`${StatusMetadata[thread.status].dotClass} rounded-full block size-2`} />}
                                            </span>
                                            <span className="min-w-0 truncate">{thread.status ? StatusMetadata[thread.status].label : 'Training'}</span>
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="items-center flex gap-1">
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    disabled
                                    size="icon"
                                    variant="ghost"
                                >
                                    <PlusIcon className="size-4" />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <GearIcon className="size-4" />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ShareIcon className="size-4" />
                                </Button>
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ForkIcon className="size-4" />
                                </Button>

                                {/* Optional */}
                                <Button
                                    className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                    onClick={handleSidePanelOpen}
                                    size="icon"
                                    variant="ghost"
                                >
                                    {isSidePanelOpen ? <PanelRightCloseIcon /> : <PanelRightOpenIcon />}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto ">
                            <div className="flex flex-col min-h-full">
                                <div
                                    className={`flex-1 text-[13px] leading-[20px] p-6 ${
                                        threadMessages.length === 0 && !threadThinking
                                            ? 'flex items-center justify-center'
                                            : ''
                                    }`}
                                >
                                    {threadMessages.length === 0 && !threadThinking ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <GenieCodeIcon size={64} />
                                            <div className="flex flex-col gap-2 text-center">
                                                <span className="text-2xl font-semibold">Genie Code</span>
                                                <span className="text-muted-foreground">Send a message to start the conversation.</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                                            <svg aria-hidden className="absolute" height="0" width="0">
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
                                            {threadMessages.map((message) => (
                                                <div
                                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                                    key={message.id}
                                                >
                                                    {message.role === 'user' ? (
                                                        <div className="bg-[rgb(215,237,254)] dark:bg-[rgb(4,53,93)] rounded-2xl rounded-br-none text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] px-4 py-2.5">
                                                            {/* Removed: max-w-prose */}
                                                            {message.content}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-2 w-full">
                                                            {/* Removed: max-w-prose */}
                                                            {message.thought ? (
                                                                <ThoughtBlock {...message.thought} codeChanges={message.code_changes} />
                                                            ) : message.thought_duration_ms != null ? (
                                                                <div className="text-muted-foreground text-xs">
                                                                    {formatThoughtDuration(message.thought_duration_ms)}
                                                                </div>
                                                            ) : null}
                                                            <div className="flex flex-col gap-3">
                                                                <MessageContent codeChanges={message.code_changes} content={message.content} onAction={handleSubmit} />
                                                            </div>
                                                            {message.id === latestAgentMessageId && message.suggestions && message.suggestions.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 pt-1">
                                                                    {message.suggestions.map((suggestion) => (
                                                                        <Button
                                                                            className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-[12px] rounded-tl-none gap-1.5 w-fit"
                                                                            key={suggestion.label}
                                                                            onClick={() => handleSubmit(suggestion.label)}
                                                                            variant="secondary"
                                                                        >
                                                                            <ReplyIcon
                                                                                className="size-3.5 [&_path]:[stroke:url(#reply-icon-gradient)]"
                                                                            />
                                                                            <span>{suggestion.label}</span>
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {(() => {
                                                                const visibleActions = (message.actions ?? []).filter(
                                                                    (action) => message.id === latestAgentMessageId || !action.transient
                                                                )
                                                                if (visibleActions.length === 0) return null
                                                                return (
                                                                    <div className="items-center flex gap-0">
                                                                        {visibleActions.map((action) => {
                                                                            const Icon = action.icon ? ACTION_ICONS[action.icon] : null
                                                                            if (!Icon) return null
                                                                            return (
                                                                                <Tooltip key={action.label}>
                                                                                    <TooltipTrigger
                                                                                        render={
                                                                                            <Button
                                                                                                aria-label={action.label}
                                                                                                className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)]"
                                                                                                size="icon-sm"
                                                                                                variant="ghost"
                                                                                            >
                                                                                                <Icon className="size-4" />
                                                                                                <span className="sr-only">{action.label}</span>
                                                                                            </Button>
                                                                                        }
                                                                                    />
                                                                                    <TooltipContent>
                                                                                        <span>{action.label}</span>
                                                                                    </TooltipContent>
                                                                                </Tooltip>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                )
                                                            })()}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {threadThinking && (
                                                <div className="flex justify-start" aria-live="polite">
                                                    <div className="flex flex-col gap-2 max-w-prose w-full">
                                                        {threadThinking.steps && threadThinking.steps.length > 0 ? (
                                                            <div className="flex flex-col">
                                                                {threadThinking.steps.map((step, index, steps) => (
                                                                    <div className="flex gap-3.5" key={`${index}-${step.description}`}>
                                                                        <div className="flex flex-col items-center pt-1.5">
                                                                            <span
                                                                                className={`rounded-full block size-2 ${
                                                                                    step.status === 'completed'
                                                                                        ? 'bg-blue-500'
                                                                                        : step.status === 'current'
                                                                                          ? 'bg-muted-foreground/45 animate-pulse'
                                                                                          : 'bg-muted-foreground/30'
                                                                                }`}
                                                                            />
                                                                            {index < steps.length - 1 && <span className="bg-border/80 block w-px flex-1 my-1.5" />}
                                                                        </div>
                                                                        <div className={`${index < steps.length - 1 ? 'pb-3.5' : ''}`}>
                                                                            <p className={`leading-relaxed ${step.status === 'current' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                                                {step.description}
                                                                            </p>
                                                                            {step.detail && (
                                                                                <p className="text-muted-foreground text-[12px] leading-relaxed mt-0.5">
                                                                                    {step.detail}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="items-center text-muted-foreground flex gap-1.5 text-xs" aria-label="Agent is thinking">
                                                                <GenieCodeIcon size={16} />
                                                                <span className="relative top-[1px]">
                                                                    Thinking<span aria-hidden>.</span>
                                                                    <span aria-hidden className="animate-thinking-dot-2">.</span>
                                                                    <span aria-hidden className="animate-thinking-dot-3">.</span>
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] bottom-0 sticky">
                                    <div className="bg-gradient-to-t from-[rgb(255,255,255)] dark:from-[rgb(17,23,28)] to-transparent h-6 inset-x-0 pointer-events-none absolute -top-6" />
                                    <div className="max-w-3xl mx-auto pb-6">
                                        <Chatbox
                                            className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)]"
                                            onSubmit={handleSubmit}
                                            showModelSelection={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                    {(showAutomationPanel || showIncidentPanel) && (
                        <>
                            <ResizableHandle />
                            <ResizablePanel defaultSize="400px" minSize="200px">
                                <div className="flex flex-col h-full">
                                    <div className="items-center border-b flex gap-2 justify-between p-2">
                                        <span className="font-medium capitalize">{showIncidentPanel ? 'Incident details' : thread?.type}</span>
                                        <Button
                                            onClick={() => {
                                                setShowAutomationPanel(false)
                                                setShowIncidentPanel(false)
                                            }}
                                            size="icon"
                                            variant="ghost"
                                            >
                                            <CloseIcon className="size-4" />
                                        </Button>
                                    </div>
                                    {showIncidentPanel && thread && (
                                        <div className="flex flex-col gap-4 p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-muted-foreground text-xs">Insight</span>
                                                <span className="font-medium">{thread.label}</span>
                                            </div>

                                            <div className="items-start flex flex-col gap-1">
                                                <span className="text-muted-foreground text-xs">Severity</span>
                                                <span
                                                    aria-describedby="Severity"
                                                    className="bg-muted rounded-sm text-muted-foreground inline-flex text-xs px-1.5 py-0.5 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                                                    onClick={() => {}}
                                                >
                                                    <span className="min-w-0 truncate">
                                                        {thread.severity ? SeverityLabel[thread.severity] : 'Minor'}
                                                    </span>
                                                </span>
                                            </div>

                                            <div className="items-start flex flex-col gap-1">
                                                <span className="text-muted-foreground text-xs">Status</span>
                                                <span
                                                    aria-describedby="Status"
                                                    className="items-center bg-muted rounded-sm text-muted-foreground inline-flex text-xs gap-1 px-1.5 py-0.5 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                                                    onClick={() => {}}
                                                >
                                                    <span className="shrink-0 size-2">
                                                        {thread.status && <span className={`${StatusMetadata[thread.status].dotClass} rounded-full block size-2`} />}
                                                    </span>
                                                    <span className="min-w-0 truncate">{thread.status ? StatusMetadata[thread.status].label : 'Training'}</span>
                                                </span>
                                            </div>


                                            <div className="flex flex-col gap-1">
                                                <span className="text-muted-foreground text-xs">Date reported</span>
                                                <span>{new Date(thread.created_at).toLocaleString()}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-muted-foreground text-xs">Reported by</span>
                                                <span>{thread.reported_by ?? 'Genie ZeroOps agent'}</span>
                                            </div>

                                            <div className="items-center border-t flex justify-between py-3">
                                                <span className="font-medium">Root cause summary</span>
                                                <Button onClick={() => setShowRootCauseSummary((open) => !open)} size="sm" variant="ghost">
                                                    {showRootCauseSummary ? 'Collapse' : 'Expand'}
                                                </Button>
                                            </div>
                                            {showRootCauseSummary && (
                                                <p className="text-muted-foreground -mt-1 leading-relaxed">
                                                    {thread.root_cause_summary ?? 'Root cause summary is not available yet.'}
                                                </p>
                                            )}

                                            <div className="items-center border-t flex justify-between py-3">
                                                <span className="font-medium">Activity</span>
                                                <Button onClick={() => setShowProgress((open) => !open)} size="sm" variant="ghost">
                                                    {showProgress ? 'Collapse' : 'Expand'}
                                                </Button>
                                            </div>
                                            {showProgress && (
                                                <div className="flex flex-col -mt-0.5">
                                                    {(thread.progress_updates ?? []).map((step, index, steps) => (
                                                        <div className="flex gap-3.5" key={`${index}-${step.description}`}>
                                                            <div className="flex flex-col items-center pt-1.5">
                                                                <span
                                                                    className={`rounded-full block size-2 ${
                                                                        step.status === 'completed' && thread.status === 'resolved'
                                                                            ? 'bg-green-500'
                                                                            : ProgressDotClass[step.status]
                                                                    }`}
                                                                />
                                                                {index < steps.length - 1 && <span className="bg-border/80 block w-px flex-1 my-1.5" />}
                                                            </div>
                                                            <div className={`${index < steps.length - 1 ? 'pb-3.5' : ''}`}>
                                                                <p className={`leading-relaxed ${step.status === 'current' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                                    {step.description}
                                                                </p>
                                                                {step.detail && (
                                                                    <p className="text-muted-foreground text-[12px] leading-relaxed mt-0.5">
                                                                        {step.detail}
                                                                    </p>
                                                                )}
                                                                <div className="items-center text-muted-foreground text-[11px] inline-flex gap-1.5">
                                                                    <span>{new Date(step.timestamp).toLocaleString()}</span>
                                                                    <span>•</span>
                                                                    <span>{ProgressStatusLabel[step.status]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {(!thread.progress_updates || thread.progress_updates.length === 0) && (
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            No progress updates are available yet.
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
