'use client'

import { PlusMinusSquareIcon } from '@/lib/icons'

import { useState } from 'react'

import { CodeBlock } from '@/components/app/code-block'
import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { CodeChange as CodeChangeProps, CodeChangeAction, CodeChangeFile } from '@/data/messages'

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

const FILENAME_LANGUAGE_MAP: Record<string, string> = {
    py: 'python',
    sql: 'sql',
    scala: 'scala',
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    yaml: 'yaml',
    yml: 'yaml',
    json: 'json',
    md: 'markdown',
    sh: 'bash',
    bash: 'bash',
}

function languageFromFilename(filename: string): string | undefined {
    const ext = filename.split('.').pop()?.toLowerCase()
    return ext ? FILENAME_LANGUAGE_MAP[ext] : undefined
}

function DiffCount({ added, removed }: DiffCounts) {
    return (
        <span className="flex font-bold gap-1">
            <span className="text-[rgb(39,124,67)]">+{added}</span>
            <span className="text-[rgb(200,45,76)]">-{removed}</span>
        </span>
    )
}

function SingleFilePreview({ file }: { file: CodeChangeFile }) {
    const [open, setOpen] = useState(false)
    const isDiff = file.language === 'diff'
    const counts = isDiff ? countDiff(file.code) : null

    return (
        <Preview
            className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)]"
            onOpenChange={setOpen}
            open={open}
        >
            <PreviewTrigger open={open}>
                <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                    <PlusMinusSquareIcon
                        className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                    />
                </span>
                <div className="items-center flex flex-1 gap-2 text-left">
                    <span>{file.filename}</span>
                    {counts && <DiffCount {...counts} />}
                </div>
            </PreviewTrigger>
            <PreviewContent className="border-inherit p-0">
                <CodeBlock
                    className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border-none rounded-none w-full"
                    diff={isDiff}
                    language={isDiff ? languageFromFilename(file.filename) : file.language}
                >
                    {file.code}
                </CodeBlock>
            </PreviewContent>
        </Preview>
    )
}

function GroupFilePreview({ file, hideDiffCount }: { file: CodeChangeFile; hideDiffCount?: boolean }) {
    const [open, setOpen] = useState(false)
    const isDiff = file.language === 'diff'
    const counts = isDiff && !hideDiffCount ? countDiff(file.code) : null

    return (
        <Preview className="bg-inherit border-x-0 border-b-0 border-t rounded-none" onOpenChange={setOpen} open={open}>
            <PreviewTrigger open={open}>
                <div className="items-center flex flex-1 gap-2 text-left">
                    <span>{file.filename}</span>
                    {counts && <DiffCount {...counts} />}
                </div>
            </PreviewTrigger>
            <PreviewContent className="border-inherit p-0">
                <CodeBlock
                    className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border-none rounded-none w-full"
                    diff={isDiff}
                    language={isDiff ? languageFromFilename(file.filename) : file.language}
                >
                    {file.code}
                </CodeBlock>
            </PreviewContent>
        </Preview>
    )
}

function ActionButton({ action, onClick }: { action: CodeChangeAction; onClick?: () => void }) {
    const variant = action.variant ?? 'secondary'
    const isPrimary = variant === 'primary'
    const isDestructive = variant === 'destructive'
    const Icon = action.icon

    return (
        <Button
            className={cn(
                'rounded-[4px] font-normal',
                !isPrimary && !isDestructive &&
                    'hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(138,202,255)]/8 border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] hover:border-[rgb(34,114,180)] dark:hover:border-[rgb(138,202,255)] text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] hover:text-[rgb(34,114,180)] dark:hover:text-[rgb(138,202,255)]',
                isPrimary &&
                    'bg-[rgb(34,114,180)] hover:bg-[rgb(14,83,139)] dark:bg-[rgb(66,153,224)] dark:hover:bg-[rgb(138,202,255)] text-[rgb(255,255,255)] dark:text-[rgb(17,23,28)]',
            )}
            data-icon={Icon ? 'inline-start' : undefined}
            onClick={onClick}
            size="sm"
            variant={isPrimary ? 'default' : isDestructive ? 'destructive' : 'outline'}
        >
            {Icon && <Icon className="size-4" />}
            {action.label}
        </Button>
    )
}

export function CodeChange({ actions, files, onAction, style }: CodeChangeProps & { onAction?: (label: string) => void }) {
    if (files.length === 0) return null

    const hasActions = !!actions && actions.length > 0

    if (style === 'single' && !hasActions) {
        return <SingleFilePreview file={files[0]} />
    }

    const isSingle = files.length === 1
    const totals = files.reduce<DiffCounts>(
        (acc, file) => {
            if (file.language !== 'diff') return acc
            const { added, removed } = countDiff(file.code)
            return { added: acc.added + added, removed: acc.removed + removed }
        },
        { added: 0, removed: 0 }
    )
    const hasDiff = files.some((file) => file.language === 'diff')
    const headerLabel = isSingle ? files[0].filename : `${files.length} files changed`
    const headerCounts = isSingle && files[0].language === 'diff' ? countDiff(files[0].code) : totals

    return (
        <div className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] rounded-lg text-[13px] overflow-hidden">
            <div className="items-center flex flex-1 gap-2 justify-between px-2 py-2 text-left">
                <div className="items-center flex gap-2">
                    <span className="items-center bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex justify-center size-6">
                        <PlusMinusSquareIcon
                            className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                        />
                    </span>
                    <span>{headerLabel}</span>
                    {hasDiff && <DiffCount {...headerCounts} />}
                </div>
                {hasActions && (
                    <div className="items-center flex gap-1">
                        {actions!.map((action) => (
                            <ActionButton
                                action={action}
                                key={action.label}
                                onClick={onAction ? () => onAction(action.label) : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div>
                {files.map((file) => (
                    <GroupFilePreview file={file} hideDiffCount={isSingle} key={file.filename} />
                ))}
            </div>
        </div>
    )
}
