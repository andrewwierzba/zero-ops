import Link from "next/link"

import { BellIcon, BotIcon, BrainIcon, ClockIcon, CloudIcon, CompassIcon, DatabaseIcon, DownloadIcon, FileCodeIcon, FlaskConicalIcon, HistoryIcon, LayoutDashboardIcon, ListChecksIcon, NotebookIcon, PackageIcon, PlusIcon, RadioIcon, ShapesIcon, SparkleIcon, SparklesIcon, SquareTerminalIcon, StoreIcon, WandIcon, WorkflowIcon } from "lucide-react"

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
            icon: ShapesIcon,
            label: 'Catalog'
         }, {
            href: '/jobs',
            icon: WorkflowIcon,
            label: 'Jobs & Pipelines'
         }, {
            href: '/compute/interactive',
            icon: CloudIcon,
            label: 'Compute'
         }, {
            href: '/search/discover',
            icon: CompassIcon,
            label: 'Discover'
         }, {
            href: '/marketplace',
            icon: StoreIcon,
            label: 'Marketplace'
         }]
    }, {
        label: 'SQL',
        items: [{
            href: '/editor/queries',
            icon: SquareTerminalIcon,
            label: 'SQL Editor'
         }, {
            href: '/sql/queries',
            icon: FileCodeIcon,
            label: 'Queries'
         }, {
            href: '/sql/dashboards',
            icon: LayoutDashboardIcon,
            label: 'Dashboards'
         }, {
            href: '/genie',
            icon: SparkleIcon,
            label: 'Genie'
         }, {
            href: '/sql/alerts',
            icon: BellIcon,
            label: 'Alerts'
         }, {
            href: '/sql/history',
            icon: HistoryIcon,
            label: 'Query History'
         }, {
            href: '/compute/sql-warehouses',
            icon: DatabaseIcon,
            label: 'SQL Warehouses'
         }]
    }, {
        label: 'Data Engineering',
        items: [{
            href: '/jobs/runs',
            icon: ListChecksIcon,
            label: 'Runs'
         }, {
            href: '/ingestion/add',
            icon: DownloadIcon,
            label: 'Data Ingestion'
         }]
    }, {
        label: 'AI/ML',
        items: [{
            href: '/ml/playground',
            icon: SparklesIcon,
            label: 'Playground'
         }, {
            href: '/ml/bricks',
            icon: BotIcon,
            label: 'Agents'
         }, {
            href: '/ml/ai-gateway',
            icon: WandIcon,
            label: 'AI Gateway'
         }, {
            href: '/ml/experiments',
            icon: FlaskConicalIcon,
            label: 'Experiments'
         }, {
            href: '/feature-store',
            icon: PackageIcon,
            label: 'Features'
         }, {
            href: '/ml/models',
            icon: BrainIcon,
            label: 'Models'
         }, {
            href: '/ml/endpoints',
            icon: RadioIcon,
            label: 'Serving'
         }]
    }]
}: {
    groups?: {
        items: {
            href: string,
            icon: React.ElementType,
            label: string
        }[],
        label?: string
    }[]
}) {
   return (
      <div className="flex flex-col group min-h-0 min-w-50 self-stretch">
         <div aria-label="Sidebar" className="items-center flex flex-1 flex-col text-sm min-h-0 overflow-y-auto px-3 py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent group-hover:[&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:group-hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <span className="items-center bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-950 rounded-sm flex font-medium gap-2 mb-2 px-3 py-1.5 w-full">
                  <PlusIcon className="text-red-500 size-4" />
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
                              className="items-center rounded-sm flex gap-2 px-3 py-1.5 w-full hover:bg-[rgb(34,114,180)]/10 dark:hover:bg-[rgb(64,152,224)]/20"
                              href={item.href}
                              key={itemIndex}
                        >
                              <item.icon className="text-muted-foreground size-4" />
                              <span>{item.label}</span>
                        </Link>
                     ))}
                  </div>
            ))}
         </div>
      </div>
   )
}
