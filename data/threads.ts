export interface Thread {
    id: string
    archived_at?: string
    label: string
    severity?: 'minor' | 'moderate' | 'critical'
    status?: 'investigating' | 'pending review' | 'resolved'
    type?: 'automation' | 'incident'
    impact_assets?: string[]
    progress_updates?: { description: string; detail?: string; status: 'completed' | 'current' | 'pending'; timestamp: string }[]
    reported_by?: string
    root_cause_summary?: string
    scenario_id?: string
    scenario_cursor?: number
    updated_at: string
    created_at: string
}

export const defaultThreads: Thread[] = [
    {
        id: '11111111-0000-0000-0000-000000000009',
        label: 'Sales dashboard data arriving late',
        created_at: '2026-04-20T09:30:00+00:00',
        severity: 'critical',
        status: 'pending review',
        type: 'incident',
        impact_assets: ['sales_daily_dashboard', 'etl_sales_daily'],
        progress_updates: [
            {
                description: 'Freshness anomaly detected',
                detail: 'sales_daily_report was not refreshed until after 10:00 AM for 5 consecutive days; no job failures or error alerts fired.',
                status: 'completed',
                timestamp: '2026-04-20T09:30:00+00:00',
            },
            {
                description: 'Run history correlated',
                detail: 'etl_sales_daily duration drifted from expected runtime and consistently completed after reporting SLA.',
                status: 'completed',
                timestamp: '2026-04-20T09:31:00+00:00',
            },
            {
                description: 'Spark plan analyzed - 6 issues found',
                detail: 'Detected compounding shuffles, non-broadcast joins, and repeated table scans increasing end-to-end latency.',
                status: 'completed',
                timestamp: '2026-04-20T09:32:00+00:00',
            },
            {
                description: 'Fix prepared',
                detail: 'Prepared optimized query plan and config changes with no expected output-schema changes.',
                status: 'completed',
                timestamp: '2026-04-20T09:33:00+00:00',
            },
            {
                description: 'Sandbox passed',
                detail: 'Validation run passed in sandbox and output checks matched production expectations.',
                status: 'completed',
                timestamp: '2026-04-20T09:34:00+00:00',
            },
            {
                description: 'Ready for review',
                detail: 'Patch package and benchmark evidence are prepared for maintainer review.',
                status: 'current',
                timestamp: '2026-04-20T09:35:00+00:00',
            },
            {
                description: 'PRs opened',
                detail: 'Pending reviewer sign-off before merge.',
                status: 'pending',
                timestamp: '2026-04-20T09:36:00+00:00',
            },
            {
                description: 'Merged and verified',
                detail: 'Will confirm post-merge runtime and SLA recovery in production.',
                status: 'pending',
                timestamp: '2026-04-20T09:37:00+00:00',
            },
        ],
        reported_by: 'Autopilot: Debug Databricks Job Failures',
        root_cause_summary: 'Pipeline performance regressed over time due to compounded Spark inefficiencies and schema debt from incremental changes.',
        updated_at: '2026-04-20T09:36:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000008',
        label: 'Customer 360 failing: upstream table dropped',
        created_at: '2026-04-20T09:00:00+00:00',
        severity: 'critical',
        status: 'investigating',
        type: 'incident',
        impact_assets: ['report_customer_360', 'etl_marketing_events', 'ml_churn_scoring'],
        progress_updates: [
            { description: 'Dependency failure detected', status: 'completed', timestamp: '2026-04-20T09:00:00+00:00' },
            { description: 'Downstream impact mapped', status: 'completed', timestamp: '2026-04-20T09:02:00+00:00' },
            { description: 'Root cause confirmed', status: 'current', timestamp: '2026-04-20T09:06:00+00:00' },
            { description: 'Mitigation patch drafted', status: 'pending', timestamp: '2026-04-20T09:10:00+00:00' },
        ],
        reported_by: 'Autopilot: Debug Databricks Job Failures',
        root_cause_summary: 'A dbt cleanup migration dropped `customer_profile_snapshot` before downstream dependencies were updated.',
        updated_at: '2026-04-20T09:10:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000007',
        label: 'etl_marketing_events freshness SLA at risk',
        created_at: '2026-04-20T08:15:00+00:00',
        severity: 'moderate',
        status: 'pending review',
        type: 'incident',
        impact_assets: ['etl_marketing_events'],
        progress_updates: [
            { description: 'SLA drift detected', status: 'completed', timestamp: '2026-04-20T08:15:00+00:00' },
            { description: 'Kafka lag trend confirmed', status: 'current', timestamp: '2026-04-20T08:20:00+00:00' },
            { description: 'Optimization options prepared', status: 'pending', timestamp: '2026-04-20T08:25:00+00:00' },
        ],
        reported_by: 'Autopilot: Debug Databricks Job Failures',
        root_cause_summary: 'Kafka consumer lag is increasing because of partition skew and a non-broadcast join in the enrichment step.',
        updated_at: '2026-04-20T08:25:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000006',
        label: '3 sales/marketing jobs failing due to change from INT to String',
        created_at: '2026-04-20T07:30:00+00:00',
        severity: 'moderate',
        status: 'resolved',
        type: 'incident',
        impact_assets: ['etl_sales_daily', 'etl_marketing_events', 'report_customer_360'],
        progress_updates: [
            { description: 'Schema change detected', status: 'completed', timestamp: '2026-04-20T07:30:00+00:00' },
            { description: 'Failed joins isolated', status: 'completed', timestamp: '2026-04-20T07:33:00+00:00' },
            { description: 'Cast-based fix applied', status: 'completed', timestamp: '2026-04-20T07:37:00+00:00' },
            { description: 'Recovery verified', status: 'completed', timestamp: '2026-04-20T07:42:00+00:00' },
        ],
        reported_by: 'Autopilot: Debug Databricks Job Failures',
        root_cause_summary: 'Source schema changed `customer_id` from INT to STRING, breaking strict-typed joins in downstream jobs.',
        updated_at: '2026-04-20T07:42:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000005',
        label: 'DBR 14 -> 17 update available for 4 jobs',
        created_at: '2026-04-20T06:05:00+00:00',
        severity: 'minor',
        status: 'pending review',
        type: 'incident',
        impact_assets: ['etl_sales_daily', 'etl_marketing_events', 'report_customer_360', 'ml_churn_scoring'],
        progress_updates: [
            { description: 'Runtime compliance check triggered', status: 'completed', timestamp: '2026-04-20T06:05:00+00:00' },
            { description: 'Breaking changes reviewed', status: 'current', timestamp: '2026-04-20T06:12:00+00:00' },
            { description: 'Upgrade patch prepared', status: 'pending', timestamp: '2026-04-20T06:18:00+00:00' },
        ],
        reported_by: 'Autopilot: Runtime Compliance Monitor',
        root_cause_summary: 'Clusters remain pinned to DBR 14.3; one Pandas API usage must be updated before safe migration to DBR 17 LTS.',
        updated_at: '2026-04-20T06:18:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000004',
        label: 'Churn scoring: unused columns can be removed',
        created_at: '2026-04-20T06:00:00+00:00',
        severity: 'minor',
        status: 'pending review',
        type: 'incident',
        impact_assets: ['ml_churn_scoring', 'churn_scoring'],
        progress_updates: [
            { description: 'Feature usage analyzed', status: 'completed', timestamp: '2026-04-20T06:00:00+00:00' },
            { description: 'Unused columns identified', status: 'current', timestamp: '2026-04-20T06:05:00+00:00' },
            { description: 'Cleanup diff prepared', status: 'pending', timestamp: '2026-04-20T06:10:00+00:00' },
        ],
        reported_by: 'Autopilot: Model Efficiency Analyzer',
        root_cause_summary: 'Feature set drift introduced unused columns that no longer contribute to model variance or prediction quality.',
        updated_at: '2026-04-20T06:10:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000003',
        label: 'Create automation for debugging job failures',
        created_at: '2026-04-15T09:00:00+00:00',
        type: 'automation',
        updated_at: '2026-04-15T09:08:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000002',
        label: 'What can Autopilot in Genie Code do?',
        created_at: '2026-04-14T14:00:00+00:00',
        updated_at: '2026-04-14T14:05:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000001',
        label: 'What is Genie Code?',
        created_at: '2026-04-14T10:00:00+00:00',
        updated_at: '2026-04-14T10:04:00+00:00',
    },
]
