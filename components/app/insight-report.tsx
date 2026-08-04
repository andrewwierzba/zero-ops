'use client'

import { MessageContent } from '@/components/app/message-content'
import { Reference } from '@/components/app/reference'

import { Message } from '@/data/messages'
import { Thread } from '@/data/threads'

type ThreadStatus = NonNullable<Thread['status']>
type ThreadSeverity = NonNullable<Thread['severity']>
type ProgressStatus = NonNullable<NonNullable<Thread['progress_updates']>[number]['status']>

const StatusMetadata: Record<ThreadStatus, { dotClass: string; label: string }> = {
    not_an_issue: { dotClass: 'bg-[rgb(111,111,111)]', label: 'Not an issue' },
    open: { dotClass: 'bg-[rgb(190,80,30)]', label: 'Open' },
    resolved: { dotClass: 'bg-[rgb(39,124,67)]', label: 'Resolved' },
}

const SeverityLabel: Record<ThreadSeverity, string> = {
    minor: 'Minor',
    moderate: 'Moderate',
    critical: 'Critical',
}

const ProgressDotClass: Record<ProgressStatus, string> = {
    completed: 'bg-blue-500',
    current: 'bg-muted-foreground/45',
    pending: 'bg-muted-foreground/30',
}

const ProgressStatusLabel: Record<ProgressStatus, string> = {
    completed: 'Completed',
    current: 'In progress',
    pending: 'Queued',
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
            {children}
        </h2>
    )
}

export interface InsightReportProps {
    thread: Thread
    /** The agent message that carries the insight body + any code changes. */
    message?: Message
    onAction?: (label: string) => void
}

/**
 * Report-page rendering of a ZeroOps insight — the research alternative to the
 * chat thread view (reached via /c/[threadId]?view=report). Presents the same
 * insight as a static document: summary, root cause, impact, the agent's
 * findings, and an activity timeline, rather than a back-and-forth conversation.
 */
export function InsightReport({ thread, message, onAction }: InsightReportProps) {
    const updates = thread.progress_updates ?? []
    const impactAssets = thread.impact_assets ?? []

    return (
        <article className="flex flex-col gap-8 max-w-3xl mx-auto text-[13px] leading-[20px] py-2">
            {/* Report header */}
            <header className="flex flex-col gap-3 border-b pb-6">
                <div className="items-center flex flex-wrap gap-2 text-xs">
                    <span className="bg-muted rounded-sm text-muted-foreground inline-flex px-1.5 py-0.5">
                        {thread.severity ? SeverityLabel[thread.severity] : 'Minor'}
                    </span>
                    {thread.status && (
                        <span className="items-center bg-background border rounded-sm text-muted-foreground inline-flex gap-1 px-1.5 py-0.5">
                            <span className={`${StatusMetadata[thread.status].dotClass} rounded-full block size-2`} />
                            {StatusMetadata[thread.status].label}
                        </span>
                    )}
                </div>
                <h1 className="text-[24px] leading-8 font-bold">{thread.label}</h1>
                <div className="items-center flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground text-xs">
                    <span>Reported by {thread.reported_by ?? 'Genie ZeroOps'}</span>
                    <span>{new Date(thread.created_at).toLocaleString()}</span>
                </div>
            </header>

            {/* Root cause */}
            {thread.root_cause_summary && (
                <section className="flex flex-col gap-2">
                    <SectionHeading>Root cause</SectionHeading>
                    <p className="whitespace-pre-wrap">{thread.root_cause_summary}</p>
                </section>
            )}

            {/* Impact */}
            {impactAssets.length > 0 && (
                <section className="flex flex-col gap-2">
                    <SectionHeading>Impacted assets</SectionHeading>
                    <div className="flex flex-wrap gap-1.5">
                        {impactAssets.map((asset) => (
                            <Reference key={asset} type="asset" kind="job" label={asset} />
                        ))}
                    </div>
                </section>
            )}

            {/* Findings — the agent's analysis body, reusing the same renderer as chat */}
            {message && (
                <section className="flex flex-col gap-3">
                    <SectionHeading>Findings</SectionHeading>
                    <div className="flex flex-col gap-3">
                        <MessageContent codeChanges={message.code_changes} content={message.content} onAction={onAction} />
                    </div>
                </section>
            )}

            {/* Activity timeline */}
            {updates.length > 0 && (
                <section className="flex flex-col gap-3">
                    <SectionHeading>Activity</SectionHeading>
                    <div className="flex flex-col">
                        {updates.map((step, index, steps) => (
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
                                <div className={index < steps.length - 1 ? 'pb-3.5' : ''}>
                                    <p className={`leading-relaxed ${step.status === 'current' ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {step.description}
                                    </p>
                                    {step.detail && (
                                        <p className="text-muted-foreground text-[12px] leading-relaxed mt-0.5">
                                            {step.detail}
                                        </p>
                                    )}
                                    <div className="items-center text-muted-foreground text-[11px] inline-flex gap-1.5 mt-0.5">
                                        <span>{new Date(step.timestamp).toLocaleString()}</span>
                                        <span>•</span>
                                        <span>{ProgressStatusLabel[step.status]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </article>
    )
}
