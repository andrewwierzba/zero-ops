export interface Message {
    actions?: MessageAction[]
    content: string
    created_at: string
    embed?: 'graph'
    id: string
    role: 'user' | 'agent'
    suggestions?: MessageAction[]
    thought_duration_ms?: number
}

export interface MessageAction {
    icon?: 'thumbs_up' | 'thumbs_down' | 'regenerate' | 'copy' | 'copy_debug'
    label: string
    transient?: boolean
}

export interface ThreadMessages {
    threadId: string
    messages: Message[]
}

const defaultAgentActions: MessageAction[] = [
    { icon: 'thumbs_up', label: 'Useful' },
    { icon: 'thumbs_down', label: 'Not useful' },
    { icon: 'regenerate', label: 'Regenerate response', transient: true },
    { icon: 'copy', label: 'Copy response' },
    { icon: 'copy_debug', label: 'Copy debug info' },
]

export const defaultMessages: ThreadMessages[] = [
    {
        threadId: '11111111-0000-0000-0000-000000000010',
        messages: [
            {
                actions: defaultAgentActions,
                content: `3 claims processing jobs are failing this morning due to schema drift on the upstream \`claims.policy_id\` column — it was changed from INT to STRING overnight. All three jobs fail at the join step against \`policies\`.

**What's impacted:**
- \`etl_claims_daily\` — fails joining \`claims\` to \`policies\` on \`policy_id\`
- \`etl_claims_enrichment\` — same join failure cascades from upstream
- \`report_claims_summary\` — downstream report has no fresh data since 03:14 UTC

**Proposed fix:**
Cast \`policy_id\` to STRING in the join predicate across all three jobs. Safer than reverting the upstream schema change.

\`\`\`diff
- SELECT c.claim_id, p.policy_holder, c.amount
- FROM claims c
- JOIN policies p
-   ON c.policy_id = p.policy_id
+ SELECT c.claim_id, p.policy_holder, c.amount
+ FROM claims c
+ JOIN policies p
+   ON CAST(c.policy_id AS STRING) = CAST(p.policy_id AS STRING)
\`\`\``,
                created_at: '2026-04-20T10:05:00+00:00',
                embed: 'graph',
                id: 'msg-0010-01',
                role: 'agent',
                suggestions: [
                    { label: 'Create PR' },
                ],
                thought_duration_ms: 92000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000001',
        messages: [
            {
                content: 'What is Genie Code?',
                created_at: '2026-04-14T10:00:00+00:00',
                id: 'msg-0001-01',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Genie Code is Databricks' AI assistant for data and AI workflows. It helps you write, debug, and optimize code across notebooks, jobs, and pipelines — all within your Databricks workspace. You can chat with it to generate SQL or Python, ask questions about your data, and get explanations of existing code.",
                created_at: '2026-04-14T10:00:05+00:00',
                id: 'msg-0001-02',
                role: 'agent',
                thought_duration_ms: 3000,
            },
            {
                content: 'Can it work with my existing jobs?',
                created_at: '2026-04-14T10:02:00+00:00',
                id: 'msg-0001-03',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Yes. Genie Code can inspect job configurations, read run histories, and help you debug failures or optimize job logic. Just reference a job by name or paste in a snippet and it'll work with your actual workspace context.",
                created_at: '2026-04-14T10:04:00+00:00',
                id: 'msg-0001-04',
                role: 'agent',
                thought_duration_ms: 4000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000002',
        messages: [
            {
                content: 'What can Autopilot in Genie Code do?',
                created_at: '2026-04-14T14:00:00+00:00',
                id: 'msg-0002-01',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Autopilot is the agentic layer of Genie Code. It monitors your jobs in the background and takes action when something needs attention — debugging failures, surfacing insights, and flagging issues before they escalate. You can configure it to watch specific jobs, tags, or ownership groups and define how it should respond.',
                created_at: '2026-04-14T14:00:05+00:00',
                id: 'msg-0002-02',
                role: 'agent',
                thought_duration_ms: 4000,
            },
            {
                content: 'Does it require me to be online?',
                created_at: '2026-04-14T14:03:00+00:00',
                id: 'msg-0002-03',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "No. Autopilot runs continuously in the background. It'll open a thread here when it detects something worth your attention, so you can review and respond on your own schedule.",
                created_at: '2026-04-14T14:05:00+00:00',
                id: 'msg-0002-04',
                role: 'agent',
                thought_duration_ms: 3000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000003',
        messages: [
            {
                content: "I'd like to set up an automation to debug job failures automatically.",
                created_at: '2026-04-15T09:00:00+00:00',
                id: 'msg-0003-01',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "I can help with that. Which jobs do you want to monitor? You can scope this by specific job names, tags, or ownership.",
                created_at: '2026-04-15T09:00:05+00:00',
                id: 'msg-0003-02',
                role: 'agent',
                thought_duration_ms: 3000,
            },
            {
                content: "Let's start with jobs tagged `sales` and `marketing`.",
                created_at: '2026-04-15T09:02:00+00:00',
                id: 'msg-0003-03',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Got it. I've drafted an automation scoped to jobs tagged `sales` or `marketing`. When a job fails, I'll analyze the run logs, identify the root cause, and open a thread here with a summary. Want to review the configuration before enabling it?",
                created_at: '2026-04-15T09:04:00+00:00',
                id: 'msg-0003-04',
                role: 'agent',
                thought_duration_ms: 8000,
            },
            {
                content: 'Looks good, enable it.',
                created_at: '2026-04-15T09:06:00+00:00',
                id: 'msg-0003-05',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Automation enabled. I'll start monitoring jobs tagged `sales` and `marketing`. You'll see new threads here when something needs attention.",
                created_at: '2026-04-15T09:08:00+00:00',
                id: 'msg-0003-06',
                role: 'agent',
                thought_duration_ms: 5000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000004',
        messages: [
            {
                actions: defaultAgentActions,
                content: "The `churn_scoring` model references 14 columns, but only 6 are used in the final feature set. The remaining 8 haven't contributed to predictions in 90 days. Removing them would reduce compute time by ~18% and simplify the schema.",
                created_at: '2026-04-20T06:00:00+00:00',
                id: 'msg-0004-01',
                role: 'agent',
                thought_duration_ms: 38000,
            },
            {
                content: 'Which columns specifically?',
                created_at: '2026-04-20T06:05:00+00:00',
                id: 'msg-0004-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'The unused columns are: `last_login_delta`, `email_open_rate`, `sms_opt_in`, `push_notification_ctr`, `promo_redemption_count`, `web_session_count_30d`, `mobile_session_count_30d`, and `support_ticket_count`. None have had non-null variance in the last 90 days of training runs.',
                created_at: '2026-04-20T06:05:05+00:00',
                id: 'msg-0004-03',
                role: 'agent',
                thought_duration_ms: 18000,
            },
            {
                content: 'Can you generate a diff for removing them?',
                created_at: '2026-04-20T06:08:00+00:00',
                id: 'msg-0004-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "I don't have write access to the feature repo, but here's the diff you'd apply to `churn_feature_pipeline.py`:\n\n```diff\n- columns = [\n-     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',\n-     'last_login_delta', 'email_open_rate', 'sms_opt_in',\n-     'push_notification_ctr', 'promo_redemption_count',\n-     'web_session_count_30d', 'mobile_session_count_30d',\n-     'support_ticket_count', 'contract_end_delta', 'product_count'\n- ]\n+ columns = [\n+     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',\n+     'contract_end_delta', 'product_count'\n+ ]\n```",
                created_at: '2026-04-20T06:10:00+00:00',
                id: 'msg-0004-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create PR' },
                ],
                thought_duration_ms: 14000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000005',
        messages: [
            {
                actions: defaultAgentActions,
                content: '4 jobs are running on Databricks Runtime 14.3, which reaches end-of-support on May 1. DBR 17.0 LTS is available and compatible with your current cluster configurations. Affected jobs: `etl_sales_daily`, `etl_marketing_events`, `report_customer_360`, and `ml_churn_scoring`.',
                created_at: '2026-04-20T06:05:00+00:00',
                id: 'msg-0005-01',
                role: 'agent',
                thought_duration_ms: 42000,
            },
            {
                content: 'Any breaking changes I should know about?',
                created_at: '2026-04-20T06:10:00+00:00',
                id: 'msg-0005-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'DBR 17.0 drops Python 3.9 support (your jobs use 3.11, so no impact). The relevant change: Pandas 2.x is now default, which deprecates `DataFrame.append()`. I found one usage in `ml_churn_scoring` — I can show you the fix.',
                created_at: '2026-04-20T06:10:05+00:00',
                id: 'msg-0005-03',
                role: 'agent',
                thought_duration_ms: 22000,
            },
            {
                content: 'Yes, show me.',
                created_at: '2026-04-20T06:14:00+00:00',
                id: 'msg-0005-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "In `ml_churn_scoring`, line 84:\n\n```diff\n- df = df.append(new_rows, ignore_index=True)\n+ df = pd.concat([df, new_rows], ignore_index=True)\n```\n\nThat's the only change needed before upgrading.",
                created_at: '2026-04-20T06:18:00+00:00',
                id: 'msg-0005-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create PR' },
                ],
                thought_duration_ms: 12000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000006',
        messages: [
            {
                actions: defaultAgentActions,
                content: '3 jobs failed this morning due to a schema change in the `orders` table — `customer_id` was changed from INT to STRING. Affected jobs: `etl_sales_daily`, `etl_marketing_events`, `report_customer_360`. All failed at the join step.',
                created_at: '2026-04-20T07:30:00+00:00',
                id: 'msg-0006-01',
                role: 'agent',
                thought_duration_ms: 48000,
            },
            {
                content: 'Who made that change?',
                created_at: '2026-04-20T07:35:00+00:00',
                id: 'msg-0006-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "The schema change was applied by `svc_dbt_prod` at 01:47 UTC, as part of a dbt model update. The `orders` source model has a recent commit: \"normalize customer IDs to UUID strings\".",
                created_at: '2026-04-20T07:35:05+00:00',
                id: 'msg-0006-03',
                role: 'agent',
                thought_duration_ms: 11000,
            },
            {
                content: 'Can we cast the column in the jobs instead of reverting the schema?',
                created_at: '2026-04-20T07:38:00+00:00',
                id: 'msg-0006-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Yes, that's the safer option. I'd add `CAST(o.customer_id AS STRING)` in the join predicate for all three jobs. Want me to generate the updated queries?",
                created_at: '2026-04-20T07:42:00+00:00',
                id: 'msg-0006-05',
                role: 'agent',
                thought_duration_ms: 9000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000007',
        messages: [
            {
                actions: defaultAgentActions,
                content: '`etl_marketing_events` has not completed a successful run in 4 hours. Its freshness SLA is 6 hours. At current pace it will breach the SLA at 14:00 UTC — about 90 minutes from now.',
                created_at: '2026-04-20T08:15:00+00:00',
                id: 'msg-0007-01',
                role: 'agent',
                thought_duration_ms: 32000,
            },
            {
                content: "What's causing the delay?",
                created_at: '2026-04-20T08:20:00+00:00',
                id: 'msg-0007-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'The last 3 runs failed during the Kafka ingestion step. Logs show consumer group lag spiking to 2.1M messages starting at 09:15 UTC, coinciding with a topic replication change in the `events-prod` cluster.',
                created_at: '2026-04-20T08:20:05+00:00',
                id: 'msg-0007-03',
                role: 'agent',
                thought_duration_ms: 21000,
            },
            {
                content: 'Is the Kafka issue resolved?',
                created_at: '2026-04-20T08:23:00+00:00',
                id: 'msg-0007-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Replication factor is back to normal as of 11:30 UTC. A manual retry of the job should succeed now.',
                created_at: '2026-04-20T08:25:00+00:00',
                id: 'msg-0007-05',
                role: 'agent',
                thought_duration_ms: 7000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000008',
        messages: [
            {
                actions: defaultAgentActions,
                content: '`report_customer_360` has been failing since 03:00 UTC. Root cause: the upstream table `raw.crm_contacts` was dropped. This table is referenced in 3 downstream jobs.',
                created_at: '2026-04-20T09:00:00+00:00',
                id: 'msg-0008-01',
                role: 'agent',
                thought_duration_ms: 36000,
            },
            {
                content: 'Was it dropped intentionally?',
                created_at: '2026-04-20T09:04:00+00:00',
                id: 'msg-0008-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Yes — the audit log shows it was dropped by `andrew.wierzba@company.com` at 02:58 UTC with the comment "migration to unity catalog". The new location appears to be `unity_catalog.crm.contacts`.',
                created_at: '2026-04-20T09:04:05+00:00',
                id: 'msg-0008-03',
                role: 'agent',
                thought_duration_ms: 13000,
            },
            {
                content: 'Update the reference and re-run.',
                created_at: '2026-04-20T09:07:00+00:00',
                id: 'msg-0008-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: "Updated the table reference in `report_customer_360` from `raw.crm_contacts` to `unity_catalog.crm.contacts`. The job is queued to re-run now.",
                created_at: '2026-04-20T09:10:00+00:00',
                id: 'msg-0008-05',
                role: 'agent',
                thought_duration_ms: 9000,
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000009',
        messages: [
            {
                actions: defaultAgentActions,
                content: `\`etl_sales_daily\` has been completing after 10:00 AM for the past 5 days, breaching its 9:00 AM SLA. The executive dashboard subscription at 9:00 AM is receiving stale data.

I analyzed the Spark execution plan and found 6 compounding performance issues. This job has accumulated technical debt over 5 months of incremental feature additions — including changes introduced when the \`amount\` column was migrated to STRING.

**Proposed fix:**
- 6 optimizations across code, engine config, and storage
- Passes sandbox run; output identical to production
- Benchmarked on 50M row sample: 9m 4s → 1m 3s (8.6x faster)
- Estimated completion after fix: 8:10 AM — within SLA`,
                created_at: '2026-04-20T09:30:00+00:00',
                id: 'msg-0009-01',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create PR with fix' },
                ],
                thought_duration_ms: 118000,
            },
            {
                content: "Can't the job just run earlier to make the 9 AM deadline?",
                created_at: '2026-04-20T09:32:00+00:00',
                id: 'msg-0009-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: `Unfortunately not. The upstream data usually lands at 7:30 AM (\`ingest_transactions\`) and the \`etl_sales_daily\` job currently lasts ~130 minutes.

The real problem is the job itself: it's gotten nearly 9x slower over the last 5 months. It now takes ~130 minutes on 500M rows. I recommend optimizing the job rather than shifting the schedule.`,
                created_at: '2026-04-20T09:32:05+00:00',
                id: 'msg-0009-03',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create PR with fix' },
                ],
                thought_duration_ms: 14000,
            },
            {
                content: "How did you even find this issue? The job didn't fail.",
                created_at: '2026-04-20T09:34:00+00:00',
                id: 'msg-0009-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: `Lakehouse Monitoring detected a data freshness anomaly on the \`sales_daily_report\` table. The table is expected to refresh by 9:00 AM daily, but for the past 5 days it hasn't been updated until after 10:00 AM.

I correlated this with the run history for \`etl_sales_daily\` — the job that writes to this table — and confirmed that execution time has been steadily increasing:

| Date | Duration | Finished |
|------|----------|----------|
| Mar 31 | 127 min | 10:07 AM |
| Apr 1 | 131 min | 10:11 AM |
| Apr 2 | 129 min | 10:09 AM |
| Apr 3 | 134 min | 10:14 AM |
| Apr 4 | 130 min | 10:10 AM |

This is a gradual degradation, not a sudden failure — which is why no alerts fired until the freshness monitor caught it.`,
                created_at: '2026-04-20T09:34:05+00:00',
                id: 'msg-0009-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create PR with fix' },
                ],
                thought_duration_ms: 26000,
            },
            {
                content: "What changed? This job used to finish on time.",
                created_at: '2026-04-20T09:36:00+00:00',
                id: 'msg-0009-06',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: `**Jan 2026 (DATA-4637):** Product requested unique customer counts. A pre-aggregation \`groupBy\` was added, creating a second shuffle stage.

**Feb 2026 (DATA-4718):** Finance requested USD conversion. A join with \`currency_rates\` (20 rows) was added — but Spark uses a sort-merge join because AQE is disabled.

**Feb 2026 (DATA-4801):** Ops requested refund totals and avg order value. Three separate passes over the source table were added instead of consolidating into the existing aggregation.

Each change passed code review individually. The performance cliff came from their compound effect at scale.`,
                created_at: '2026-04-20T09:36:05+00:00',
                id: 'msg-0009-07',
                role: 'agent',
                suggestions: [
                    { label: 'Create PR with fix' },
                ],
                thought_duration_ms: 44000,
            },
        ],
    },
]
