import type { ElementType } from 'react'

export interface GraphStepContent {
    label: string
    value: string
}

export interface GraphStep {
    id: string
    label: string
    position: { x: number; y: number }
    content?: GraphStepContent
    icon?: ElementType
    showSource?: boolean
    showTarget?: boolean
    status?: 'success'
    taskType?: string
}

export interface GraphEdge {
    id: string
    source: string
    target: string
}

export interface GraphDef {
    title: string
    nodes: GraphStep[]
    edges: GraphEdge[]
}

export const graphs: Record<string, GraphDef> = {
    'fan-enrichment-impact': {
        title: 'Impact',
        nodes: [
            {
                id: '0',
                label: 'fan_profile_enrichment',
                position: { x: 50, y: 50 },
                content: { label: 'Upstream', value: 'Freshness SLA breached' },
                showTarget: false,
                taskType: 'pipeline',
            },
            {
                id: '1',
                label: 'fan_interaction_enrichment',
                position: { x: 340, y: 50 },
                content: { label: 'Primary', value: 'Processing latency increasing' },
                taskType: 'python-script',
            },
            {
                id: '2',
                label: 'stadium_visualization_sink',
                position: { x: 630, y: 50 },
                content: { label: 'Downstream', value: 'Lakebase write retries' },
                showSource: false,
                taskType: 'python-script',
            },
        ],
        edges: [
            { id: 'e0-1', source: '0', target: '1' },
            { id: 'e1-2', source: '1', target: '2' },
        ],
    },
    'claims-policyholder-schema': {
        title: 'Lineage',
        nodes: [
            {
                id: '0',
                label: 'Ingest claims events',
                position: { x: 50, y: 50 },
                content: { label: 'Source', value: '/pipelines/bronze/raw_claims_events' },
                showTarget: false,
                taskType: 'notebook',
            },
            {
                id: '1',
                label: 'etl_claims_daily',
                position: { x: 340, y: 50 },
                content: { label: 'Job', value: '/workflows/claims/etl_claims_daily' },
                taskType: 'python-script',
            },
            {
                id: '2',
                label: 'Enrich claims',
                position: { x: 630, y: 50 },
                content: { label: 'Table', value: '/pipelines/silver/claims_enriched' },
                taskType: 'sql',
            },
            {
                id: '3',
                label: 'claims_processing_dashboard',
                position: { x: 920, y: 50 },
                content: { label: 'Target', value: '/pipelines/gold/claims_processing_dashboard' },
                showSource: false,
                taskType: 'pipeline',
            },
        ],
        edges: [
            { id: 'e0-1', source: '0', target: '1' },
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e2-3', source: '2', target: '3' },
        ],
    },
}
