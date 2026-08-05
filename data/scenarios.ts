import { MessageAction } from '@/data/messages'

export interface ScenarioThoughtStep {
    description: string
    detail?: string
    durationMs: number
}

export interface ScenarioStep {
    promptMatch: string
    reply: {
        actions?: MessageAction[];
        content: string;
        suggestions?: MessageAction[];
    }
    steps?: ScenarioThoughtStep[]
    thoughtDurationMs: number
}

export interface Scenario {
    id: string
    steps: ScenarioStep[]
}

export function normalizePrompt(input: string): string {
    return input
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[?!.,;:]+$/g, '')
        .trim()
}

export const scenarios: Record<string, Scenario> = {
    'zeroops-configure': {
        id: 'zeroops-configure',
        steps: [
            {
                promptMatch: 'how is zeroops configured',
                thoughtDurationMs: 2000,
                reply: {
                    content:
                        'ZeroOps is currently **off**. When enabled, it monitors workspace assets for failures, SLA breaches, schema drift, performance regressions, deprecated runtimes, and unused resources, then surfaces each issue as a prioritized thread.\n\n**Scope**\n- Jobs: `job-1`, `job-2`, `job-3`, `job-4`, `job-5`, `job-6`, `job-7`\n- Tables: `table-1`, `table-2`, `table-3`\n\n**Run as:** `lennart.kats@databricks.com`',
                },
            },
        ],
    },
    'claims-schema-drift-pr': {
        id: 'claims-schema-drift-pr',
        steps: [
            {
                promptMatch: 'commit and push',
                thoughtDurationMs: 2000,
                reply: {
                    content:
                        'Committed and pushed the validated change.\n\n- Branch: `fix/cast-policyholder-id-to-string`\n- Commit: `a3f5b9c`\n- PR: [Open PR](#)',
                },
            },
        ],
    },
    'fan-interaction-commit-push': {
        id: 'fan-interaction-commit-push',
        steps: [
            {
                promptMatch: 'commit and push',
                thoughtDurationMs: 3000,
                reply: {
                    content:
                        'Committed and pushed the validated change.\n\n- Branch: `perf/fan-interaction-staged-streaming`\n- Commit: `5e2af71`\n- PR: [Open PR](#)',
                },
            },
        ],
    },
    // Report docked-bar suggestions — each opens a new thread seeded with the
    // suggestion prompt; these scenarios script the agent's first reply.
    'report-draft-fix': {
        id: 'report-draft-fix',
        steps: [
            {
                promptMatch: 'draft a fix for this insight',
                thoughtDurationMs: 3000,
                reply: {
                    content:
                        "Here's a fix drafted from the report's root cause.\n\nI've prepared a minimal change scoped to the affected assets, validated it against a sandbox run, and confirmed the output matches production. Review the diff and I can commit and push it when you're ready.",
                    suggestions: [{ label: 'Commit and push' }],
                },
            },
        ],
    },
    'report-explain-root-cause': {
        id: 'report-explain-root-cause',
        steps: [
            {
                promptMatch: 'explain the root cause in plain language',
                thoughtDurationMs: 2500,
                reply: {
                    content:
                        "In plain terms: something upstream changed in a way the downstream work didn't expect, so it either failed or silently produced the wrong result. The report's root cause section has the specifics — I can walk through any part of it, or show exactly where it breaks.",
                },
            },
        ],
    },
    'report-open-pr': {
        id: 'report-open-pr',
        steps: [
            {
                promptMatch: 'commit and push the fix',
                thoughtDurationMs: 3000,
                reply: {
                    content:
                        'Committed and pushed the validated change.\n\n- Branch: `fix/zeroops-suggested-change`\n- PR: [Open PR](#)\n\nI linked it back to this insight so the status updates once the change merges.',
                },
            },
        ],
    },
}
