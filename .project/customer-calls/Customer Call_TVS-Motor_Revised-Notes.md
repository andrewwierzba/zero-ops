# Customer Notes: TVS Motor

Created by Andrew Wierzba on May 20, 2026 and updated on May 20, 2026

## Monitoring & Debugging in Genie Code

**Customer:** Avirup Dandapat at TVS Motor

### Questions

#### 1. Where do you generally start when debugging or monitoring?

*E.g. Databricks, Email, Jira, PagerDuty, Slack*

**Answer:**

- TVS Motor ingests data from many different source systems (e.g. SAP, on-premises SQL servers) across hybrid cloud, hitting them through APIs and connectors, with jobs running every 15–30 minutes.
- Failures are surfaced through a custom solution that pushes alerts to both email and a Microsoft Teams channel so the responsible person can pick them up.
- Aggregated dashboards (built on system tables) feed weekly/monthly forecasting and operational visibility.
- System-level monitoring also covers cluster performance: production runs use job clusters and cluster pools, while development primarily uses interactive clusters and SQL warehouses.

**Additional Insights:**

- TVS Motor’s lakehouse runs on Azure, but their broader landscape extends to AWS and GCP. The hybrid-cloud footprint surfaces hardware/network issues at the infrastructure layer.
- Genie (Databricks Assistant) is already in use for transformations and dashboarding and is being rolled out to business stakeholders.

> “Dashboards are pretty handy nowadays … a quick pull-up we can do and then showcase … and along with the Databricks Assistant, which is now we call as Genie, that is also working good.”

#### 2. Do you have any existing incident management systems in place?

**Answer:**

- Primary tooling today is email alerts, dashboards, and Microsoft Teams notifications.
- They have built a custom Jira API integration — a try/catch block at the last step of a process raises a Jira request when a failure occurs.
- These are all manual, custom-built workflows; Avirup noted there is no automated Databricks-native incident-management offering they’re using today.

> “Those are manual … no automated offerings from Databricks. We have built our custom solutions for it.”

#### 3. Who is typically involved in resolving issues?

**Answer:**

- Resolution is mostly human effort — data engineers and engineering leaders pitch in.
- Databricks Assistant already handles a lot of the lower-level work (library versions, Spark-level problems), so they see fewer of those issues now.
- The remaining issues are typically data-availability problems or business-rule failures that require source-system investigation.
- Avirup is looking for an agentic experience where failures are captured automatically, surfaced through an LLM/Genie, and then a human approves any action that touches production.

> “There has to be a human in the loop … he or she has to approve that.”

#### 4. How do handoffs work when resolving cross-team issues?

**Answer:**

- Cross-team and cross-functional handoffs are entirely manual.
- Example: SAP is a critical source system extracted via Fivetran. If data isn’t flowing or there is a mismatch, the team has to manually engage the SAP team to investigate.
- They have pre-built data quality checks; when a discrepancy is detected, the framework flags it and the team manually engages the source-system owner.
- Avirup called out a strong desire for built-in data-quality metrics in Databricks aligned to ISO standard data-quality dimensions, since they ingest data from ~70 different source systems and need to publish data quality at scale.

#### 5. If you were setting up an agent to monitor your assets, what would you want to configure?

**Answer:**

- The agent should be permission-aware at the Unity Catalog level — what tables/pipelines it can act on, and what roles it can/cannot perform.
- Every pipeline should have a switch to enable/disable the agent — off in dev, on in production.
- The agent should focus on three main areas:
  - **Pipeline failure recovery:** Read the application log, identify the issue, and (for simple cases like library/version errors) just rerun without a human in the loop.
  - **Data-discrepancy approval:** Anything that writes to or updates a table should bring a human in the loop before action is taken (call, email, or a channel notification).
  - **Production performance optimization:** Run continuously against production, capture performance information, and propose cluster-sizing or other optimizations — without disrupting autoscaling, which they’ve had reliability issues with on long-running jobs.

> “The first thing which you'll have to do is you'll have to carve out the permission — how much permission you are going to give on the Unity Catalog level.”

### Prototype Review (10–15 minutes)

- Entry point (i.e. Genie ZeroOps tab)
  - Observations:
    - Avirup expected helper/AI functionality to be quickly accessible from the pipeline area or right-hand side, rather than nested under a global top-right entry.
  - Feedback:
    - The current Genie placement (right-hand side) is acceptable, but adding access nearer to the pipeline context (or near the top-right “Send feedback” entry) would make it easier to reach. Engineers default to expecting that area to be settings/admin/profile.
    - The Genie ZeroOps tab next to Jobs, Pipelines, and Runs was understandable, but the product still needs stronger up-front context about what ZeroOps actually is.
- Inbox view (empty state)
  - Feedback:
    - The empty state needs more product context before asking the user to enable Genie ZeroOps. “I want to have a little background of this product … what we are going to get out of this Genie ZeroOps. Then probably I can give some feedback.”
    - The customer wanted a clearer explanation of what Genie ZeroOps monitors, what kinds of insights it produces, and what value users should expect after enabling it.
    - The “Enable with Genie Code” action made sense once explained, but the surrounding page should make scope and outcome more explicit.
- Setup (thread)
  - Feedback:
    - The setup flow should clearly define what is being monitored before analysis begins — jobs, pipelines, tables, schemas, or specific modules.
    - The chat-style window that opens for setup felt familiar — “this window is similar like Genie chat window, right?”
    - The thread created during setup was interpreted as potentially ticket-like; Avirup immediately asked whether it could integrate with Jira or another Atlassian product.
- Inbox view with prioritized insights
  - Feedback:
    - The customer expected the insight list to include operational metadata: status, date, owner, batch run ID, start/end time, and error message.
    - Older issues should be closeable/removable once resolved — otherwise the queue gets noisy. “There has to be some sort of status … otherwise it will always be in queue and the older things will keep on coming.”
    - Avirup mapped this directly to an internal metric they already track: successful job execution / failures per 1,000 pipeline runs. Today they manually act on failures and then close the ticket.
- Managing an insight (e.g. insight thread)
  - Feedback:
    - The structured insight view was well received. “From a normal product perspective, whenever we are opening a log, we would like to see what is the problem … what is the likely cause … what is the suggested fix.”
    - Avirup suggested promoting the problem statement to the top of the view, with a clearer header (e.g. “Problems”) to make the structure scannable.
    - He explicitly asked for a close/resolve action near the suggested fix so users can mark the problem solved after the agent or a human resolves it — with an automated close if a thread has been pending for ~7 days.
    - One last point at the end of the call: the insight should also display a date column and owner details, mirroring what they already do on jobs and pipelines.
- Configuration
  - Feedback:
    - Configuration should be permission-aware and role-based at the Unity Catalog level.
    - Avirup wanted module-specific configuration so each business group (Finance, HR, Legal) can manage only its own pipelines, with an admin role that can see everything across modules. “I want it module specific.”
    - The product must distinguish low-risk automation from actions that need human approval, especially in production.
    - Jira / Atlassian integration was repeatedly called out as important for ticket creation, tracking, and closure.

### Source

https://www.figma.com/proto/m9y6rYY079qwtoEi6KQSMA/Genie-ZeroOps-%E2%80%94-Wed-May-13-2026?node-id=227-3014&p=f&viewport=-647%2C267%2C0.38&t=hr8X5KoOonYu1zEy-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A3014&page-id=227%3A3013
