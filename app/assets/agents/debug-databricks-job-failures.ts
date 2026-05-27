const content = `# Debugging Agent Summary

**Name:** Debug Databricks job failures  
**Status:** Active  
**Scope:** Production Databricks Jobs  
**Run as:** databricks-debug-sp@datacompany.com  
**Created:** 2026-04-13 10:18 UTC  

---

## Purpose

This debugging agent investigates Databricks Job failures, identifies likely root causes, and produces a concise summary with recommended next steps.

It is designed to reduce manual triage time by collecting the most relevant evidence from logs, run metadata, and recent job history.

---

## What it monitors

This agent monitors:

- Failed Databricks Job runs
- Repeated retries for the same job
- Jobs with unusual duration increases
- Runs with recurring error signatures

---

## What it does

When triggered, this agent will:

1. Inspect run status, task results, and failure metadata
2. Analyze logs and captured error messages
3. Compare the failure against recent runs
4. Identify likely root causes
5. Produce a debugging summary with recommendations
6. Escalate unclear or low-confidence cases for manual review

---

## Typical issues it can identify

- Cluster startup failures
- Library or dependency issues
- Permission or credential errors
- Timeouts
- Out-of-memory failures
- Upstream data availability issues
- Regressions introduced by recent changes

---

## Output

For each investigated failure, this agent produces:

- A short incident summary
- Likely root cause
- Supporting signals
- Suggested next steps
- Links to relevant runs or logs

---

## Safeguards

This agent is configured to:

- Prefer explanation over automatic action
- Avoid code changes
- Avoid modifying production jobs directly
- Escalate when confidence is low
- Operate using the configured service principal

---

## Review guidance

Review this agent if:

- It frequently returns low-confidence results
- New job patterns are introduced
- Access scope changes
- Investigation instructions need to be updated

---

## Notes

This agent focuses on debugging and triage. It helps explain failures quickly and consistently across Databricks Jobs.`;

export default content;
