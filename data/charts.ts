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
    'fan-enrichment-latency': {
        title: 'fan_interaction_enrichment.end_to_end_latency',
        subtitle: '60m',
        config: {
            rows: {
                label: 'Latency (seconds)',
                color: 'rgb(200,45,76)',
            },
        },
        data: [
            { time: '13:45', rows: 42 },
            { time: '13:50', rows: 45 },
            { time: '13:55', rows: 48 },
            { time: '14:00', rows: 52 },
            { time: '14:05', rows: 58 },
            { time: '14:10', rows: 89 },
            { time: '14:15', rows: 156 },
            { time: '14:20', rows: 234 },
            { time: '14:25', rows: 312 },
            { time: '14:30', rows: 389 },
            { time: '14:35', rows: 428 },
            { time: '14:40', rows: 468 },
            { time: '14:45', rows: 468 },
        ],
    },
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
