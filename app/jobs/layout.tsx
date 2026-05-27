'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const segment = useSelectedLayoutSegment()

    const activeTab = segment === 'runs' ? 'runs' : 'jobs'

    return (
        <ApplicationShell>
            <ApplicationContent>
                <div className="flex flex-1 flex-col min-w-0 p-4">
                    <span className="text-xl font-bold mb-6">Jobs & Pipelines</span>
                    <Tabs
                        className="border-b"
                        onValueChange={(value) => router.push(value === 'runs' ? '/jobs/runs' : '/jobs')}
                        value={activeTab}
                    >
                        <TabsList variant="line">
                            <TabsTrigger value="jobs">
                                Jobs & Pipelines
                            </TabsTrigger>
                            <TabsTrigger value="runs">
                                Runs
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex flex-1 min-h-0">
                        {children}
                    </div>
                </div>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Layout
