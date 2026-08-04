'use client'

import { useState } from 'react'

import { DagIcon } from '@/lib/icons'

import { Graph } from '@/components/app/graph'
import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'

import { GraphDef } from '@/data/graphs'

const graph: GraphDef = {
    title: 'Example',
    nodes: [
        {
            id: '0',
            label: 'Ingest events',
            position: { x: 50, y: 50 },
            content: { label: 'Source', value: '/pipelines/bronze/raw_events' },
            showTarget: false,
            taskType: 'notebook',
        },
        {
            id: '1',
            label: 'Transform',
            position: { x: 340, y: 50 },
            content: { label: 'Job', value: '/workflows/transform_daily' },
            taskType: 'python-script',
        },
        {
            id: '2',
            label: 'Publish',
            position: { x: 630, y: 50 },
            content: { label: 'Target', value: '/pipelines/gold/events_dashboard' },
            showSource: false,
            taskType: 'pipeline',
        },
    ],
    edges: [
        { id: 'e0-1', source: '0', target: '1' },
        { id: 'e1-2', source: '1', target: '2' },
    ],
}

function Page() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Graph</h1>
            <Preview onOpenChange={setOpen} open={open}>
                <PreviewTrigger open={open}>
                    <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                        <DagIcon
                            className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                        />
                    </span>
                    <div className="items-center flex flex-1 gap-2 text-left">
                        <span>Lineage graph</span>
                        <span className="text-muted-foreground">3 steps</span>
                    </div>
                </PreviewTrigger>
                <PreviewContent className="p-0">
                    <Graph className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] h-74" graph={graph} />
                </PreviewContent>
            </Preview>
        </div>
    )
}

export default Page
