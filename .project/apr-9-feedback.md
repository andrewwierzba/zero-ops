# Feedback — Apr 9

## Copy

- **Autopilot** has been renamed to **Genie Autopilot**.
- **Incidents** has been renamed to **Inbox** (the page) or **insights** (the content type).

## Cross-product alignment

Align information architecture with Genie Code.

## Agent creation and management

**Before:** Autopilot routed to `/autopilots` with a list of agents. Clicking an agent opened a chatbox with a scoped list of active or recent threads created by that agent. Feedback: the agent creation and management flow was too first-class.

**After:** Configure and Inbox are separate items in the threads panel. Configure routes to a configuration overview — one option being Automations (Genie Autopilot). Agent creation and management now lives under Configure. This aligns with how other teams are approaching Genie Code IA.

## Features

**Current:** Genie Autopilot creates one incident or insight thread per job failure.

**Planned:** Support one thread per group of jobs (scope defined by the user), rather than one thread per job.

### Open questions

- **Grouping:** How should job grouping scope be communicated in the UI?
- **Collaboration:** How should collaboration be surfaced in the UI? One idea: incident or insight details could include a progress summary / changes timeline.
