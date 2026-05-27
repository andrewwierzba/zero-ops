import {
    ChevronDownIcon,
    CircleCheckIcon,
    CircleXIcon,
    ColumnsIcon,
    DatabaseIcon,
    EllipsisVerticalIcon,
    FastForwardIcon,
    GitBranchIcon,
    LoaderCircleIcon,
    MinusIcon,
    PencilIcon,
    PlayIcon,
    UserIcon,
    WorkflowIcon,
} from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Run = {
    id: string
    startedAt: string
    status: "Failed" | "Maximum concurrent runs reached" | "Running" | "Succeeded"
}

type Tag = {
    id: string
    value: string
}

type Item = {
    id: string
    name: string
    recentRuns: Run[]
    servicePrincipal: string
    tags: Tag[]
    tasks: string[]
    trigger: string
    type: 'Job' | 'Pipeline'
}

const jobs: Item[] = [
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
        name: 'prod_daily_customer_rollup',
        recentRuns: [
            { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', startedAt: '1 min ago', status: 'Running' },
            { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480', startedAt: '22 min ago', status: 'Succeeded' },
            { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481', startedAt: '2 h ago', status: 'Succeeded' },
            { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482', startedAt: '6 h ago', status: 'Succeeded' },
            { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483', startedAt: '1 d ago', status: 'Succeeded' },
        ],
        servicePrincipal: 'sp-analytics-scheduler',
        tags: [
            { id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', value: 'analytics' },
            { id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', value: 'prod' },
        ],
        tasks: ['bronze_to_silver'],
        trigger: 'Scheduled',
        type: 'Job',
    },
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
        name: 'finance_revenue_backfill',
        recentRuns: [],
        servicePrincipal: 'James Rodriguez',
        tags: [{ id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', value: 'finance' }],
        tasks: ['extract_revenue'],
        trigger: 'Paused',
        type: 'Job',
    },
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
        name: 'bronze_to_silver_orders',
        recentRuns: [
            { id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', startedAt: '4 min ago', status: 'Succeeded' },
            { id: '6ba7b811-9dad-11d1-80b4-00c04fd430c9', startedAt: '31 min ago', status: 'Succeeded' },
            { id: '6ba7b812-9dad-11d1-80b4-00c04fd430ca', startedAt: '2 h ago', status: 'Succeeded' },
            { id: '6ba7b813-9dad-11d1-80b4-00c04fd430cb', startedAt: '8 h ago', status: 'Succeeded' },
            { id: '6ba7b814-9dad-11d1-80b4-00c04fd430cc', startedAt: '2 d ago', status: 'Succeeded' },
        ],
        servicePrincipal: 'sp-data-platform-prod',
        tags: [
            { id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', value: 'medallion' },
            { id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', value: 'orders' },
        ],
        tasks: ['validate_schema', 'transform_orders'],
        trigger: 'Triggered',
        type: 'Job',
    },
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
        name: 'ml_feature_store_refresh',
        recentRuns: [
            { id: '550e8400-e29b-41d4-a716-446655440001', startedAt: '12 min ago', status: 'Succeeded' },
            { id: '550e8400-e29b-41d4-a716-446655440002', startedAt: '45 min ago', status: 'Failed' },
            { id: '550e8400-e29b-41d4-a716-446655440003', startedAt: '3 h ago', status: 'Succeeded' },
            { id: '550e8400-e29b-41d4-a716-446655440004', startedAt: '9 h ago', status: 'Failed' },
            { id: '550e8400-e29b-41d4-a716-446655440005', startedAt: '1 d ago', status: 'Failed' },
        ],
        servicePrincipal: 'Priya Sharma',
        tags: [{ id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', value: 'ml' }],
        tasks: ['compute_features', 'validate_features', 'publish_features'],
        trigger: 'Scheduled',
        type: 'Job',
    },
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
        name: 'warehouse_sync_nightly',
        recentRuns: [
            { id: '7c9e6679-7425-40de-944b-e07fc1f90ae7', startedAt: '2 min ago', status: 'Succeeded' },
            { id: '7c9e6679-7425-40de-944b-e07fc1f90ae8', startedAt: '28 min ago', status: 'Succeeded' },
            { id: '7c9e6679-7425-40de-944b-e07fc1f90ae9', startedAt: '1 h ago', status: 'Succeeded' },
            { id: '7c9e6679-7425-40de-944b-e07fc1f90aea', startedAt: '7 h ago', status: 'Succeeded' },
            { id: '7c9e6679-7425-40de-944b-e07fc1f90aeb', startedAt: '3 d ago', status: 'Succeeded' },
        ],
        servicePrincipal: 'sp-warehouse-sync',
        tags: [{ id: 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a07', value: 'warehouse' }],
        tasks: ['sync_tables'],
        trigger: 'Scheduled',
        type: 'Job',
    },
]


function RunStatusIcon({ status }: { status: Run['status'] | null }) {
    if (!status) {
        return <MinusIcon aria-hidden className="text-neutral-200 dark:text-neutral-800 size-4" />
    }

    switch (status) {
        case 'Failed':
            return <CircleXIcon className="text-red-600 size-4" />
        case 'Maximum concurrent runs reached':
            return <FastForwardIcon className="text-muted-foreground size-4" />
        case 'Succeeded':
            return <CircleCheckIcon className="text-green-600 size-4" />
        case 'Running':
            return <LoaderCircleIcon className="animate-spin text-muted-foreground size-4" />
    }
}

function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 py-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <button className="items-start border rounded-md flex gap-3 p-3 text-left hover:bg-muted/30" type="button">
                    <div className="bg-muted rounded-sm p-1.5">
                        <DatabaseIcon className="size-4" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">Ingestion pipeline</p>
                        <p className="text-muted-foreground text-xs">Ingest data from apps, databases and files</p>
                    </div>
                </button>
                <button className="items-start border rounded-md flex gap-3 p-3 text-left hover:bg-muted/30" type="button">
                    <div className="bg-muted rounded-sm p-1.5">
                        <WorkflowIcon className="size-4" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">ETL pipeline</p>
                        <p className="text-muted-foreground text-xs">Build ETL pipelines using SQL and Python</p>
                    </div>
                </button>
                <button className="items-start border rounded-md flex gap-3 p-3 text-left hover:bg-muted/30" type="button">
                    <div className="bg-muted rounded-sm p-1.5">
                        <GitBranchIcon className="size-4" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">Job</p>
                        <p className="text-muted-foreground text-xs">Orchestrate notebooks, pipelines, queries and more</p>
                    </div>
                </button>
            </div>

            <div className="items-center flex flex-wrap gap-2">
                <Input className="rounded-sm flex-1" placeholder="Filter by name or ID substring" />
                
                <ToggleGroup variant="outline">
                    <ToggleGroupItem className="rounded-l-sm!" value="all">All</ToggleGroupItem>
                    <ToggleGroupItem value="jobs">Jobs</ToggleGroupItem>
                    <ToggleGroupItem className="rounded-r-sm!" value="pipelines">Pipelines</ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup variant="outline">
                    <ToggleGroupItem className="rounded-l-sm!" value="owned-by-me">Owned by me</ToggleGroupItem>
                    <ToggleGroupItem value="accessible-by-me">Accessible by me</ToggleGroupItem>
                    <ToggleGroupItem className="rounded-r-sm!" value="favorites">Favorites</ToggleGroupItem>
                </ToggleGroup>

                <Button className="rounded-sm" variant="outline">
                    Tags
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                <Button className="rounded-sm" variant="outline">
                    Run as
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                
                <Button className="bg-[rgb(34,114,180)] dark:bg-[rgb(64,152,224)] rounded-sm ml-auto">
                    Create
                    <ChevronDownIcon />
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Run as</TableHead>
                        <TableHead>Tasks</TableHead>
                        <TableHead>Trigger</TableHead>
                        <TableHead>Recent runs</TableHead>
                        <TableHead className="items-center flex justify-end">
                            <Button variant="ghost" size="icon-sm">
                                <ColumnsIcon className="text-muted-foreground size-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => {
                        const recentRunsOldestFirst = [...job.recentRuns.slice(0, 5)].reverse()
                        const emptySlots = 5 - recentRunsOldestFirst.length

                        return (
                        <TableRow key={job.id}>
                            <TableCell>
                                <Link className="text-[rgb(34,114,180)] dark:text-[rgb(64,152,224)]" href={`/jobs/${job.id}`}>
                                    {job.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <span className="items-center flex gap-1">
                                    <WorkflowIcon className="text-muted-foreground size-4" />
                                    <span>{job.type}</span>
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="items-center flex gap-1">
                                    {job.tags.map((tag) => (
                                        <span className="bg-muted rounded-sm px-1" key={tag.id}>
                                            {tag.value}
                                        </span>
                                    ))}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="items-center flex gap-1">
                                    <UserIcon className="text-muted-foreground size-4" />
                                    <span>{job.servicePrincipal}</span>
                                </span>
                            </TableCell>
                            <TableCell>
                                {job.tasks.length > 1
                                    ? <span className="items-center bg-muted rounded-sm inline-flex gap-0.5 px-1">
                                        <span className="truncate">{job.tasks.length} tasks</span>
                                        <ChevronDownIcon className="text-muted-foreground size-4" />
                                      </span>
                                    : <Link className="text-[rgb(34,114,180)] dark:text-[rgb(64,152,224)]" href={"#"}>
                                        {job.tasks}
                                      </Link>
                                }
                            </TableCell>
                            <TableCell>{job.trigger}</TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const run = i < emptySlots ? undefined : recentRunsOldestFirst[i - emptySlots]
                                        return (
                                            <span className="inline-flex" key={run?.id ?? `no-run-${job.id}-${i}`}>
                                                <RunStatusIcon status={run?.status ?? null} />
                                            </span>
                                        )
                                    })}
                                </div>
                            </TableCell>
                            <TableCell className="items-center flex gap-1 justify-end">
                                <Button variant="ghost" size="icon-sm">
                                    <PlayIcon className="text-muted-foreground size-4" />
                                </Button>
                                <Button variant="ghost" size="icon-sm">
                                    <PencilIcon className="text-muted-foreground size-4" />
                                </Button>
                                <Button variant="ghost" size="icon-sm">
                                    <EllipsisVerticalIcon className="text-muted-foreground size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page
