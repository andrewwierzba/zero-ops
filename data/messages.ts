import { GitPullRequestIcon } from 'lucide-react'

export interface ThoughtStep {
    content?: string
    defaultOpen?: boolean
    summary: string
}

export interface Thought {
    defaultOpen?: boolean
    duration_ms: number
    steps?: ThoughtStep[]
    summary?: string
}

export interface Message {
    actions?: MessageAction[]
    code_changes?: Record<string, CodeChange>
    content: string
    created_at: string
    id: string
    role: 'user' | 'agent'
    suggestions?: MessageAction[]
    thought?: Thought
    thought_duration_ms?: number
}

export interface MessageAction {
    icon?: 'thumbs_up' | 'thumbs_down' | 'regenerate' | 'copy' | 'copy_debug'
    label: string
    transient?: boolean
}

export interface CodeChangeFile {
    code: string
    filename: string
    language?: string
}

export interface CodeChangeAction {
    icon?: typeof GitPullRequestIcon
    label: string
    variant?: 'primary' | 'secondary' | 'destructive'
}

export interface CodeChange {
    actions?: CodeChangeAction[]
    files: CodeChangeFile[]
    style: 'single' | 'group'
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
        threadId: '11111111-0000-0000-0000-000000000012',
        messages: [
            {
                actions: defaultAgentActions,
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `# pipelines/fan_interaction_enrichment.py
- # Monolithic stream: ingest → identity → enrich → sink
- fan_events = (spark.readStream.format("zerobus")
-     .option("topic", "fan-interactions")
-     .load())
-
- # Identity resolution inline
- resolved = fan_events.join(fan_identity_map, "device_id")
-
- # Profile enrichment inline
- enriched = resolved.join(fan_profiles, "fan_id")
-
- # Single stateful write
- enriched.writeStream.format("lakebase")
-     .option("collection", "active_fans")
-     .start()
+ # Stage 1: Normalized event ingestion
+ from pipelines.fan_identity_resolution import resolve_fan_identity
+ from pipelines.fan_profile_enrichment import enrich_fan_profile
+ from sinks.lakebase_fan_activity_writer import write_to_lakebase
+
+ fan_events = (spark.readStream.format("zerobus")
+     .option("topic", "fan-interactions")
+     .load())
+
+ # Stage 2: Bounded identity resolution
+ resolved = resolve_fan_identity(fan_events)
+
+ # Stage 3: Profile enrichment with snapshot
+ enriched = enrich_fan_profile(resolved)
+
+ # Stage 4: Idempotent Lakebase sink
+ write_to_lakebase(enriched)`,
                                filename: 'pipelines/fan_interaction_enrichment.py',
                                language: 'diff',
                            },
                            {
                                code: `# pipelines/fan_identity_resolution.py (new file)
+ from pyspark.sql import DataFrame
+ from pyspark.sql.functions import col, expr, window
+
+ def resolve_fan_identity(events: DataFrame) -> DataFrame:
+     """
+     Bounded identity resolution with strict watermarking.
+     Resolves anonymous device_ids to fan_ids within 60s windows.
+     """
+     fan_identity_map = spark.table("fan_identity_map").cache()
+
+     return (events
+         .withWatermark("event_time", "60 seconds")
+         .join(
+             fan_identity_map,
+             on="device_id",
+             how="left"
+         )
+         .withColumn("fan_id",
+             expr("COALESCE(fan_id, CONCAT('anon_', device_id))"))
+         .withColumn("identity_resolved_at", expr("current_timestamp()"))
+     )`,
                                filename: 'pipelines/fan_identity_resolution.py',
                                language: 'diff',
                            },
                            {
                                code: `# pipelines/fan_profile_enrichment.py (new file)
+ from pyspark.sql import DataFrame
+ from pyspark.sql.functions import broadcast
+
+ # Compact profile snapshot refreshed every 5 minutes
+ _profile_snapshot = None
+ _snapshot_time = None
+
+ def _get_profile_snapshot():
+     global _profile_snapshot, _snapshot_time
+     if _profile_snapshot is None or _needs_refresh():
+         _profile_snapshot = (spark.table("fan_profiles")
+             .select("fan_id", "section", "seat", "region", "loyalty_tier")
+             .cache())
+         _snapshot_time = datetime.now()
+     return _profile_snapshot
+
+ def enrich_fan_profile(events: DataFrame) -> DataFrame:
+     """
+     Profile enrichment using broadcast join against compact snapshot.
+     Adds section, seat, region, and loyalty_tier to resolved events.
+     """
+     profiles = broadcast(_get_profile_snapshot())
+
+     return events.join(profiles, on="fan_id", how="left")`,
                                filename: 'pipelines/fan_profile_enrichment.py',
                                language: 'diff',
                            },
                            {
                                code: `# sinks/lakebase_fan_activity_writer.py (new file)
+ from pyspark.sql import DataFrame
+ from pyspark.sql.functions import col, sha2, concat_ws
+
+ def write_to_lakebase(enriched: DataFrame) -> None:
+     """
+     Idempotent Lakebase sink with deterministic event keys.
+     Uses pre-sorted micro-batches to minimize write amplification.
+     """
+     keyed = enriched.withColumn(
+         "event_key",
+         sha2(concat_ws(":", col("fan_id"), col("event_time")), 256)
+     )
+
+     (keyed
+         .repartition(32, "region")  # Parallel partition writes
+         .sortWithinPartitions("event_key")  # Deterministic ordering
+         .writeStream
+         .format("lakebase")
+         .option("collection", "active_fans")
+         .option("upsertKey", "event_key")
+         .option("idempotent", "true")
+         .outputMode("update")
+         .start())`,
                                filename: 'sinks/lakebase_fan_activity_writer.py',
                                language: 'diff',
                            },
                        ],
                        style: 'group',
                    },
                },
                content: `# Fan interaction enrichment falling behind real-time demand

The fan interaction enrichment pipeline is falling behind during peak match windows.

[[embed:chart|fan-enrichment-latency]]

The root cause is a monolithic Spark Streaming workflow that combines identity resolution, profile enrichment, and stateful writes in a single job. During traffic spikes, high-cardinality state accumulates faster than it can be flushed to Lakebase.

[[embed:table|fan-enrichment-metrics|collapsed]]

## Impact

- [[job:fan_profile_enrichment|#]] — freshness SLA breached
- [[job:fan_interaction_enrichment|#]] — processing latency increasing
- + 3 downstream assets affected

[[embed:graph|fan-enrichment-impact|collapsed]]

## Proposed fix

Split the monolithic stream into 4 staged streaming components:

1. **ZeroBus ingestion stream** — Read fan interaction events and normalize the event schema before enrichment.
2. **Identity resolution stream** — Resolve anonymous and authenticated fan identifiers with bounded state and stricter watermarking.
3. **Fan profile enrichment stream** — Join resolved fan events against a compact profile snapshot optimized for low-latency lookups.
4. **Lakebase sink writer** — Write enriched records with deterministic event keys and idempotent upserts.

[[embed:code_change|default]]`,
                created_at: '2026-04-20T14:45:00+00:00',
                id: 'msg-0012-01',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create pull request' },
                ],
                thought: {
                    duration_ms: 142000,
                    summary: 'I grouped 5 related pipeline signals into a single incident, identified the monolithic pipeline architecture as the root cause, and prepared a staged streaming refactor validated in sandbox.',
                    steps: [
                        {
                            summary: 'Grouped related pipeline signals',
                            content: `Multiple jobs appeared as separate failures but share the same underlying cause. Correlated signals from fan_interaction_enrichment (processing latency), stadium_visualization_sink (Lakebase write retries), fan_profile_enrichment (freshness SLA breached), mobile_push_personalization (null feature values), and seat_upgrade_recommendations (upstream dependency unavailable).`,
                        },
                        {
                            summary: 'Identified root cause: monolithic pipeline architecture',
                            content: `The current Spark Declarative Pipeline combines too many responsibilities in a single streaming workflow. During high-volume match windows, the enrichment step creates high-cardinality state causing the pipeline to fall behind. Once the stream falls behind, Lakebase write retries increase, compounding end-to-end latency.`,
                        },
                        {
                            summary: 'Captured high-traffic window metrics',
                            content: `End-to-end enrichment latency: 7m 48s peak (target <60s). Lakebase write retry rate: 11.6% peak (target <1%). Stadium visualization freshness: 6-8 min stale (target <60s). Downstream feature completeness: 93.4% during spike (target >99%).`,
                        },
                        {
                            summary: 'Designed staged streaming refactor',
                            content: `Proposed splitting the monolithic stream into 4 stages: (1) ZeroBus ingestion for event normalization, (2) Identity resolution with bounded state and stricter watermarking, (3) Fan profile enrichment with compact profile snapshot for low-latency lookups, (4) Lakebase sink with deterministic event keys and idempotent upserts.`,
                        },
                        {
                            summary: 'Prepared code changes across 6 files',
                            content: `Modified pipelines/fan_interaction_enrichment.py (split monolithic stream), created pipelines/fan_identity_resolution.py (bounded identity resolution), pipelines/fan_profile_enrichment.py (profile snapshot lookups), sinks/lakebase_fan_activity_writer.py (idempotent upserts), schemas/fan_interaction_events.py (deterministic event keys), tests/replay/test_fan_activity_peak_window.py (high-volume replay test).`,
                        },
                    ],
                },
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000011',
        messages: [
            {
                actions: defaultAgentActions,
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- spark.conf.set("spark.network.timeout", "120s")
- spark.conf.set("spark.shuffle.io.maxRetries", "3")
- spark.conf.set("spark.shuffle.io.retryWait", "5s")
+ spark.conf.set("spark.network.timeout", "800s")
+ spark.conf.set("spark.shuffle.io.maxRetries", "10")
+ spark.conf.set("spark.shuffle.io.retryWait", "15s")
+ spark.conf.set("spark.executor.heartbeatInterval", "60s")`,
                                filename: 'etl_orders_nightly.py',
                                language: 'diff',
                            },
                        ],
                        style: 'single',
                    },
                },
                content: "[[job:etl_orders_nightly|#]] has retried stage 14 three times in the last 2 hours, each time failing with `FetchFailedException`. The Spark UI surfaces this as a shuffle/network error, but the executor logs tell a different story.\n\n**What the logs actually show:**\n\n```\n26/04/20 09:47:08 INFO ExecutorMonitor: Spot interruption notice received for instance i-0a5b... (terminates in 120s)\n26/04/20 09:47:12 WARN BlockManagerMaster: Removal of executor 7 requested\n26/04/20 09:47:14 WARN TaskSetManager: Lost task 482.0 in stage 14.0 (TID 9217): FetchFailed(BlockManagerId(7, ip-10-0-4-87.ec2.internal, 7337, None), shuffleId=4, mapIndex=482, reduceId=63, message=Failed to connect to ip-10-0-4-87.ec2.internal/10.0.4.87:7337)\n26/04/20 09:47:14 INFO DAGScheduler: Marking stage 14 (writeOrders) as failed; resubmitting failed stage\n```\n\n**Root cause:**\nWorker `ip-10-0-4-87` was reclaimed by EC2 spot eviction at 09:47 UTC, mid-shuffle write of stage 14. Its shuffle blocks were lost; the driver kept retrying fetches against a dead host until `spark.shuffle.io.maxRetries` was exhausted, which is why downstream [[job:report_orders_daily|#]] never received fresh data.\n\n## Proposed fix:\nRaise `spark.network.timeout` and the shuffle retry budget so a transient host loss is recoverable. I'll also flag the cluster pool for `spot_fallback_to_ondemand` — that requires cluster-owner sign-off, so it's tracked separately rather than included in this PR.\n\n[[embed:code_change|default]]",
                created_at: '2026-04-20T10:10:00+00:00',
                id: 'msg-0011-01',
                role: 'agent',
                suggestions: [
                    { label: 'Create pull request' },
                ],
                thought: {
                    duration_ms: 64000,
                    summary: 'I traced the stage 14 retries through the executor logs, correlated the host loss with EC2 spot eviction events, and confirmed the shuffle service config that left the blocks unrecoverable.',
                    steps: [
                        {
                            summary: 'Parsed driver and executor logs',
                            content: `Stage 14 retried 3 times in the last 2 hours. Every retry surfaced \`FetchFailedException\` referencing the same target host \`ip-10-0-4-87\`. The driver kept resubmitting against a dead block manager until \`spark.shuffle.io.maxRetries\` was exhausted.

\`\`\`
26/04/20 09:47:14 WARN TaskSetManager: Lost task 482.0 in stage 14.0 (TID 9217): FetchFailed(BlockManagerId(7, ip-10-0-4-87.ec2.internal, 7337, None), shuffleId=4, mapIndex=482, reduceId=63, message=Failed to connect to ip-10-0-4-87.ec2.internal/10.0.4.87:7337)
\`\`\``,
                        },
                        {
                            summary: 'Cross-referenced cloud provider events',
                            content: `EC2 emitted a spot interruption notice for instance \`i-0a5b07c2f3e84d911\` at 09:47:08 UTC — 6 seconds before the first \`FetchFailedException\`. The instance was reclaimed mid-shuffle write of stage 14, which is why the blocks vanished rather than reappearing on retry.`,
                        },
                        {
                            summary: 'Checked external shuffle service status',
                            content: `External shuffle service is disabled on the \`etl-nightly-pool\`. Without it, shuffle blocks live only on the executor that produced them — so when the spot host went away, the blocks went with it. Spark had to re-execute the upstream stage to regenerate them, which is what blew past the retry budget.`,
                        },
                        {
                            summary: 'Reviewed cluster pool config',
                            content: `The pool is 100% spot with no on-demand fallback. A larger retry budget will absorb intermittent connectivity blips, but it won't fix recurring spot reclaims. Flagging \`spot_fallback_to_ondemand\` for cluster-owner sign-off and tracking it separately from this PR.`,
                        },
                    ],
                },
            },
        ],
    },
    {
        threadId: '11111111-0000-0000-0000-000000000010',
        messages: [
            {
                actions: defaultAgentActions,
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- claims = spark.table("claims")
+ claims = spark.table("claims").withColumn(
+     "policyholder_id", F.col("policyholder_id").cast("string")
+ )
  enriched = claims.join(claims_raw, on="policyholder_id")`,
                                filename: 'claims_processing.py',
                                language: 'diff',
                            },
                        ],
                        style: 'group',
                    },
                },
                content: `# 3 claims processing jobs failing due to schema drift
                
At 6:47 AM, [[table:claims_raw|#]] started emitting [[column:policyholder_id]] as STRING instead of INT after an overnight ClaimCenter export migration.

The schema change broke joins in 3 claims processing jobs that still expect [[column:policyholder_id]] as an integer.

## Impact
13 downstream assets are affected: 3 jobs are failing, and 10 downstream tables or dashboards may become stale until claims enrichment refreshes successfully.

The blocked refresh may affect claims analytics, policyholder reporting, and operational dashboards.

[[embed:graph|claims-policyholder-schema|expanded]]

## Proposed fix:
Cast [[column:policyholder_id]] to STRING on the claims side before the enrichment join so it matches the updated [[table:claims_raw|#]] schema.

[[embed:code_change|default]]`,
                created_at: '2026-04-20T10:05:00+00:00',
                id: 'msg-0010-01',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create pull request' },
                ],
                thought: {
                    duration_ms: 127000,
                    summary: 'I investigated the 3 failing claims processing jobs by checking related code and schemas, tracing downstream impact, and validating a minimal fix in sandbox.',
                    steps: [
                        {
                            summary: 'Spotted committed_output_rows drop on etl_claims_enrichment',
                            content: `etl_claims_enrichment committed ~17k rows every 5 minutes through 06:45, then went to 0 starting at 06:50 — right after claims_raw began emitting policyholder_id as STRING.

[[embed:chart|claims-enrichment-committed-rows|expanded]]`,
                        },
                        {
                            summary: 'Inspected the enrichment join in claims_processing.py',
                            content: `The join assumed claims.policyholder_id and claims_raw.policyholder_id share a type. They don't anymore — claims is still INT, claims_raw is now STRING — so the join silently produces zero matched rows.

\`\`\`python
claims = spark.table("claims")
enriched = claims.join(claims_raw, on="policyholder_id")
\`\`\``,
                        },
                        {
                            summary: 'Traced policyholder_id usage downstream',
                            content: `Traced policyholder_id usage downstream from claims_raw.

Found 13 affected assets: 3 jobs failing at the enrichment join, plus 10 downstream tables and dashboards depending on those jobs' output.`,
                        },
                        {
                            summary: 'Validated in an isolated sandbox',
                            content: `What I validated:
- minimal code change
- passes sandbox run
- output matches production expectations
- no downstream dashboard or query regressions detected`,
                        },
                    ],
                },
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
                content: 'What can Genie ZeroOps do?',
                created_at: '2026-04-14T14:00:00+00:00',
                id: 'msg-0002-01',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Genie ZeroOps is the agentic layer that monitors your jobs in the background and takes action when something needs attention — debugging failures, surfacing insights, and flagging issues before they escalate. You can configure it to watch specific jobs, tags, or ownership groups and define how it should respond.',
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
                content: "No. Genie ZeroOps runs continuously in the background. It'll open a thread here when it detects something worth your attention, so you can review and respond on your own schedule.",
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- columns = [
-     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',
-     'last_login_delta', 'email_open_rate', 'sms_opt_in',
-     'push_notification_ctr', 'promo_redemption_count',
-     'web_session_count_30d', 'mobile_session_count_30d',
-     'support_ticket_count', 'contract_end_delta', 'product_count'
- ]
+ columns = [
+     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',
+     'contract_end_delta', 'product_count'
+ ]`,
                                filename: 'churn_feature_pipeline.py',
                                language: 'diff',
                            },
                        ],
                        style: 'single',
                    },
                },
                content: "The `churn_scoring` model references 14 columns, but only 6 are used in the final feature set. The remaining 8 haven't contributed to predictions in 90 days. Removing them would reduce compute time by ~18% and simplify the schema.\n\n## Proposed fix:\nDrop the 8 unused columns from [[file:churn_feature_pipeline.py|#]] so [[job:ml_churn_scoring|#]] only reads features that contribute to predictions.\n\n[[embed:code_change|default]]",
                created_at: '2026-04-20T06:00:00+00:00',
                id: 'msg-0004-01',
                role: 'agent',
                thought: {
                    duration_ms: 38000,
                    summary: 'I pulled 90 days of feature importance from the model registry, isolated the columns that no longer move the prediction, confirmed nothing else consumes them, and verified AUC parity in sandbox.',
                    steps: [
                        {
                            summary: 'Pulled 90-day feature importance from the model registry',
                            content: `Loaded the last 90 days of training runs for [[job:ml_churn_scoring|#]] from the model registry. Compared SHAP and permutation-importance scores across the 14 input columns to find columns whose contribution is rounding to zero.`,
                        },
                        {
                            summary: 'Identified 8 columns with near-zero contribution',
                            content: `8 of 14 columns have permutation importance < 0.001 and SHAP magnitude < 0.005 across every run in the window: [[column:last_login_delta]], [[column:email_open_rate]], [[column:sms_opt_in]], [[column:push_notification_ctr]], [[column:promo_redemption_count]], [[column:web_session_count_30d]], [[column:mobile_session_count_30d]], [[column:support_ticket_count]]. The remaining 6 carry all the signal.`,
                        },
                        {
                            summary: 'Checked for other consumers',
                            content: `Searched lineage for any other job, notebook, or dashboard that reads the 8 columns from the upstream feature table. No other consumers — they're only read by [[job:ml_churn_scoring|#]], so dropping them from the pipeline doesn't break anything else.`,
                        },
                        {
                            summary: 'Validated in sandbox',
                            content: `Retrained the model on the trimmed 6-column feature set against the last 30 days of holdout data. AUC matched production (within ±0.001), precision/recall at the production threshold unchanged. Feature-pipeline runtime dropped ~18% and the downstream parquet file shrank proportionally.`,
                        },
                    ],
                },
            },
            {
                content: 'Which columns specifically?',
                created_at: '2026-04-20T06:05:00+00:00',
                id: 'msg-0004-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'The unused columns are: [[column:last_login_delta]], [[column:email_open_rate]], [[column:sms_opt_in]], [[column:push_notification_ctr]], [[column:promo_redemption_count]], [[column:web_session_count_30d]], [[column:mobile_session_count_30d]], and [[column:support_ticket_count]]. None have had non-null variance in the last 90 days of training runs.',
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
                content: "Here's the diff against [[file:churn_feature_pipeline.py|#]] — same one I showed earlier, ready to PR:\n\n```diff\n- columns = [\n-     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',\n-     'last_login_delta', 'email_open_rate', 'sms_opt_in',\n-     'push_notification_ctr', 'promo_redemption_count',\n-     'web_session_count_30d', 'mobile_session_count_30d',\n-     'support_ticket_count', 'contract_end_delta', 'product_count'\n- ]\n+ columns = [\n+     'customer_id', 'tenure_days', 'plan_tier', 'monthly_spend',\n+     'contract_end_delta', 'product_count'\n+ ]\n```",
                created_at: '2026-04-20T06:10:00+00:00',
                id: 'msg-0004-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create pull request' },
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- df = df.append(new_rows, ignore_index=True)
+ df = pd.concat([df, new_rows], ignore_index=True)`,
                                filename: 'ml_churn_scoring.py',
                                language: 'diff',
                            },
                        ],
                        style: 'single',
                    },
                },
                content: '4 jobs are running on Databricks Runtime 14.3, which reaches end-of-support on May 1. DBR 17.0 LTS is available and compatible with your current cluster configurations. Affected jobs: [[job:etl_sales_daily|#]], [[job:etl_marketing_events|#]], [[job:report_customer_360|#]], and [[job:ml_churn_scoring|#]].\n\n## Proposed fix:\nReplace the deprecated `DataFrame.append()` call in [[job:ml_churn_scoring|#]] with `pd.concat()` — the only breaking change blocking the DBR 17.0 LTS upgrade.\n\n[[embed:code_change|default]]',
                created_at: '2026-04-20T06:05:00+00:00',
                id: 'msg-0005-01',
                role: 'agent',
                thought: {
                    duration_ms: 42000,
                    summary: 'I scanned the 4 jobs for Python and Pandas API breakage on DBR 17.0 LTS, isolated the single blocker, and verified the replacement works on a sandbox cluster matching their production config.',
                    steps: [
                        {
                            summary: 'Scanned codebase for Pandas API breakage',
                            content: `Ran a static check against the Pandas 2.x migration guide for the 4 affected jobs. Looking specifically for the APIs removed in 2.0 (\`DataFrame.append\`, \`DataFrame.iteritems\`, \`Series.iteritems\`, \`DataFrame.lookup\`, positional indexing changes, etc.).`,
                        },
                        {
                            summary: 'Found one breakage',
                            content: `Single hit across all 4 jobs: \`df.append(new_rows, ignore_index=True)\` in [[job:ml_churn_scoring|#]] at line 84. Everything else uses APIs that survived Pandas 2.x unchanged.`,
                        },
                        {
                            summary: 'Verified the replacement in sandbox',
                            content: `Spun up a sandbox cluster on DBR 17.0 LTS with the same instance type and Spark config as the production \`ml-scoring-pool\`. Patched [[job:ml_churn_scoring|#]] to use \`pd.concat([df, new_rows], ignore_index=True)\` and ran end-to-end on yesterday's input: identical output, no warnings, runtime within 2% of DBR 14.3.`,
                        },
                        {
                            summary: 'Confirmed Python version compatibility',
                            content: `DBR 17.0 LTS drops Python 3.9 support. Checked the runtime metadata on all 4 jobs — they're already on Python 3.11, so the 3.9 removal doesn't apply.`,
                        },
                    ],
                },
            },
            {
                content: 'Any breaking changes I should know about?',
                created_at: '2026-04-20T06:10:00+00:00',
                id: 'msg-0005-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'DBR 17.0 drops Python 3.9 support (your jobs use 3.11, so no impact). The relevant change: Pandas 2.x is now default, which removes `DataFrame.append()`. I found one usage in [[job:ml_churn_scoring|#]] — I can show you the fix.',
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
                content: "In [[job:ml_churn_scoring|#]], line 84:\n\n```diff\n- df = df.append(new_rows, ignore_index=True)\n+ df = pd.concat([df, new_rows], ignore_index=True)\n```\n\nThat's the only change needed before upgrading.",
                created_at: '2026-04-20T06:18:00+00:00',
                id: 'msg-0005-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create pull request' },
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- JOIN orders o
-   ON s.customer_id = o.customer_id
+ JOIN orders o
+   ON CAST(s.customer_id AS STRING) = CAST(o.customer_id AS STRING)`,
                                filename: 'etl_sales_daily.py',
                                language: 'diff',
                            },
                            {
                                code: `- JOIN orders o
-   ON e.customer_id = o.customer_id
+ JOIN orders o
+   ON CAST(e.customer_id AS STRING) = CAST(o.customer_id AS STRING)`,
                                filename: 'etl_marketing_events.py',
                                language: 'diff',
                            },
                            {
                                code: `- JOIN orders o
-   ON c.customer_id = o.customer_id
+ JOIN orders o
+   ON CAST(c.customer_id AS STRING) = CAST(o.customer_id AS STRING)`,
                                filename: 'report_customer_360.py',
                                language: 'diff',
                            },
                        ],
                        style: 'group',
                    },
                },
                content: `3 jobs failed this morning due to a schema change in the [[table:orders|#]] table — [[column:customer_id]] was changed from INT to STRING. Affected jobs: [[job:etl_sales_daily|#]], [[job:etl_marketing_events|#]], [[job:report_customer_360|#]]. All failed at the join step.

## Proposed fix:
Cast [[column:customer_id]] to STRING in the join predicate across all three jobs. Safer than reverting the upstream schema change.

[[embed:code_change|default]]`,
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
                content: "The schema change was applied by `svc_dbt_prod` at 01:47 UTC, as part of a dbt model update. The [[table:orders|#]] source model has a recent commit: \"normalize customer IDs to UUID strings\".",
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- events = (spark.readStream.format("kafka")
-     .option("subscribe", "marketing-events")
-     .load())
- enriched = events.join(campaigns, "campaign_id")
+ events = (spark.readStream.format("kafka")
+     .option("subscribe", "marketing-events")
+     .option("minPartitions", "32")
+     .load())
+ enriched = events.join(broadcast(campaigns), "campaign_id")`,
                                filename: 'etl_marketing_events.py',
                                language: 'diff',
                            },
                        ],
                        style: 'single',
                    },
                },
                content: `[[job:etl_marketing_events|#]] has not completed a successful run in 4 hours. Its freshness SLA is 6 hours. At current pace it will breach the SLA at 14:00 UTC — about 90 minutes from now.

## Proposed fix:
Increase Kafka read parallelism via \`minPartitions\` and broadcast the small [[table:campaigns|#]] dimension to eliminate the sort-merge join in the enrichment step.

[[embed:code_change|default]]`,
                created_at: '2026-04-20T08:15:00+00:00',
                id: 'msg-0007-01',
                role: 'agent',
                thought: {
                    duration_ms: 32000,
                    summary: 'I quantified the SLA breach window, found partition skew on the Kafka consumer plus a sort-merge join against a small dim, and validated the broadcast + minPartitions fix in sandbox.',
                    steps: [
                        {
                            summary: 'Confirmed SLA breach window',
                            content: `[[job:etl_marketing_events|#]] hasn't completed a successful run in 4 hours. SLA is 6 hours. At the current arrival-to-commit rate, the next successful refresh lands around 14:00 UTC — 90 minutes from now, right at the breach line.`,
                        },
                        {
                            summary: 'Inspected Kafka consumer lag',
                            content: `Consumer-group lag sits at 2.1M messages. Pulled per-partition offsets: 4 of the 8 partitions hold ~80% of the backlog. Producer side is healthy and evenly balanced, so the skew is on the consumer — \`spark.readStream\` is allocating one task per Kafka partition with no parallelism boost.`,
                        },
                        {
                            summary: 'Analyzed the Spark plan',
                            content: `The enrichment join uses a sort-merge join against [[table:campaigns|#]] (47 rows, ~3 KB). With AQE off and no explicit broadcast hint, Spark shuffles both sides every micro-batch. That's where the per-batch latency tail is coming from.`,
                        },
                        {
                            summary: 'Sandbox validated the fix',
                            content: `Replayed the last hour of traffic against a sandbox cluster with \`minPartitions=32\` on the Kafka source and \`broadcast(campaigns)\` on the join. Sustained throughput ~4x the current arrival rate; no skew warnings; output rows match production. Backlog drains in ~12 minutes once the PR is merged.`,
                        },
                    ],
                },
            },
            {
                content: "What's causing the delay?",
                created_at: '2026-04-20T08:20:00+00:00',
                id: 'msg-0007-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Two things compounding. Kafka consumer lag has built up to 2.1M messages because 4 partitions are doing ~80% of the work — classic skew. Once the events land, the enrichment step joins against the small [[table:campaigns|#]] dim with a sort-merge join instead of a broadcast, so each micro-batch falls further behind.',
                created_at: '2026-04-20T08:20:05+00:00',
                id: 'msg-0007-03',
                role: 'agent',
                thought_duration_ms: 21000,
            },
            {
                content: 'Will the optimization clear the lag, or do we need to drain it separately?',
                created_at: '2026-04-20T08:23:00+00:00',
                id: 'msg-0007-04',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'The optimization clears it on its own. With `minPartitions=32` the consumer pulls ~4x faster than the current arrival rate, so the 2.1M backlog drains in ~12 minutes. After that, the broadcast join keeps each micro-batch under the SLA window. No separate drain job needed.',
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- contacts = spark.table("raw.crm_contacts")
+ contacts = spark.table("unity_catalog.crm.contacts")`,
                                filename: 'report_customer_360.py',
                                language: 'diff',
                            },
                        ],
                        style: 'single',
                    },
                },
                content: `[[job:report_customer_360|#]] has been failing since 03:00 UTC. Root cause: the upstream table [[table:raw.crm_contacts|#]] was dropped. This table is referenced in 3 downstream jobs.

## Proposed fix:
Update the table reference to the new Unity Catalog location, [[table:unity_catalog.crm.contacts|#]].

[[embed:code_change|default]]`,
                created_at: '2026-04-20T09:00:00+00:00',
                id: 'msg-0008-01',
                role: 'agent',
                thought: {
                    duration_ms: 36000,
                    summary: 'I traced the failure to a missing upstream table, audited who dropped it and when, then confirmed the migrated location has a matching schema so a rename is sufficient.',
                    steps: [
                        {
                            summary: 'Identified the failing query',
                            content: `[[job:report_customer_360|#]] has been failing since 03:00 UTC with:

\`\`\`
[TABLE_OR_VIEW_NOT_FOUND] The table or view \`raw\`.\`crm_contacts\` cannot be found.
\`\`\`

The query references [[table:raw.crm_contacts|#]] directly, so the failure isn't a join or schema issue — the table itself is gone.`,
                        },
                        {
                            summary: 'Queried Unity Catalog audit log',
                            content: `Pulled \`system.access.audit\` for \`DROP TABLE\` events on \`raw.crm_contacts\`. Found one match at 02:58 UTC by \`andrew.wierzba@company.com\` with the comment "migration to unity catalog" — 2 minutes before the first failed run.`,
                        },
                        {
                            summary: 'Searched for the migrated table',
                            content: `Looked for tables created or modified around 02:58 UTC by the same principal. Found [[table:unity_catalog.crm.contacts|#]] created at 02:55 UTC with the same row count as the last snapshot of [[table:raw.crm_contacts|#]].`,
                        },
                        {
                            summary: 'Diffed schemas',
                            content: `Column-by-column diff between [[table:raw.crm_contacts|#]] (last known schema) and [[table:unity_catalog.crm.contacts|#]] is 1:1 — same column names, same types, same nullability. The fix is a literal rename; no casts or projections needed.`,
                        },
                    ],
                },
            },
            {
                content: 'Was it dropped intentionally?',
                created_at: '2026-04-20T09:04:00+00:00',
                id: 'msg-0008-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: 'Yes — the audit log shows it was dropped by `andrew.wierzba@company.com` at 02:58 UTC with the comment "migration to unity catalog". The new location appears to be [[table:unity_catalog.crm.contacts|#]].',
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
                content: "Updated the table reference in [[job:report_customer_360|#]] from [[table:raw.crm_contacts|#]] to [[table:unity_catalog.crm.contacts|#]]. The job is queued to re-run now.",
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
                code_changes: {
                    default: {
                        actions: [
                            { label: 'Review', variant: 'secondary' },
                            {
                                icon: GitPullRequestIcon,
                                label: 'Create pull request',
                                variant: 'primary',
                            },
                        ],
                        files: [
                            {
                                code: `- daily_totals = orders.groupBy("date").sum("amount")
- unique_customers = orders.groupBy("date").agg(countDistinct("customer_id"))
- refunds = orders.filter("status = 'refund'").groupBy("date").sum("amount")
- avg_order = orders.groupBy("date").avg("amount")
- rates = spark.table("currency_rates")
- converted = daily_totals.join(rates, "currency_code")
+ daily_metrics = orders.groupBy("date").agg(
+     sum("amount").alias("daily_total"),
+     countDistinct("customer_id").alias("unique_customers"),
+     sum(when(col("status") == "refund", col("amount"))).alias("refund_total"),
+     avg("amount").alias("avg_order_value"),
+ )
+ rates = spark.table("currency_rates")
+ converted = daily_metrics.join(broadcast(rates), "currency_code")`,
                                filename: 'etl_sales_daily.py',
                                language: 'diff',
                            },
                            {
                                code: `- spark.conf.set("spark.sql.adaptive.enabled", "false")
+ spark.conf.set("spark.sql.adaptive.enabled", "true")
+ spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")`,
                                filename: 'spark_session.py',
                                language: 'diff',
                            },
                        ],
                        style: 'group',
                    },
                },
                content: `[[job:etl_sales_daily|#]] has been completing after 10:00 AM for the past 5 days, breaching its 9:00 AM SLA. The executive dashboard subscription at 9:00 AM is receiving stale data.

I analyzed the Spark execution plan and found 4 compounding performance issues. This job has accumulated technical debt over 5 months of incremental feature additions — including changes introduced when the [[column:amount]] column was migrated to STRING.

## Proposed fix:
- 4 optimizations across code, engine config, and storage
- Passes sandbox run; output identical to production
- Benchmarked on 50M row sample: 9m 4s → 1m 3s (8.6x faster)
- Estimated completion after fix: ~8:30 AM — within SLA

[[embed:code_change|default]]`,
                created_at: '2026-04-20T09:30:00+00:00',
                id: 'msg-0009-01',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create pull request with fix' },
                ],
                thought: {
                    duration_ms: 118000,
                    summary: 'I traced the freshness regression on sales_daily_report back to gradual code drift, mapped the inflection points to specific feature additions, and benchmarked a consolidated query in sandbox.',
                    steps: [
                        {
                            summary: 'Pulled freshness anomaly from Lakehouse Monitoring',
                            content: `[[table:sales_daily_report|#]] is expected to refresh by 9:00 AM. Lakehouse Monitoring flagged a freshness anomaly: the table hasn't been updated until after 10:00 AM for 5 consecutive weekdays. No job failures fired — the job is completing successfully, just late.`,
                        },
                        {
                            summary: 'Reconstructed run-history trend',
                            content: `Pulled the last 30 days of run history for [[job:etl_sales_daily|#]]. Duration has drifted from ~95 minutes (March baseline) to ~130 minutes today. The 5 most recent runs all land after 10:00 AM:

| Date | Duration | Finished |
|------|----------|----------|
| Apr 13 | 127 min | 10:07 AM |
| Apr 14 | 131 min | 10:11 AM |
| Apr 15 | 129 min | 10:09 AM |
| Apr 16 | 134 min | 10:14 AM |
| Apr 17 | 130 min | 10:10 AM |`,
                        },
                        {
                            summary: 'Mapped git history to regression dates',
                            content: `Diffed the job against the March baseline and lined up commits with the inflection points in the duration trend:

- **DATA-4637 (Jan 2026)** — added a unique-customer-count \`groupBy\`, introducing a second shuffle stage.
- **DATA-4718 (Feb 2026)** — added USD conversion via a join against [[table:currency_rates|#]] (20 rows). With AQE disabled, Spark picked a sort-merge join.
- **DATA-4801 (Feb 2026)** — added refund totals and average order value as 2 additional passes over the source table instead of folding them into the existing aggregation.

Each change passed code review individually; the compounding effect is what regressed runtime ~9x at production scale.`,
                        },
                        {
                            summary: 'Analyzed Spark execution plan',
                            content: `4 compounding issues in the plan:

1. **4 separate groupBy passes** over [[table:orders|#]] (sum, distinct count, refund filter, avg) → consolidate into a single aggregation.
2. **Sort-merge join** with the 20-row [[table:currency_rates|#]] dim → broadcast.
3. **Adaptive query execution disabled** → enable.
4. **Partition coalesce disabled** → enable so the output stage doesn't fan out to thousands of tiny files.`,
                        },
                        {
                            summary: 'Validated in an isolated sandbox',
                            content: `Ran the patched job on a 50M-row sample drawn from yesterday's [[table:orders|#]] partition:

- Before: 9m 4s
- After: 1m 3s (8.6x faster)
- Output diff vs production: 0 rows
- No downstream dashboard or query regressions detected.

Extrapolated to the full 500M-row partition, post-fix runtime is ~40 minutes, putting completion around 8:30 AM — comfortably inside the 9:00 AM SLA.`,
                        },
                    ],
                },
            },
            {
                content: "Can't the job just run earlier to make the 9 AM deadline?",
                created_at: '2026-04-20T09:32:00+00:00',
                id: 'msg-0009-02',
                role: 'user',
            },
            {
                actions: defaultAgentActions,
                content: `Unfortunately not. The upstream data usually lands at 7:30 AM ([[job:ingest_transactions|#]]) and the [[job:etl_sales_daily|#]] job currently lasts ~130 minutes.

The real problem is the job itself: it's gotten nearly 9x slower over the last 5 months. It now takes ~130 minutes on 500M rows. I recommend optimizing the job rather than shifting the schedule.`,
                created_at: '2026-04-20T09:32:05+00:00',
                id: 'msg-0009-03',
                role: 'agent',
                suggestions: [
                    { label: 'Show full analysis' },
                    { label: 'Create pull request with fix' },
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
                content: `Lakehouse Monitoring detected a data freshness anomaly on the [[table:sales_daily_report|#]] table. The table is expected to refresh by 9:00 AM daily, but for the past 5 days it hasn't been updated until after 10:00 AM.

I correlated this with the run history for [[job:etl_sales_daily|#]] — the job that writes to this table — and confirmed that execution time has been steadily increasing:

| Date | Duration | Finished |
|------|----------|----------|
| Apr 13 | 127 min | 10:07 AM |
| Apr 14 | 131 min | 10:11 AM |
| Apr 15 | 129 min | 10:09 AM |
| Apr 16 | 134 min | 10:14 AM |
| Apr 17 | 130 min | 10:10 AM |

This is a gradual degradation, not a sudden failure — which is why no alerts fired until the freshness monitor caught it.`,
                created_at: '2026-04-20T09:34:05+00:00',
                id: 'msg-0009-05',
                role: 'agent',
                suggestions: [
                    { label: 'Create pull request with fix' },
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

**Feb 2026 (DATA-4718):** Finance requested USD conversion. A join with [[table:currency_rates|#]] (20 rows) was added — but Spark uses a sort-merge join because AQE is disabled.

**Feb 2026 (DATA-4801):** Ops requested refund totals and avg order value. Three separate passes over the source table were added instead of consolidating into the existing aggregation.

Each change passed code review individually. The performance cliff came from their compound effect at scale.`,
                created_at: '2026-04-20T09:36:05+00:00',
                id: 'msg-0009-07',
                role: 'agent',
                suggestions: [
                    { label: 'Create pull request with fix' },
                ],
                thought_duration_ms: 44000,
            },
        ],
    },
]
