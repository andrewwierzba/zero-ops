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
                promptMatch: 'create pull request',
                thoughtDurationMs: 2000,
                reply: {
                    content:
                        'PR created.\n\n- Branch: `fix/cast-policyholder-id-to-string`\n- Commit: `a3f5b9c`\n- PR link: [#482 Cast policyholder_id to STRING in claims enrichment join](#)',
                },
            },
        ],
    },
}
