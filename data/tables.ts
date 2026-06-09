export interface TableColumn {
    key: string
    header: string
    align?: 'left' | 'right'
}

export interface TableRow {
    [key: string]: string | number
}

export interface TableDef {
    title: string
    columns: TableColumn[]
    rows: TableRow[]
}

export const tables: Record<string, TableDef> = {
    'fan-enrichment-metrics': {
        title: 'Observed in the last 60-minute high-traffic window',
        columns: [
            { key: 'metric', header: 'Metric', align: 'left' },
            { key: 'target', header: 'Target', align: 'right' },
            { key: 'observed', header: 'Observed', align: 'right' },
        ],
        rows: [
            { metric: 'End-to-end enrichment latency', target: '< 60 sec', observed: '7m 48s peak' },
            { metric: 'Lakebase write retry rate', target: '< 1%', observed: '11.6% peak' },
            { metric: 'Stadium visualization freshness', target: '< 60 sec', observed: '6–8 min stale' },
            { metric: 'Downstream feature completeness', target: '> 99%', observed: '93.4% during spike' },
        ],
    },
}
