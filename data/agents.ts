export interface Agent {
    active: boolean
    id: string
    configuration: Configuration
    markdown: string
    created_at: string
    updated_at: string
}

export interface Asset {
    name: string
    type: string
}

interface Configuration {
    name: string
    instructions: string
    scope: Asset[]
    run_as: string
    created_at: string
    updated_at: string
}

export const defaultAgents: Agent[] = [
    /* {
        id: 'aaaaaaaa-0000-0000-0000-000000000001',
        created_at: '2026-04-01T00:00:00+00:00',
        updated_at: '2026-04-01T00:00:00+00:00',
        configuration: {
            name: 'Autopilot',
            instructions: 'Monitor all workspace jobs for failures, SLA breaches, schema drift, performance degradation, deprecated runtimes, and unused resources. Surface each issue as a prioritized thread.',
            scope: [{ name: 'All jobs', type: 'job' }],
            run_as: 'lennart.kats@databricks.com',
            created_at: '2026-04-01T00:00:00+00:00',
            updated_at: '2026-04-01T00:00:00+00:00',
        },
        markdown: `# Autopilot`,
    },*/

    {
        active: false,
        id: 'aaaaaaaa-0000-0000-0000-000000000001',
        created_at: '2026-04-01T00:00:00+00:00',
        updated_at: '2026-04-01T00:00:00+00:00',
        configuration: {
            name: 'Genie ZeroOps',
            instructions: 'Monitor all workspace jobs for failures, SLA breaches, schema drift, performance degradation, deprecated runtimes, and unused resources. Surface each issue as a prioritized thread.',
            scope: [{
                name: 'job-1', type: 'job'
            }, {
                name: 'job-2', type: 'job'
            }, {
                name: 'job-3', type: 'job' 
            }, {
                name: 'job-4', type: 'job' 
            }, {
                name: 'job-5', type: 'job' 
            }, {
                name: 'job-6', type: 'job' 
            }, {
                name: 'job-7', type: 'job' 
            }, {
                name: 'table-1', type: 'table'
            }, {
                name: 'table-2', type: 'table'
            }, {
                name: 'table-3', type: 'table'
            }],
            run_as: 'lennart.kats@databricks.com',
            created_at: '2026-04-01T00:00:00+00:00',
            updated_at: '2026-04-01T00:00:00+00:00',
        },
        markdown: `# Genie ZeroOps`,
    },
]
