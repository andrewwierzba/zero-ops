'use client'

import { ChevronDownIcon } from '@/lib/icons'

import { useState } from 'react'

import { MessageContent } from '@/components/app/message-content'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { CodeChange, Thought, ThoughtStep } from '@/data/messages'

type CodeChangeMap = Record<string, CodeChange> | undefined

function formatWorkedDuration(ms: number) {
    const totalSec = Math.max(1, Math.round(ms / 1000))
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    if (m === 0) return `Worked ${s} second${s === 1 ? '' : 's'}`
    if (s === 0) return `Worked ${m} minute${m === 1 ? '' : 's'}`
    return `Worked ${m} minute${m === 1 ? '' : 's'} and ${s} second${s === 1 ? '' : 's'}`
}

function ThoughtStepRow({ codeChanges, step }: { codeChanges: CodeChangeMap; step: ThoughtStep }) {
    const [open, setOpen] = useState(step.defaultOpen ?? false)

    return (
        <Collapsible onOpenChange={setOpen} open={open}>
            <CollapsibleTrigger className="items-center text-muted-foreground hover:text-foreground flex gap-1.5 text-xs text-left transition-colors">
                <span>{step.summary}</span>
                <ChevronDownIcon
                    className={`${open ? '' : '-rotate-90'} shrink-0 size-3 transition-transform`}
                />
            </CollapsibleTrigger>
            {step.content && (
                <CollapsibleContent>
                    <div className="text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] flex flex-col gap-2 text-[13px] leading-relaxed pt-1">
                        <MessageContent codeChanges={codeChanges} content={step.content} />
                    </div>
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}

export interface ThoughtBlockProps extends Thought {
    codeChanges?: Record<string, CodeChange>
}

export function ThoughtBlock({ codeChanges, defaultOpen, duration_ms, steps, summary }: ThoughtBlockProps) {
    const [open, setOpen] = useState(defaultOpen ?? false)

    return (
        <Collapsible onOpenChange={setOpen} open={open}>
            <CollapsibleTrigger className="items-center text-muted-foreground hover:text-foreground flex gap-1.5 text-xs text-left transition-colors">
                <span>{formatWorkedDuration(duration_ms)}</span>
                <ChevronDownIcon
                    className={`${open ? '' : '-rotate-90'} shrink-0 size-3 transition-transform`}
                />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="flex flex-col gap-2 pt-2">
                    {summary && (
                        <div className="text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] flex flex-col gap-2 text-[13px] leading-relaxed">
                            <MessageContent codeChanges={codeChanges} content={summary} />
                        </div>
                    )}
                    {steps && steps.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {steps.map((step, i) => (
                                <ThoughtStepRow codeChanges={codeChanges} key={`${i}-${step.summary}`} step={step} />
                            ))}
                        </div>
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
