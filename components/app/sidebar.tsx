import Link from 'next/link'

import { cn } from '@/lib/utils'

import { CompassIcon } from 'lucide-react'

import { BeakerIcon, ChecklistIcon, ClockIcon, CloudDatabaseIcon, CloudIcon, CloudModelIcon, DashboardIcon, DataIcon, DatabaseIcon, HistoryIcon, IngestionIcon, LayerIcon, ModelsIcon, NotebookIcon, NotificationIcon, PlusIcon, QueryEditorIcon, QueryIcon, SparkleDoubleIcon, SparkleRectangleIcon, StorefrontIcon, UserSparkleIcon, WorkflowsIcon } from '@databricks/design-system'

export function Sidebar({
    groups = [{
        items: [{
            href: '/browse',
            icon: NotebookIcon,
            label: 'Workspace'
         }, {
            href: '/recents',
            icon: ClockIcon,
            label: 'Recents'
         }, {
            href: '/explore/data',
            icon: DataIcon,
            label: 'Catalog'
         }, {
            href: '/jobs',
            icon: WorkflowsIcon,
            label: 'Jobs & Pipelines'
         }, {
            href: '/compute/interactive',
            icon: CloudIcon,
            label: 'Compute'
         }, {
            href: '/search/discover',
            icon: CompassIcon,
            label: 'Discover',
            tag: 'Beta'
         }, {
            href: '/marketplace',
            icon: StorefrontIcon,
            label: 'Marketplace'
         }]
    }, {
        label: 'SQL',
        items: [{
            href: '/editor/queries',
            icon: QueryEditorIcon,
            label: 'SQL Editor'
         }, {
            href: '/sql/queries',
            icon: QueryIcon,
            label: 'Queries'
         }, {
            href: '/sql/dashboards',
            icon: DashboardIcon,
            label: 'Dashboards'
         }, {
            href: '/genie',
            icon: SparkleRectangleIcon,
            label: 'Genie'
         }, {
            href: '/sql/alerts',
            icon: NotificationIcon,
            label: 'Alerts'
         }, {
            href: '/sql/history',
            icon: HistoryIcon,
            label: 'Query History'
         }, {
            href: '/compute/sql-warehouses',
            icon: CloudDatabaseIcon,
            label: 'SQL Warehouses'
         }]
    }, {
        label: 'Data Engineering',
        items: [{
            href: '/jobs/runs',
            icon: ChecklistIcon,
            label: 'Runs'
         }, {
            href: '/ingestion/add',
            icon: IngestionIcon,
            label: 'Data Ingestion'
         }]
    }, {
        label: 'AI/ML',
        items: [{
            href: '/ml/playground',
            icon: SparkleDoubleIcon,
            label: 'Playground'
         }, {
            href: '/ml/bricks',
            icon: UserSparkleIcon,
            label: 'Agents'
         }, {
            className: 'rotate-270',
            href: '/ml/ai-gateway',
            icon: IngestionIcon,
            label: 'AI Gateway'
         }, {
            href: '/ml/experiments',
            icon: BeakerIcon,
            label: 'Experiments'
         }, {
            href: '/feature-store',
            icon: LayerIcon,
            label: 'Features'
         }, {
            href: '/ml/models',
            icon: ModelsIcon,
            label: 'Models'
         }, {
            href: '/ml/endpoints',
            icon: CloudModelIcon,
            label: 'Serving'
         }]
    }]
}: {
    groups?: {
        items: {
            className?: string,
            href: string,
            icon: React.ElementType,
            label: string,
            tag?: string
        }[],
        label?: string
    }[]
}) {
   return (
      <div className="flex flex-col group min-h-0 min-w-50 self-stretch">
         <div aria-label="Sidebar" className="items-center flex flex-1 flex-col text-[13px] min-h-0 overflow-y-auto pl-3 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent group-hover:[&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:group-hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <span className="items-center bg-[rgb(255,73,73)]/8 border border-[rgb(255,73,73)]/8 rounded-md flex font-semibold gap-2 h-10 mb-2 px-3 py-1.5 shrink-0 w-full">
                  <PlusIcon
                     className="text-[rgb(255,73,73)]! size-4"
                     onPointerEnterCapture={() => {}}
                     onPointerLeaveCapture={() => {}}
                  />
                  <span>New</span>
            </span>

            {groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="w-full">
                     {group.label && (
                        <div className="text-muted-foreground text-xs px-3 py-2">
                              {group.label}
                        </div>
                     )}
                     {group.items.map((item, itemIndex) => (
                        <Link
                              aria-label="Sidebar item"
                              className="items-center hover:bg-[rgb(34,114,180)]/10 dark:hover:bg-[rgb(64,152,224)]/20 rounded-[4px] text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] flex gap-2 group/item px-3 py-1.5 w-full"
                              href={item.href}
                              key={itemIndex}
                        >
                              <item.icon className={cn('text-[rgb(111,111,111)]! dark:text-[rgb(146,164,179)]! group-hover/item:text-[rgb(14,83,139)]! dark:group-hover/item:text-[rgb(138,202,255)]! size-4', item.className)} />
                              <span>{item.label}</span>
                              {item.tag && (
                                 <span className="bg-[rgb(22,22,22)]/5 dark:bg-[rgb(232,236,240)]/8 rounded-[4px] text-[rgb(22,22,22)] dark:text-[rgb(232,236,240)] inline-flex px-1.5 py-0.5">
                                    <span className="min-w-0 truncate">{item.tag}</span>
                                 </span>
                              )}
                        </Link>
                     ))}
                  </div>
            ))}
         </div>
      </div>
   )
}
