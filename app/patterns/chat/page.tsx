'use client'

import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { GitPullRequestIcon } from 'lucide-react'
import { DagIcon } from '@/lib/icons'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { CodeBlock } from '@/components/app/code-block'
import { CodeChange } from '@/components/app/code-change'
import { Graph } from '@/components/app/graph'
import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'

import { GraphDef } from '@/data/graphs'
import { CodeChange as CodeChangeData } from '@/data/messages'

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

const fileChangeUsers: CodeChangeData = {
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
    ],
    style: 'single',
}

const actionableSingle: CodeChangeData = {
    actions: [
        { label: 'Review', variant: 'secondary' },
        { icon: GitPullRequestIcon, label: 'Create pull request', variant: 'primary' },
    ],
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
    ],
    style: 'group',
}

const actionableGroup: CodeChangeData = {
    actions: [
        { label: 'Review', variant: 'secondary' },
        { icon: GitPullRequestIcon, label: 'Create pull request', variant: 'primary' },
    ],
    files: [
        {
            code: `- def get_user(id):
+ def get_user(id: int) -> User:
+     """Fetch a user by id."""
  user = db.query(User).filter(User.id == id).first()
  if user is None:
      raise NotFound()
  return user`,
            filename: 'users.py',
            language: 'diff',
        },
        {
            code: `- def login(email, password):
-     user = User.query.filter_by(email=email).first()
-     return user.token
+ def login(email: str, password: str) -> str:
+     user = User.query.filter_by(email=email).first()
+     if not user or not user.check_password(password):
+         raise AuthError("Invalid credentials")
+     return create_token(user.id)`,
            filename: 'auth.py',
            language: 'diff',
        },
    ],
    style: 'group',
}

function Page() {
    const [previewDemoOpen, setPreviewDemoOpen] = useState(false)
    const [lineageOpen, setLineageOpen] = useState(false)

    return (
        <div className="overflow-y-scroll py-6 text-[13px]">
            <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
                <h4 className="text-xl font-bold">Code block</h4>

                <h6 className="text-md font-bold">Default</h6>
                <CodeBlock className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)]" language="python">
                    {`def get_user(id):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise NotFound()
    return user`}
                </CodeBlock>

                <h6 className="text-md font-bold">File change</h6>
                <CodeChange {...fileChangeUsers} />

                <h6 className="text-md font-bold">Actionable</h6>
                <CodeChange {...actionableSingle} />
                <CodeChange {...actionableGroup} />

                <h4 className="text-2xl font-bold">Preview</h4>
                <Preview onOpenChange={setPreviewDemoOpen} open={previewDemoOpen}>
                    <PreviewTrigger open={previewDemoOpen}>
                        <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                            <DagIcon
                                className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                            />
                        </span>
                        <span className="flex-1 text-left">Preview</span>
                    </PreviewTrigger>
                    <PreviewContent>
                        <span>PreviewContent</span>
                    </PreviewContent>
                </Preview>

                <h4 className="text-2xl font-bold">Examples</h4>
                <h6 className="text-xl font-bold">Lineage</h6>
                <Preview onOpenChange={setLineageOpen} open={lineageOpen}>
                    <PreviewTrigger open={lineageOpen}>
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

                <h6 className="text-xl font-bold">Chart</h6>
                <div className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] border rounded-[4px] flex flex-col gap-2 p-4 w-full">
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
