'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
    rows: {
        label: 'Committed rows',
        color: 'rgb(34,114,180)',
    },
} satisfies ChartConfig

const chartData = [
    { time: '14:00', rows: 16240 },
    { time: '14:05', rows: 15890 },
    { time: '14:10', rows: 17120 },
    { time: '14:15', rows: 16780 },
    { time: '14:20', rows: 16350 },
    { time: '14:25', rows: 17200 },
    { time: '14:30', rows: 16950 },
    { time: '14:35', rows: 16480 },
    { time: '14:40', rows: 17050 },
    { time: '14:45', rows: 0 },
    { time: '14:50', rows: 0 },
    { time: '14:55', rows: 0 },
    { time: '15:00', rows: 0 },
]

function Page() {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Chart</h1>

            <div className="border rounded-4xl flex flex-col gap-2 p-4">
                <div className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] rounded-lg flex flex-col gap-2 p-4 w-full">
                    <span className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] text-sm truncate">claims_enrichment_daily committed output rows · 1 hour</span>
                    <ChartContainer className="h-30 w-full" config={chartConfig}>
                        <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8 }}>
                            <defs>
                                <linearGradient id="rowsFill" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="75%" stopColor="rgb(34,114,180)" stopOpacity={0.1} />
                                    <stop offset="75%" stopColor="rgb(200,45,76)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="rowsStroke" x1="0" y1="0" x2="1" y2="0">
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
                                tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
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
                                fill="url(#rowsFill)"
                                stroke="url(#rowsStroke)"
                                strokeWidth={2}
                                type="stepAfter"
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    )
}

export default Page
