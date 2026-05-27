import Link from 'next/link'

import {
    ChevronDownIcon,
    CircleCheckIcon,
    CircleXIcon,
    ColumnsIcon,
    EllipsisVerticalIcon,
    LoaderCircleIcon,
    MinusIcon,
    SquareIcon,
    UserIcon,
    WorkflowIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type RunItem = {
    id: string
    jobId: string
    name: string
    type: 'Job' | 'Pipeline'
    runAs: string
    launched: 'Manual' | 'Scheduled' | 'Triggered'
    startedAt: string
    duration: string
    status: 'Failed' | 'Running' | 'Succeeded' | 'Cancelled' | 'Pending'
    errorCode: string | null
    runParameters: string | null
}

const runs: RunItem[] = [
    {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
        name: 'prod_daily_customer_rollup',
        type: 'Job',
        runAs: 'sp-analytics-scheduler',
        launched: 'Scheduled',
        startedAt: 'June 1, 2026, 1:04 PM',
        duration: '6m 14s',
        status: 'Running',
        errorCode: null,
        runParameters: '{"env": "prod"}',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
        name: 'finance_revenue_backfill',
        type: 'Job',
        runAs: 'James Rodriguez',
        launched: 'Manual',
        startedAt: 'June 1, 2026, 12:27 PM',
        duration: '3m 02s',
        status: 'Failed',
        errorCode: 'INVALID_PARAMETER_VALUE',
        runParameters: '{"start_date": "2024-01-01"}',
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
        name: 'bronze_to_silver_orders',
        type: 'Job',
        runAs: 'sp-data-platform-prod',
        launched: 'Triggered',
        startedAt: 'June 1, 2026, 11:56 AM',
        duration: '8m 41s',
        status: 'Succeeded',
        errorCode: null,
        runParameters: null,
    },
    {
        id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
        name: 'prod_daily_customer_rollup',
        type: 'Job',
        runAs: 'sp-analytics-scheduler',
        launched: 'Scheduled',
        startedAt: 'June 1, 2026, 11:00 AM',
        duration: '2m 18s',
        status: 'Succeeded',
        errorCode: null,
        runParameters: '{"env": "prod"}',
    },
    {
        id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
        name: 'warehouse_sync_nightly',
        type: 'Job',
        runAs: 'sp-warehouse-sync',
        launched: 'Scheduled',
        startedAt: 'June 1, 2026, 6:00 AM',
        duration: '12m 33s',
        status: 'Succeeded',
        errorCode: null,
        runParameters: null,
    },
    {
        id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
        jobId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
        name: 'ml_feature_store_refresh',
        type: 'Job',
        runAs: 'Priya Sharma',
        launched: 'Manual',
        startedAt: 'May 31, 2026, 10:15 PM',
        duration: '1m 45s',
        status: 'Failed',
        errorCode: 'RUN_EXECUTION_ERROR',
        runParameters: '{"count": 1000}',
    },
]

function RunStatusIcon({ status }: { status: RunItem['status'] }) {
    switch (status) {
        case 'Failed':
            return <CircleXIcon className="text-red-600 size-4" />
        case 'Cancelled':
            return <CircleXIcon className="text-neutral-500 size-4" />
        case 'Succeeded':
            return <CircleCheckIcon className="text-green-600 size-4" />
        case 'Running':
            return <LoaderCircleIcon className="animate-spin text-muted-foreground size-4" />
        case 'Pending':
            return <LoaderCircleIcon className="text-yellow-500 size-4" />
    }
}

function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 py-4">
            <div className="items-center flex flex-wrap gap-2">
                <Input className="rounded-sm flex-1" placeholder="Filter by name or Run ID" />

                <ToggleGroup variant="outline">
                    <ToggleGroupItem className="rounded-l-sm!" value="all">All</ToggleGroupItem>
                    <ToggleGroupItem value="jobs">Jobs</ToggleGroupItem>
                    <ToggleGroupItem className="rounded-r-sm!" value="pipelines">Pipelines</ToggleGroupItem>
                </ToggleGroup>

                <Button className="rounded-sm" variant="outline">
                    Run as
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                <Button className="rounded-sm" variant="outline">
                    Start
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                <Button className="rounded-sm" variant="outline">
                    End
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                <Button className="rounded-sm" variant="outline">
                    Run status
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
                <Button className="rounded-sm" variant="outline">
                    Error code
                    <ChevronDownIcon className="text-neutral-600" />
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Start time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Run as</TableHead>
                        <TableHead>Launched</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Error code</TableHead>
                        <TableHead className="items-center flex justify-end">
                            <Button variant="ghost" size="icon-sm">
                                <ColumnsIcon className="text-muted-foreground size-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {runs.map((run) => (
                        <TableRow key={run.id}>
                            <TableCell>
                                <Link className="text-[rgb(34,114,180)] dark:text-[rgb(64,152,224)]" href={`/jobs/${run.jobId}/runs/${run.id}`}>
                                    {run.startedAt}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link className="text-[rgb(34,114,180)] dark:text-[rgb(64,152,224)]" href={`/jobs/${run.jobId}`}>
                                    {run.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <span className="items-center flex gap-1">
                                    <WorkflowIcon className="text-muted-foreground size-4" />
                                    <span>{run.type}</span>
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="items-center flex gap-1">
                                    <UserIcon className="text-muted-foreground size-4" />
                                    <span>{run.runAs}</span>
                                </span>
                            </TableCell>
                            <TableCell>{run.launched}</TableCell>
                            <TableCell className="text-muted-foreground">{run.duration}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1.5 text-sm">
                                    <RunStatusIcon status={run.status} />
                                    {run.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {run.errorCode ?? <MinusIcon className="text-neutral-300 dark:text-neutral-700 size-4" />}
                            </TableCell>
                            <TableCell className="items-center flex gap-1 justify-end">
                                <Button variant="ghost" size="icon-sm">
                                    <SquareIcon className="text-muted-foreground size-4" />
                                </Button>
                                <Button variant="ghost" size="icon-sm">
                                    <EllipsisVerticalIcon className="text-muted-foreground size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page
