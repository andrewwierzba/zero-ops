'use client'

import React from 'react'

import { ChartEmbed, ChartEmbedMode } from '@/components/app/chart-embed'
import { CodeBlock } from '@/components/app/code-block'
import { CodeChange } from '@/components/app/code-change'
import { GraphEmbed, GraphEmbedMode } from '@/components/app/graph-embed'
import { AssetKind, Reference } from '@/components/app/reference'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { CodeChange as CodeChangeData } from '@/data/messages'

type CodeChangeMap = Record<string, CodeChangeData> | undefined

const INLINE_REGEX = /\[\[(file|job|pipeline|table|column):([^\]]+)\]\]|\*\*([^*\n][^*]*?)\*\*|`([^`\n]+)`|\[([^\]]+)\]\(([^)]+)\)/g
const HEADING_REGEX = /^(#{1,6}) +(.+)$/gm
const EMBED_REGEX = /\[\[embed:(graph|chart|code_change)\|([^|\]]+)(?:\|(collapsed|expanded))?\]\]/g
const LIST_BLOCK_REGEX = /(^|\n)((?:- [^\n]+(?:\n|$))+)/g

function parseMarkdownTable(tableText: string, key: number) {
    const lines = tableText.trim().split('\n')
    if (lines.length < 2) return null

    const parseRow = (line: string) =>
        line.split('|').slice(1, -1).map((cell) => cell.trim())

    const headers = parseRow(lines[0])
    const dataRows = lines.slice(2).map(parseRow)

    return (
        <Table key={key}>
            <TableHeader>
                <TableRow>
                    {headers.map((header, i) => (
                        <TableHead key={i}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataRows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function renderInlineTags(text: string, baseKey: number): React.ReactNode[] {
    const out: React.ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null
    INLINE_REGEX.lastIndex = 0
    while ((match = INLINE_REGEX.exec(text)) !== null) {
        if (match.index > cursor) out.push(text.slice(cursor, match.index))
        const key = baseKey + match.index
        if (match[1]) {
            const raw = match[1]
            const [label, link] = match[2].split('|')
            out.push(
                raw === 'column'
                    ? <Reference key={key} type="column" label={label} />
                    : <Reference key={key} type="asset" kind={raw as AssetKind} label={label} link={link} />
            )
        } else if (match[3]) {
            out.push(<strong key={key}>{match[3]}</strong>)
        } else if (match[4]) {
            out.push(<Reference key={key} type="column" label={match[4]} />)
        } else {
            out.push(
                <a
                    className="text-[rgb(34,114,180)] dark:text-[rgb(138,202,255)] hover:underline"
                    href={match[6]}
                    key={key}
                >
                    {match[5]}
                </a>
            )
        }
        cursor = match.index + match[0].length
    }
    if (cursor < text.length) out.push(text.slice(cursor))
    return out
}

function renderParagraphsAndLists(text: string, baseKey: number): React.ReactNode[] {
    const out: React.ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null
    LIST_BLOCK_REGEX.lastIndex = 0
    while ((match = LIST_BLOCK_REGEX.exec(text)) !== null) {
        const listStart = match.index + match[1].length
        if (listStart > cursor) {
            const before = text.slice(cursor, listStart).trim()
            if (before) {
                out.push(
                    <p className="whitespace-pre-wrap" key={baseKey + cursor}>
                        {renderInlineTags(before, baseKey + cursor)}
                    </p>
                )
            }
        }
        const items = match[2].trim().split('\n').map((line) => line.slice(2))
        out.push(
            <ul className="list-disc list-outside flex flex-col gap-1 pl-5" key={`list-${baseKey + listStart}`}>
                {items.map((item, i) => (
                    <li key={i}>{renderInlineTags(item, baseKey + listStart + i)}</li>
                ))}
            </ul>
        )
        cursor = match.index + match[0].length
    }
    if (cursor < text.length) {
        const remaining = text.slice(cursor).trim()
        if (remaining) {
            out.push(
                <p className="whitespace-pre-wrap" key={baseKey + cursor}>
                    {renderInlineTags(remaining, baseKey + cursor)}
                </p>
            )
        }
    }
    return out
}

function renderTextWithTables(text: string, baseKey: number): React.ReactNode[] {
    const segments: React.ReactNode[] = []
    const tableRegex = /(\|.+\|[\r\n]+\|[-:\s|]+\|[\r\n]+(?:\|.+\|[\r\n]*)+)/g
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = tableRegex.exec(text)) !== null) {
        if (match.index > cursor) {
            const before = text.slice(cursor, match.index).trim()
            if (before) segments.push(...renderParagraphsAndLists(before, baseKey + cursor))
        }
        segments.push(parseMarkdownTable(match[1], baseKey + match.index))
        cursor = match.index + match[0].length
    }

    if (cursor < text.length) {
        const remaining = text.slice(cursor).trim()
        if (remaining) segments.push(...renderParagraphsAndLists(remaining, baseKey + cursor))
    }

    return segments
}

function renderTextWithHeadings(text: string, baseKey: number): React.ReactNode[] {
    const out: React.ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null
    HEADING_REGEX.lastIndex = 0
    while ((match = HEADING_REGEX.exec(text)) !== null) {
        if (match.index > cursor) {
            const before = text.slice(cursor, match.index).trim()
            if (before) out.push(...renderTextWithTables(before, baseKey + cursor))
        }
        const level = match[1].length
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const className = level === 1
            ? 'text-[18px] leading-6 font-bold'
            : 'text-[13px] leading-5 font-bold'
        out.push(
            <HeadingTag className={className} key={`heading-${baseKey + match.index}`}>
                {renderInlineTags(match[2], baseKey + match.index)}
            </HeadingTag>
        )
        cursor = match.index + match[0].length
    }
    if (cursor < text.length) {
        const remaining = text.slice(cursor).trim()
        if (remaining) out.push(...renderTextWithTables(remaining, baseKey + cursor))
    }
    return out
}

function renderMissing(label: string, key: string) {
    return (
        <div className="border border-dashed rounded-md text-muted-foreground text-xs px-3 py-2" key={key}>
            {label}
        </div>
    )
}

function renderTextSegment(
    text: string,
    baseKey: number,
    codeChanges: CodeChangeMap,
    onAction?: (label: string) => void,
): React.ReactNode[] {
    const out: React.ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null
    EMBED_REGEX.lastIndex = 0
    while ((match = EMBED_REGEX.exec(text)) !== null) {
        if (match.index > cursor) {
            const before = text.slice(cursor, match.index).trim()
            if (before) out.push(...renderTextWithHeadings(before, baseKey + cursor))
        }
        const kind = match[1]
        const id = match[2]
        const mode = match[3]
        const key = `${kind}-${baseKey + match.index}`
        if (kind === 'chart') {
            out.push(<ChartEmbed id={id} key={key} mode={mode as ChartEmbedMode | undefined} />)
        } else if (kind === 'graph') {
            out.push(<GraphEmbed id={id} key={key} mode={mode as GraphEmbedMode | undefined} />)
        } else if (kind === 'code_change') {
            const change = codeChanges?.[id]
            if (change) {
                out.push(<CodeChange key={key} {...change} onAction={onAction} />)
            } else {
                out.push(renderMissing(`Code change not found: ${id}`, key))
            }
        }
        cursor = match.index + match[0].length
    }
    if (cursor < text.length) {
        const remaining = text.slice(cursor).trim()
        if (remaining) out.push(...renderTextWithHeadings(remaining, baseKey + cursor))
    }
    return out
}

function renderContent(
    content: string,
    codeChanges: CodeChangeMap,
    onAction?: (label: string) => void,
): React.ReactNode[] {
    const segments: React.ReactNode[] = []
    const regex = /```(\w+)?\n([\s\S]*?)```/g
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(content)) !== null) {
        if (match.index > cursor) {
            const text = content.slice(cursor, match.index).trim()
            if (text) segments.push(...renderTextSegment(text, cursor, codeChanges, onAction))
        }
        const language = match[1]
        const code = match[2].trimEnd()
        if (language === 'diff') {
            segments.push(<CodeBlock diff inset key={match.index}>{code}</CodeBlock>)
        } else {
            segments.push(<CodeBlock hideLineNumbers inset key={match.index} language={language}>{code}</CodeBlock>)
        }
        cursor = match.index + match[0].length
    }

    if (cursor < content.length) {
        const text = content.slice(cursor).trim()
        if (text) segments.push(...renderTextSegment(text, cursor, codeChanges, onAction))
    }

    return segments
}

export interface MessageContentProps {
    codeChanges?: Record<string, CodeChangeData>
    content: string
    onAction?: (label: string) => void
}

export function MessageContent({ codeChanges, content, onAction }: MessageContentProps) {
    return <>{renderContent(content, codeChanges, onAction)}</>
}
