import { cn } from '@/lib/utils'

import { FileIcon, PipelineIcon, TableIcon, WorkflowsIcon } from '@/lib/icons'

const Icons = {
    file: FileIcon,
    job: WorkflowsIcon,
    pipeline: PipelineIcon,
    table: TableIcon,
} as const

export type AssetKind = keyof typeof Icons

export type ReferenceProps =
    | { kind: AssetKind; label: string; link?: string; type: 'asset' }
    | { label: string; type: 'column'  }

export function Reference(props: ReferenceProps) {
    const baseClass = 'items-center bg-[rgb(22,22,22)]/5 dark:bg-[rgb(232,236,240)]/5 text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] rounded-[4px] inline-flex text-[13px] leading-[20px] px-1'

    if (props.type !== 'asset') {
        return <span className={cn(baseClass, 'font-mono')}>{props.label}</span>
    }

    const Icon = Icons[props.kind]
    const className = cn(baseClass, 'bg-transparent dark:bg-transparent border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] border gap-1', props.link && 'cursor-pointer hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(138,202,255)]/8 hover:border-[rgb(34,114,180)] dark:hover:border-[rgb(138,202,255)]')
    
    const body = (
        <>
            <Icon
                className="text-[rgb(82,82,82)] dark:text-[rgb(146,164,179)] size-3"
            />
            <span className="min-w-0 truncate">{props.label}</span>
        </>
    )

    return props.link
        ? <a className={className} href={props.link}>
            {body}
          </a>
        : <span className={className}>
            {body}
          </span>
}
