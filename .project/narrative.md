# Narrative
Pretext: I open my Databricks workspace and navigate to Autopilot in Genie Code. The Autopilot inbox view shows all current incidents or insights—stack ranked by priority through AI.

## Threads
Ordered by date created.

| Label | Type |
| ----- | ---- |
| What is Genie Code? | `null` |
| What can Autopilot in Genie Code do? | `null` |
| Create automation for debugging job failures | `automation` |
| Churn scoring: unused columns can be removed | `incident` |
| DBR 14 -> 17 update available for 4 jobs | `incident` |
| 3 sales/marketing jobs failing due to change from INT to String | `incident` |
| etl_marketing_events freshness SLA at risk | `incident` |
| Customer 360 failing: upstream table dropped | `incident` |
| Sales dashboard data arriving late | `incident` |


## CUJ1: Archive An Insight
As a user, I want to "Archive" an insight—with the expectation that a toast notification will show after archiving.

**ASCII diagram:**
```
┌─────────────────────────────┐
│ Insight archived [Undo] [x] |
└─────────────────────────────┘
```

## CUJ2: Manage An Insight
#### Sales dashboard data arriving late
**Messages:**\
**Autopilot:**
`etl_sales_daily` has been completing after 10:00 AM for the past 5 days, breaching its 9:00 AM SLA. The executive dashboard subscription at 9:00 AM is receiving stale data.

I analyzed the Spark execution plan and found 6 compounding performance issues. This job has accumulated technical debt over 5 months of incremental feature additions — including changes introduced when the amount column was migrated to STRING.

Proposed fix:
- 6 optimizations across code, engine config, and storage
- passes sandbox run; output identical to production
- benchmarked on 50M row sample: 9m 4s → 1m 3s (8.6x faster)
- estimated completion after fix: 8:10 AM — within SLA

↳ 🔎 Show full analysis\
↳ 🟢 Create PR with fix

**Lennart**:
Can't the job just run earlier to make the 9 AM deadline?

**Autopilot:**
Unfortunately not. The upstream data usually lands at 7:30 AM (`ingest_transactions`) and the `etl_sales_daily` job currently lasts ~130 minutes.

The real problem is the job itself: it's gotten nearly 9x slower over the last 5 months. It now takes ~130 minutes on 500M rows. I recommend optimizing the job rather than shifting the schedule.

↳ 🔎 Show full analysis\
↳ 🟢 Create PR with fix

**Lennart**:
How did you even find this issue? The job didn't fail.

**Autopilot:**
Lakehouse Monitoring detected a data freshness anomaly on the `sales_daily_report` table. The table is expected to refresh by 9:00 AM daily, but for the past 5 days it hasn't been updated until after 10:00 AM.

I correlated this with the run history for `etl_sales_daily` — the job that writes to this table — and confirmed that execution time has been steadily increasing:

| Date   | Duration | Finished |
| ------ | -------- | -------- |
| Mar 31 | 127 min  | 10:07 AM |
| Apr 1  | 131 min  | 10:11 AM |
| Apr 2  | 129 min  | 10:09 AM |
| Apr 3  | 134 min  | 10:14 AM |
| Apr 4  | 130 min  | 10:10 AM |

This is a gradual degradation, not a sudden failure — which is why no alerts fired until the freshness monitor caught it.

↳ 🟢 Create PR with fix

**Lennart**:
What changed? This job used to finish on time.

**Autopilot:**
- **Jan 2026** (DATA-4637): Product requested unique customer counts. A pre-aggregation `groupBy` was added, creating a second shuffle stage.
- **Feb 2026** (DATA-4718): Finance requested USD conversion. A join with `currency_rates` (20 rows) was added — but Spark uses a sort-merge join because AQE is disabled.
- **Feb 2026** (DATA-4801): Ops requested refund totals and avg order value. Three separate passes over the source table were added instead of consolidating into the existing aggregation.

Each change passed code review individually. The performance cliff came from their compound effect at scale.

↳ 🟢 Create PR with fix

**Lennart**:
Create PR with fix

**Autopilot:**
`etl_sales_daily.py` +14 -31 [Undo ↩] [v]

```diff
-  spark.conf.set("spark.sql.adaptive.enabled", "false")
+  spark.conf.set("spark.sql.adaptive.enabled", "true")

-  refund_totals = df.groupBy("order_id").agg(sum("refund_amount"))
-  avg_order    = df.groupBy("order_id").agg(avg("order_value"))
-  unique_custs = df.groupBy("order_id").agg(countDistinct("customer_id"))
+  agg = df.groupBy("order_id").agg(
+      sum("refund_amount").alias("refund_total"),
+      avg("order_value").alias("avg_order_value"),
+      countDistinct("customer_id").alias("unique_customers"),
+  )

-  rates = spark.table("currency_rates")
-  df = df.join(rates, "currency_code")
+  rates = spark.table("currency_rates")
+  df = df.join(broadcast(rates), "currency_code")
```

**Autopilot:**
PR [#4912]() opened → DATA-5021: Optimize `etl_sales_daily` (8.6x perf improvement)
- Assigned to **you** for review
- Linked to Jira ticket [DATA-5021]()
- Estimated merge-to-production time: ~20 min

Once merged, `etl_sales_daily` will complete by ~8:10 AM — within the 9:00 AM SLA.

#### Continued...
Lennart navigates back to the Autopilot inbox, and both insights “Sales dashboard data arriving late” and “3 sales/marketing jobs failing due to change from INT to String” are now shown as "Resolved".

Lennart dismisses the “Sales dashboard data arriving late” insight.

Lennart clicks on the “3 sales/marketing jobs failing due to change from INT to String” insight, and the Genie Code thread opens.

**Autopilot:**
3 sales/marketing jobs are failing and need to be updated since column amount changed from type INT to STRING (“150 USD”)

Proposed fix (+4 -4) — passes sandbox run, expectations, tests:

```diff
# schemas/sales.py
-  AMOUNT_TYPE = "int"
+  AMOUNT_TYPE = "string"

-  def cast_amount(col):
-      return col.cast("int")
+  def cast_amount(col):
+      return col.cast("string")
```

All 3 jobs import `cast_amount` from this shared schema — no changes needed in the job files themselves.

↳ 🟢 Create PR with fix

**Autopilot:**
I rolled back the `amount` column based on Dana’s instructions

**Autopilot:**
PR [#123456]() ready for review: update `amount` column to STRING
- minimal change (+4 -4) 
- passes sandbox run, expectations, tests  

**Autopilot:**
PR has been merged. Incident resolved.

↳ ↩️  Re-open this incident\
↳ 🔎 View PR
