# Customer Notes: HP

Created by Andrew Wierzba on May 22, 2026 and updated on May 22, 2026

## Monitoring & Debugging in Genie Code

**Customer:** HP Telemetry Data Platform team — José Miguel Ibañez (Director), Kyle Prouty, Mark Middendorf, and others

### Questions

#### 1. Where do you generally start when debugging or monitoring?

*E.g. Databricks, Email, Jira, PagerDuty, Slack*

**Answer:**

- The HP telemetry platform team works across the full stack — ingestion, analytics, SQL warehouses, jobs, and orchestration — supporting telemetry from HP products (printers, PCs, apps) into Databricks for analytics and decision-making.
- For SQL workloads, Kyle typically starts in query history.
- For jobs, the team starts with job logs, but those logs are often limited.
- Some orchestration still runs in Airflow (carried over from their Redshift migration because it does things Redshift couldn’t), so failures often surface first through Airflow or pipeline notifications before the team investigates in Databricks. They are planning to shift more notifications into Databricks over time.
- Mark also uses the Databricks API to query job- or platform-level information.

**Additional Insights:**

- A major pain point is limited access to Spark logs — certain log levels are only visible to account admins or Databricks support, which forces escalation and makes debugging an “endless chase” when Spark UI traces aren’t descriptive.
- Without that detail, the team often has to guess at root cause from prior experience (e.g. a worker that failed to report home, causing a cascading failure) and then go to support to confirm.
- Mark has prototyped AI-driven log querying by feeding logs in as a “glob” of information and noted that Genie Code is excellent at parsing them in real time.
- The group flagged real confusion around the “Genie” naming — “Genie Spaces,” “Genie Code,” and now “Genie ZeroOps” all sound related but mean different things. José Miguel said he keeps a personal “cheat sheet for Genies.”

> “Even when I can access the Spark UI, the log level is restricted compared to what support agents can see, and parsing these logs manually is highly time-consuming.” — Kyle

#### 2. Do you have any existing incident management systems in place?

**Answer:**

- Incident and monitoring workflows are mixed and vary by team.
- Some teams are notified through their Airflow orchestration layer first; others are increasingly shifting notifications into Databricks.
- For hard-to-debug Spark or query issues, teams escalate to Databricks Support because the surfaced logs do not expose enough information for self-service resolution.
- Communication also happens through team Microsoft Teams channels when upstream or downstream teams need to be notified of a failure.

#### 3. Who is typically involved in resolving issues?

**Answer:**

- The HP telemetry platform team owns and operates the platform end to end. Different team members specialize across ingestion, analytics, and platform operations, so the owner of an issue depends on where it occurs.
- Within Mark’s team, work is structured parent-child: senior engineers manage tasks for junior developers, hand off coverage when teammates are out, and act as the conduit for business communication when failures occur.
- Senior engineers or team leads help triage, delegate, and communicate failures across dependent teams.
- Databricks Support is brought in when logs or internal failure details are not visible to the team.

#### 4. How do handoffs work when resolving cross-team issues?

**Answer:**

- Handoffs rely heavily on Microsoft Teams channels — when there is a failure somewhere, someone posts it, and impacted downstream teams know to prepare.
- José Miguel emphasized the need for end-to-end observability so downstream teams can be warned before their scheduled jobs run — “maybe I delay the scheduled job, I try to be proactive in accelerating.”
- Lineage and catalog metadata should help identify how far back a failure occurred, what downstream assets are impacted, and who should act if the primary owner is unavailable.
- Current permission models — Unity Catalog plus access tags managed through their internal “zone console” — are restrictive. The team is concerned that if only people with underlying catalog permissions can see operational layers, it will hinder program-management visibility.
- They want operational summaries to be shareable across teams without unnecessarily exposing the underlying data or compute.

> “If only the people that have underlying catalog permissions can see these layers, that might be a problem.” — Kyle

#### 5. If you were setting up an agent to monitor your assets, what would you want to configure?

**Answer:**

- Monitoring needs to be configurable by **persona, role, team, and asset scope**. Mark explicitly wears multiple personas across different days and needs the agent to integrate with him at his level rather than start with a broad global view.
- Different pipelines need different levels of supervision:
  - Streaming workloads where failures are routine: the agent should be allowed full automation (e.g. just restart).
  - Monthly aggregation jobs: require human review before any fix to avoid introducing bad data downstream.
- Engineers need granular control over alerting, retry behavior, approval thresholds, and who gets notified.
- Different lenses are needed by audience: platform leaders want aggregated views; teams and individual owners want granular, asset-specific views.
- The team wants a long-term, lightweight aggregate metric layer so they don’t have to build run history themselves — logs get discarded today, but trends in failure rates, runtimes, compute usage, and SLO/freshness performance would help leaders decide where to invest engineering time.
- The scope of “operations” should eventually extend well beyond jobs and pipelines: dashboard availability, Databricks apps, Genie Spaces availability, data freshness, and SLO delivery to internal/external customers.

> “If it’s ZeroOps, I don’t have to ask anything. I come here and it tells me — can I go and have a coffee with my colleagues, or should I look at something here?” — José Miguel

### Prototype Review (10–15 minutes)

- Entry point (i.e. Genie ZeroOps tab)
  - Observations:
    - The group questioned whether Jobs and Pipelines is the right long-term home if Genie ZeroOps is meant to cover both job compute and SQL warehouses.
  - Feedback:
    - Kyle said placement depends on scope: if it is primarily debugging orchestration, Jobs and Pipelines makes sense; if it also debugs SQL warehouses, the placement starts to feel awkward.
    - José Miguel emphasized that “ZeroOps” is a bold statement and implies a broader operational cockpit, not just job debugging.
    - The team wants ZeroOps accessible through multiple paths, including a front-and-center alert on login. “I would expect a button with operations and a red button saying you need to come here. There is something here.”
- Inbox view (empty state)
  - Feedback:
    - The empty state should explain that the page will populate after setup and that setup is what drives the operational view.
    - Kyle liked the eventual inbox/operations view and said he wished that was what opened by default after entering ZeroOps. “I almost wish maybe this was the view.”
    - The group did not want to manually check an inbox to discover issues; the system should proactively bring attention to the right person in the right place.
- Setup (thread)
  - Feedback:
    - The “Analyzing your workspace” message after authorization felt jarring to José Miguel because the product had already made setup suggestions before the analysis step. “If you analyze my workspace when I authorize you to do things, I’m assuming you have analyzed my workspace before … it scares a little bit to me.”
    - The setup flow should make clear whether analysis has already happened, what is being authorized, and what will happen next.
    - Mark suggested the product should walk the metadata tree (job IDs, task trees, notebooks) and automatically surface failure points rather than asking humans to drill in manually — “the structure is already there, just go and extract it.”
- Inbox view with prioritized insights
  - Feedback:
    - The group wanted an aggregated operational view that answers, at a glance, whether everything is healthy or whether something needs attention.
    - The view should support multiple lenses: individual owner, team, manager, and platform leader.
    - The system should capture long-term history — failures, runtimes, compute usage, repeated problem areas — so leaders can decide where to invest engineering time.
    - Alerts or indicators should be visible without forcing the user to dig into Genie Code or an operations inbox.
- Managing an insight (e.g. insight thread)
  - Feedback:
    - For a product called “ZeroOps,” “likely cause” feels too weak — users expect a confident **root cause**. “If you want zero ops, you cannot put likely cause. You need to put root cause.” — José Miguel
    - Important information should be distilled at the top so users immediately know what to look at, rather than reading through the AI’s reasoning first.
    - Mark suggested visualizations (e.g. NetworkX-style graph or network views) for pipeline status and dependencies, since humans process visual data much faster than text.
    - Lineage, owner, impacted assets, and downstream effects should be visible in the insight so another teammate can respond if the primary owner is unavailable.
- Configuration
  - Feedback:
    - Configuration must support safe automation, with different rules by pipeline and workload type (full automation for streaming jobs, manual approval for monthly aggregations).
    - The agent should support a range of automation levels: notify only, suggest a fix, retry automatically, create a pull request, or apply a fix after approval.
    - Permissions and collaboration need careful handling — users should be able to see operational summaries without having full access to underlying tables or catalogs.
    - The team showed strong interest in agentic repair workflows, especially flows where Genie ZeroOps creates a PR that can be reviewed and deployed through their existing GitHub / CI-CD processes. “The ideal ZeroOps state would have the agent create a PR for the user to review and automate further via GitHub pipelines.” — Kyle
    - José Miguel noted that data practitioners are growing accustomed to highly integrated environments (GitHub Copilot, Genie Code), where fixes are presented in line. Requiring manual intervention rather than an agentic flow may feel like a regression.

### Source

https://www.figma.com/proto/m9y6rYY079qwtoEi6KQSMA/Genie-ZeroOps-%E2%80%94-Wed-May-13-2026?node-id=227-3014&p=f&viewport=-647%2C267%2C0.38&t=hr8X5KoOonYu1zEy-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A3014&page-id=227%3A3013
