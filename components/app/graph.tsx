'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Handle,
    Node,
    NodeTypes,
    BackgroundVariant,
    Position,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { cn } from '@/lib/utils'

import { CheckCircleIcon, GridDashIcon } from '@/lib/icons'

import { Separator } from '@/components/ui/separator'

import { GraphDef, GraphStepContent } from '@/data/graphs'

interface StepNodeData {
    content?: GraphStepContent;
    icon?: React.ElementType;
    label: string;
    showSource?: boolean;
    showTarget?: boolean;
    status?: 'success';
    taskType?: string;
}

function StepNode({ data }: { data: StepNodeData }) {
    const Icon = data.icon ?? GridDashIcon

    return (
        <div
            aria-label='graph-step'
            className='bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] rounded-[4px] relative shadow-xs w-[240px]'
        >
            {data.showTarget !== false && <Handle className='!bg-[rgb(235,235,235)] dark:bg-[rgb(31,39,45)] !border-none !h-2 !w-2' position={Position.Left} type='target' />}
            {data.showSource !== false && <Handle className='!bg-[rgb(235,235,235)] dark:bg-[rgb(31,39,45)] !border-none !h-2 !w-2' position={Position.Right} type='source' />}
            <div className='items-center flex gap-2 p-2'>
                <div aria-label='step-icon' className='bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1'>
                    <Icon
                        className='rounded-[4px] p-0.5 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] size-4'
                    />
                </div>
                <span aria-label='step-name' className='text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] text-sm font-semibold flex-1 truncate'>
                    {data.label}
                </span>
                {data.status === 'success' && (
                    <div aria-label='step-status' className='flex h-6 items-center justify-center w-6'>
                        <CheckCircleIcon
                            className='text-[rgb(39,124,67)] dark:text-[rgb(59,166,94)] size-4'
                        />
                    </div>
                )}
            </div>
            <Separator className='border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)]' />
            <div aria-label='' className='min-w-0 overflow-hidden p-2'>
                {data?.content ? (
                    <div className='flex gap-1'>
                        <span className='text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]'>{data.content.label}:</span>
                        <span className='text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] truncate' title={data.content.value}>
                            {data.content.value}
                        </span>
                    </div>
                ) : (
                    <div className='bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border bg-[rgb(235,235,235)] dark:bg-[rgb(31,39,45)] border-dashed h-[60px] rounded' />
                )}
            </div>
        </div>
    )
}

const nodeTypes: NodeTypes = {
    step: StepNode,
}

export function Graph({ className, graph, onNodeClick }: { className?: string; graph: GraphDef; onNodeClick?: (nodeId: string, data: StepNodeData) => void }) {
    const initialNodes: Node[] = useMemo(() => graph.nodes.map((node) => ({
        id: node.id,
        type: 'step',
        position: node.position,
        data: {
            content: node.content,
            icon: node.icon,
            label: node.label,
            showSource: node.showSource,
            showTarget: node.showTarget,
            status: node.status,
            taskType: node.taskType,
        },
    })), [graph])

    const handleNodeClick = useCallback((_: React.MouseEvent, node: Node<StepNodeData>) => {
        onNodeClick?.(node.id, node.data);
    }, [onNodeClick]);

    const initialEdges: Edge[] = useMemo(() => graph.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
    })), [graph])

    return (
        <div
            aria-label='directed-acyclic-graph' 
            className={cn('bg-background', className)}
        >
            <ReactFlow
                edges={initialEdges}
                fitView
                fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
                nodes={initialNodes}
                nodeTypes={nodeTypes}
                onNodeClick={handleNodeClick}
                proOptions={{ hideAttribution: true }}
            >
                <Background
                    className='bg-[rgb(247,247,247]/5 dark:bg-[rgb(31,39,45]/5'
                    gap={12} 
                    size={1}
                    variant={BackgroundVariant.Dots} 
                />
                <Controls
                    className='rounded-[4px] overflow-hidden [&_button]:!bg-[rgb(255,255,255)] [&_button]:!border-b-[rgb(235,235,235)] [&_button:last-child]:!border-b-0 [&_button_svg]:!fill-[rgb(111,111,111)] dark:[&_button]:!bg-[rgb(17,23,28)] dark:[&_button]:!border-b-[rgb(31,39,45)] dark:[&_button_svg]:!fill-[rgb(146,164,179)]'
                    showFitView={true}
                    showInteractive={false}
                    showZoom={true}
                />
            </ReactFlow>
        </div>
    )
}
