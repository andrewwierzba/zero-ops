export interface Thread {
    id: string
    archived_at?: string
    label: string
    severity?: 'minor' | 'moderate' | 'critical'
    status?: 'investigating' | 'not_an_issue' | 'open' | 'resolved'
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
        id: '11111111-0000-0000-0000-000000000011',
        label: 'etl_orders_nightly failing with shuffle FetchFailedException retries',
        created_at: '2026-04-20T10:10:00+00:00',
        severity: 'critical',
        status: 'investigating',
        type: 'incident',
        impact_assets: ['etl_orders_nightly', 'report_orders_daily'],
        progress_updates: [
            { description: 'Cascading stage retries detected', detail: 'Stage 14 of `etl_orders_nightly` retried 3 times in the last 2 hours; each retry failed with `FetchFailedException`.', status: 'completed', timestamp: '2026-04-20T10:10:00+00:00' },
            { description: 'Executor logs parsed', detail: '11 `FetchFailedException`s across 3 stages, all referencing the same target host.', status: 'completed', timestamp: '2026-04-20T10:12:00+00:00' },
            { description: 'Host eviction timeline reconstructed', detail: 'Worker `ip-10-0-4-87` was reclaimed by EC2 spot eviction at 09:47 UTC, mid-shuffle write of stage 14.', status: 'completed', timestamp: '2026-04-20T10:14:00+00:00' },
            { description: 'Spark conf fix prepared', detail: 'Raised network timeout and shuffle retry budget so transient host loss is recoverable.', status: 'current', timestamp: '2026-04-20T10:16:00+00:00' },
            { description: 'PR opened', status: 'pending', timestamp: '2026-04-20T10:18:00+00:00' },
        ],
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
        root_cause_summary: 'Shuffle fetch retries are a symptom — a spot worker was evicted mid-shuffle and the shuffle service could not recover its blocks from the dead host.',
        updated_at: '2026-04-20T10:16:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000010',
        label: '3 claims processing jobs failing due to schema drift',
        created_at: '2026-04-20T10:00:00+00:00',
        severity: 'critical',
        status: 'investigating',
        type: 'incident',
        impact_assets: ['etl_claims_daily', 'etl_claims_enrichment', 'report_claims_summary'],
        progress_updates: [
            { description: 'Schema drift detected', detail: 'Upstream `claims.policy_id` column type changed from INT to STRING.', status: 'completed', timestamp: '2026-04-20T10:00:00+00:00' },
            { description: 'Failed joins isolated', detail: '3 downstream jobs failing at the join with `policies` on `policy_id`.', status: 'completed', timestamp: '2026-04-20T10:02:00+00:00' },
            { description: 'Fix prepared', detail: 'Cast-based fix drafted; ready for review.', status: 'current', timestamp: '2026-04-20T10:05:00+00:00' },
            { description: 'PR opened', status: 'pending', timestamp: '2026-04-20T10:06:00+00:00' },
        ],
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
        root_cause_summary: 'Upstream `claims_raw.policyholder_id` was changed from INT to STRING; downstream joins fail with type mismatch.',
        scenario_id: 'claims-schema-drift-pr',
        updated_at: '2026-04-20T10:05:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000009',
        label: 'Sales dashboard data arriving late',
        created_at: '2026-04-20T09:30:00+00:00',
        severity: 'critical',
        status: 'open',
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
                description: 'Spark plan analyzed - 4 issues found',
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
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
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
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
        root_cause_summary: 'The upstream table `raw.crm_contacts` was dropped during an unannounced Unity Catalog migration; downstream jobs still reference the old location.',
        updated_at: '2026-04-20T09:10:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000007',
        label: 'etl_marketing_events freshness SLA at risk',
        created_at: '2026-04-20T08:15:00+00:00',
        severity: 'moderate',
        status: 'open',
        type: 'incident',
        impact_assets: ['etl_marketing_events'],
        progress_updates: [
            { description: 'SLA drift detected', status: 'completed', timestamp: '2026-04-20T08:15:00+00:00' },
            { description: 'Kafka lag trend confirmed', status: 'current', timestamp: '2026-04-20T08:20:00+00:00' },
            { description: 'Optimization options prepared', status: 'pending', timestamp: '2026-04-20T08:25:00+00:00' },
        ],
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
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
        reported_by: 'Genie ZeroOps: Debug Databricks Job Failures',
        root_cause_summary: 'Source schema changed `customer_id` from INT to STRING, breaking strict-typed joins in downstream jobs.',
        updated_at: '2026-04-20T07:42:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000005',
        label: 'DBR 14 -> 17 update available for 4 jobs',
        created_at: '2026-04-20T06:05:00+00:00',
        severity: 'minor',
        status: 'open',
        type: 'incident',
        impact_assets: ['etl_sales_daily', 'etl_marketing_events', 'report_customer_360', 'ml_churn_scoring'],
        progress_updates: [
            { description: 'Runtime compliance check triggered', status: 'completed', timestamp: '2026-04-20T06:05:00+00:00' },
            { description: 'Breaking changes reviewed', status: 'current', timestamp: '2026-04-20T06:12:00+00:00' },
            { description: 'Upgrade patch prepared', status: 'pending', timestamp: '2026-04-20T06:18:00+00:00' },
        ],
        reported_by: 'Genie ZeroOps: Runtime Compliance Monitor',
        root_cause_summary: 'Clusters remain pinned to DBR 14.3; one Pandas API usage must be updated before safe migration to DBR 17 LTS.',
        updated_at: '2026-04-20T06:18:00+00:00',
    },
    {
        id: '11111111-0000-0000-0000-000000000004',
        label: 'Churn scoring: unused columns can be removed',
        created_at: '2026-04-20T06:00:00+00:00',
        severity: 'minor',
        status: 'open',
        type: 'incident',
        impact_assets: ['ml_churn_scoring', 'churn_scoring'],
        progress_updates: [
            { description: 'Feature usage analyzed', status: 'completed', timestamp: '2026-04-20T06:00:00+00:00' },
            { description: 'Unused columns identified', status: 'current', timestamp: '2026-04-20T06:05:00+00:00' },
            { description: 'Cleanup diff prepared', status: 'pending', timestamp: '2026-04-20T06:10:00+00:00' },
        ],
        reported_by: 'Genie ZeroOps: Model Efficiency Analyzer',
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
        label: 'What can Genie ZeroOps do?',
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
