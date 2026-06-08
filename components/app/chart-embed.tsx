'use client'

import { useId, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// import { ChartLineIcon } from '@databricks/design-system'
import { LineChart } from 'lucide-react'

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'

import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'

import { charts, ChartDef } from '@/data/charts'

export type ChartEmbedMode = 'collapsed' | 'expanded'

function ChartCanvas({ chart }: { chart: ChartDef }) {
    const gradientId = useId()
    const fillId = `${gradientId}-fill`
    const strokeId = `${gradientId}-stroke`

    const config = {
        rows: {
            label: chart.config.rows.label,
            color: chart.config.rows.color,
        },
    } satisfies ChartConfig

    return (
        <ChartContainer
            className="aspect-auto bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] h-[200px] p-4 w-full"
            config={config}
        >
            <AreaChart data={chart.data} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                    <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="75%" stopColor="rgb(34,114,180)" stopOpacity={0.1} />
                        <stop offset="75%" stopColor="rgb(200,45,76)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="75%" stopColor="rgb(34,114,180)" />
                        <stop offset="75%" stopColor="rgb(200,45,76)" />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    axisLine={false}
                    dataKey="time"
                    interval={2}
                    padding={{ left: 16, right: 16 }}
                    tickLine={false}
                    tickMargin={8}
                />
                <YAxis
                    axisLine={false}
                    tickFormatter={(value) => (value === 0 ? '0' : `${value / 1000}k`)}
                    tickLine={false}
                    tickMargin={4}
                    width={36}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            formatter={(value) => (value as number).toLocaleString()}
                            indicator="line"
                        />
                    }
                />
                <Area
                    dataKey="rows"
                    fill={`url(#${fillId})`}
                    stroke={`url(#${strokeId})`}
                    strokeWidth={2}
                    type="stepAfter"
                />
            </AreaChart>
        </ChartContainer>
    )
}

export function ChartEmbed({ id, mode }: { id: string; mode?: ChartEmbedMode }) {
    const chart = charts[id]
    const [open, setOpen] = useState(mode === 'expanded')

    if (!chart) {
        return (
            <div className="border border-dashed rounded-md text-muted-foreground text-xs px-3 py-2">
                Chart not found: {id}
            </div>
        )
    }

    if (!mode) {
        return (
            <div className="border rounded-md overflow-hidden">
                <ChartCanvas chart={chart} />
            </div>
        )
    }

    return (
        <Preview onOpenChange={setOpen} open={open}>
            <PreviewTrigger open={open}>
                <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                    <LineChart
                        className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                    />
                </span>
                <div className="items-center flex flex-1 gap-2 text-left">
                    <span>{chart.title}</span>
                    {chart.subtitle && <span className="text-muted-foreground">{chart.subtitle}</span>}
                </div>
            </PreviewTrigger>
            <PreviewContent className="p-0">
                <ChartCanvas chart={chart} />
            </PreviewContent>
        </Preview>
    )
}
