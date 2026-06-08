export interface ChartPoint {
    time: string
    rows: number
}

export interface ChartSeriesConfig {
    label: string
    color: string
}

export interface ChartDef {
    title: string
    subtitle?: string
    config: { rows: ChartSeriesConfig }
    data: ChartPoint[]
}

export const charts: Record<string, ChartDef> = {
    'claims-enrichment-committed-rows': {
        title: 'etl_claims_enrichment.committed_output_rows',
        subtitle: '1h',
        config: {
            rows: {
                label: 'Committed rows',
                color: 'rgb(34,114,180)',
            },
        },
        data: [
            { time: '06:00', rows: 16240 },
            { time: '06:05', rows: 15890 },
            { time: '06:10', rows: 17120 },
            { time: '06:15', rows: 16780 },
            { time: '06:20', rows: 16350 },
            { time: '06:25', rows: 17200 },
            { time: '06:30', rows: 16950 },
            { time: '06:35', rows: 16480 },
            { time: '06:40', rows: 17050 },
            { time: '06:45', rows: 16800 },
            { time: '06:50', rows: 0 },
            { time: '06:55', rows: 0 },
            { time: '07:00', rows: 0 },
        ],
    },
}
