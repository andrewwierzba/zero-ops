'use client'

import { DagIcon } from '@databricks/design-system'

import { useState } from 'react'

import { Graph } from '@/components/app/graph'
import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'

import { graphs } from '@/data/graphs'

export type GraphEmbedMode = 'collapsed' | 'expanded'

export function GraphEmbed({ id, mode }: { id: string; mode?: GraphEmbedMode }) {
    const graph = graphs[id]
    const [open, setOpen] = useState(mode === 'expanded')

    if (!graph) {
        return (
            <div className="border border-dashed rounded-md text-muted-foreground text-xs px-3 py-2">
                Lineage graph not found: {id}
            </div>
        )
    }

    if (!mode) {
        return (
            <div className="border rounded-md overflow-hidden">
                <Graph className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] h-74" graph={graph} />
            </div>
        )
    }

    const stepLabel = `${graph.nodes.length} step${graph.nodes.length === 1 ? '' : 's'}`

    return (
        <Preview
            className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)]"
            onOpenChange={setOpen}
            open={open}
        >
            <PreviewTrigger open={open}>
                <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                    <DagIcon
                        className="[&>svg]:text-[rgb(111,111,111)] dark:[&>svg]:text-[rgb(146,164,179)]"
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                    />
                </span>
                <div className="items-center flex flex-1 gap-2 text-left">
                    <span>{graph.title}</span>
                    <span className="text-muted-foreground">{stepLabel}</span>
                </div>
            </PreviewTrigger>
            <PreviewContent className="border-inherit p-0">
                <Graph className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] h-74" graph={graph} />
            </PreviewContent>
        </Preview>
    )
}
