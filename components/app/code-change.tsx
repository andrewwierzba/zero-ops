'use client'

import { ChevronDownIcon, PlusMinusSquareIcon } from '@databricks/design-system'

import { useState } from 'react'

import { CodeBlock } from '@/components/app/code-block'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'

import { CodeChange as CodeChangeProps, CodeChangeFile } from '@/data/messages'

type DiffCounts = { added: number; removed: number }

function countDiff(code: string): DiffCounts {
    let added = 0
    let removed = 0
    for (const line of code.split('\n')) {
        if (line.startsWith('+') && !line.startsWith('+++')) added++
        else if (line.startsWith('-') && !line.startsWith('---')) removed++
    }
    return { added, removed }
}

function diffLineNumbers(code: string): { addedLinesNumbers: number[]; removedLinesNumbers: number[] } {
    const addedLinesNumbers: number[] = []
    const removedLinesNumbers: number[] = []
    code.split('\n').forEach((line, i) => {
        if (line.startsWith('+') && !line.startsWith('+++')) addedLinesNumbers.push(i + 1)
        else if (line.startsWith('-') && !line.startsWith('---')) removedLinesNumbers.push(i + 1)
    })
    return { addedLinesNumbers, removedLinesNumbers }
}

function DiffCount({ added, removed }: DiffCounts) {
    return (
        <span className="items-center inline-flex gap-1 tabular-nums">
            <span className="text-[rgb(39,124,67)]">+{added}</span>
            <span className="text-[rgb(200,45,76)]">−{removed}</span>
        </span>
    )
}

function CollapsibleFile({ file, showCounts }: { file: CodeChangeFile; showCounts: boolean }) {
    const [open, setOpen] = useState(true)
    const isDiff = file.language === 'diff'
    const counts = isDiff ? countDiff(file.code) : null
    const { addedLinesNumbers, removedLinesNumbers } = isDiff
        ? diffLineNumbers(file.code)
        : { addedLinesNumbers: [], removedLinesNumbers: [] }

    return (
        <div>
            <Collapsible onOpenChange={setOpen} open={open}>
                <CollapsibleTrigger className="items-center hover:bg-rgb[0,0,0]/5 dark:hover:bg-[rgb(255,255,255)]/5 flex gap-3 text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] text-xs font-semibold justify-between px-3 py-2 transition-colors w-full">
                    <div className="items-center flex flex-1 gap-2 justify-between min-w-0">
                        <span className="font-mono min-w-0 truncate">
                            {file.filename}
                        </span>
                        <ChevronDownIcon
                            className={`${open ? '' : '-rotate-90'} shrink-0 size-3.5 transition-transform`}
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        />
                    </div>
                    {showCounts && counts && <DiffCount {...counts} />}
                </CollapsibleTrigger>
            </Collapsible>
            {open && (
                <div className="border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] border-t">
                <CodeBlock
                    addedLinesNumbers={addedLinesNumbers}
                    className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border-0 rounded-none"
                    hideLineNumbers
                    language={file.language}
                    removedLinesNumbers={removedLinesNumbers}
                >
                    {file.code}
                </CodeBlock>
                </div>
            )}
        </div>
    )
}

export function CodeChange({ actions, files, style }: CodeChangeProps) {
    if (files.length === 0) return null

    if (style === 'single') {
        const file = files[0]
        return (
            <div className="border rounded-lg overflow-hidden">
                <CollapsibleFile file={file} showCounts />
            </div>
        )
    }

    const totals = files.reduce<DiffCounts>(
        (acc, file) => {
            if (file.language !== 'diff') return acc
            const { added, removed } = countDiff(file.code)
            return { added: acc.added + added, removed: acc.removed + removed }
        },
        { added: 0, removed: 0 }
    )
    const hasDiff = files.some((file) => file.language === 'diff')
    const fileLabel = `${files.length} ${files.length === 1 ? 'file' : 'files'} changed`
    const showPerFileCounts = files.length > 1

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="items-center border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] flex text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] text-[13px] font-semibold gap-2 px-3 py-2">
                <div className="items-center bg-[rgb(246,247,249)] dark:bg-[rgb(31,39,45)] rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] flex justify-center size-6">
                    <PlusMinusSquareIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
                </div>
                <span>{fileLabel}</span>
                {hasDiff && <DiffCount {...totals} />}
                {actions && actions.length > 0 && (
                    <div className="items-center flex gap-1 ml-auto">
                        {actions.map((action) => (
                            <Button
                                key={action.label}
                                size="sm"
                                variant="outline"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] border-t">
                {files.map((file) => (
                    <CollapsibleFile
                        file={file}
                        key={file.filename}
                        showCounts={showPerFileCounts}
                    />
                ))}
            </div>
        </div>
    )
}
