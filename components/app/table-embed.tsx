'use client'

import { useState } from 'react'

import { TableIcon } from '@/lib/icons'

import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { tables, TableDef } from '@/data/tables'

export type TableEmbedMode = 'collapsed' | 'expanded'

function TableCanvas({ table }: { table: TableDef }) {
    return (
        <Table className="text-[13px] leading-[20px]">
            <TableHeader>
                <TableRow>
                    {table.columns.map((col) => (
                        <TableHead
                            key={col.key}
                            className={col.align === 'right' ? 'text-right' : ''}
                        >
                            {col.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {table.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {table.columns.map((col) => (
                            <TableCell
                                key={col.key}
                                className={col.align === 'right' ? 'text-right' : ''}
                            >
                                {row[col.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function TableEmbed({ id, mode }: { id: string; mode?: TableEmbedMode }) {
    const table = tables[id]
    const [open, setOpen] = useState(mode === 'expanded')

    if (!table) {
        return (
            <div className="border border-dashed rounded-md text-muted-foreground text-xs px-3 py-2">
                Table not found: {id}
            </div>
        )
    }

    if (!mode) {
        return (
            <div className="border rounded-md overflow-hidden">
                <TableCanvas table={table} />
            </div>
        )
    }

    return (
        <Preview onOpenChange={setOpen} open={open}>
            <PreviewTrigger open={open}>
                <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                    <TableIcon
                        className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                    />
                </span>
                <div className="items-center flex flex-1 gap-2 text-left">
                    <span>{table.title}</span>
                </div>
            </PreviewTrigger>
            <PreviewContent className="p-0">
                <TableCanvas table={table} />
            </PreviewContent>
        </Preview>
    )
}
