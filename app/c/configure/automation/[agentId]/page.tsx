'use client'

import { use, useState } from 'react'
import { ArrowLeftIcon, BotIcon, CodeIcon, EllipsisVerticalIcon, StarIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePanelRef } from 'react-resizable-panels'

import { PanelRightCloseIcon } from '@/app/assets/icons/panel-right-close'
import { PanelRightOpenIcon } from '@/app/assets/icons/panel-right-open'

import ReactMarkdown from 'react-markdown'

import { ApplicationContent, ApplicationShell } from '@/components/app/application-shell'
import { Chatbox } from '@/components/app/chatbox'
import { CodeBlock } from '@/components/app/code-block'
import Threads from '@/components/app/threads'
import { useThreads } from '@/components/app/threads-context'

import { Button } from '@/components/ui/button'
import { Combobox, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxLabel, ComboboxList } from '@/components/ui/combobox'
import { Field, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

interface PageProps {
    params: Promise<{ agentId: string }>
}

function Page({ params }: PageProps) {
    const router = useRouter()
    
    const { agentId } = use(params)
    const { agents } = useThreads()

    const [threadsOpen, setThreadsOpen] = useState(true)
    const threadsPanelRef = usePanelRef()

    const [configOpen, setConfigOpen] = useState(false)
    const configPanelRef = usePanelRef()

    const agent = agents.find((a) => a.id === agentId)
    const [favorited, setFavorited] = useState(false)

    const [view, setView] = useState<'preview' | 'markdown'>('preview')

    function handleThreadsToggle() {
        if (threadsOpen) {
            threadsPanelRef.current?.collapse()
        } else {
            threadsPanelRef.current?.expand()
        }
        setThreadsOpen((o) => !o)
    }

    return (
        <ApplicationShell>
            <ApplicationContent>
                <ResizablePanelGroup>
                    <ResizablePanel
                        className="flex"
                        collapsedSize="48px"
                        collapsible
                        defaultSize="200px"
                        minSize="200px"
                        panelRef={threadsPanelRef}
                    >
                        <Threads onToggle={handleThreadsToggle} panelOpen={threadsOpen} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="flex flex-col" minSize="200px">
                        {/* Header */}
                        <div aria-label="Automations header" className="flex border-b gap-2 p-2 shrink-0">
                            <div className="flex-1">
                                <Button onClick={() => router.push('/c/configure/automation')} variant="ghost">
                                    <ArrowLeftIcon className="size-4" />
                                    Automations
                                </Button>
                            </div>
                            {!configOpen &&
                                <div className="items-center flex gap-2 before:content-[''] before:border-neutral-300 before:border-l before:h-6 before:top-0 dark:before:border-neutral-700">
                                    <Button
                                        className="group"
                                        onClick={() => setConfigOpen((o) => !o)}
                                        size="icon"
                                        variant="ghost"
                                    >
                                        {configOpen ? <PanelRightOpenIcon className="size-4"/> : <PanelRightCloseIcon className="size-4"/>}
                                    </Button>
                                </div>
                            }
                        </div>

                        {/* Scroll container — fills remaining space */}
                        <div className="flex-1 overflow-y-auto min-h-0">
                            {/* Thread — min-h-full so composer is pushed to bottom even with little content */}
                            <div className="flex flex-col min-h-full">
                                {/* Scrollable content */}
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col gap-6 mx-auto max-w-3xl">
                                        <div className="flex flex-col gap-4">
                                            <div className="items-center flex gap-2">
                                                <div className="flex flex-1 gap-2 h-fit">
                                                    <div className="bg-neutral-100 rounded-sm p-2">
                                                        <BotIcon className="text-muted-foreground size-4" />
                                                    </div>
                                                    <h1 className="text-2xl font-semibold">
                                                        {agent?.configuration.name ?? 'Agent'}
                                                    </h1>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button
                                                        className={favorited ? 'text-yellow-400 hover:text-yellow-600' : ''}
                                                        onClick={() => setFavorited((f) => !f)}
                                                        size="icon-lg"
                                                        variant="ghost"
                                                    >
                                                        <StarIcon
                                                            className="size-4 transition-colors"
                                                            fill={favorited ? 'currentColor' : 'none'}
                                                        />
                                                    </Button>
                                                    <Button size="icon-lg" variant="ghost">
                                                        <EllipsisVerticalIcon className="text-muted-foreground size-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="border rounded-lg flex flex-col gap-4 p-4">
                                                <div className="items-center flex gap-2">
                                                    <div className="items-center flex flex-1 gap-2">
                                                        <CodeIcon className="size-4" />
                                                        <span className="text-sm">{agent?.configuration.name}</span>
                                                    </div>
                                                    <div className="gap-1">
                                                        <Button
                                                            className="[&[data-state=active]]:bg-neutral-100 [&[data-state=active]]:text-foreground"
                                                            data-state={view === 'preview' ? 'active' : 'inactive'}
                                                            onClick={() => setView('preview')}
                                                            size="sm"
                                                            variant="ghost"
                                                        >
                                                            Preview
                                                        </Button>
                                                        <Button
                                                            className="[&[data-state=active]]:bg-neutral-100 [&[data-state=active]]:text-foreground"
                                                            data-state={view === 'markdown' ? 'active' : 'inactive'}
                                                            onClick={() => setView('markdown')}
                                                            size="sm"
                                                            variant="ghost"
                                                        >
                                                            Markdown
                                                        </Button>
                                                    </div>
                                                </div>
                                                {view === 'preview' ? (
                                                    <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none px-4 py-4">
                                                        <ReactMarkdown
                                                            components={{
                                                                h1: ({ children }) => <h1 className="text-lg font-semibold mb-4">{children}</h1>,
                                                                h2: ({ children }) => <h2 className="text-base font-semibold mb-3">{children}</h2>,
                                                                hr: ({ }) => <hr className="my-6!" />,
                                                            }}
                                                        >
                                                            {agent?.markdown ?? ''}
                                                        </ReactMarkdown>
                                                    </div>
                                                ) : (
                                                    <CodeBlock className="border-none rounded-none" language="markdown">{agent?.markdown ?? ''}</CodeBlock>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sticky composer — always visible at the bottom of the scroll container */}
                                <div className="sticky bottom-0 bg-background">
                                    <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                                    <div className="max-w-3xl mx-auto px-6 pb-6">
                                        <Chatbox placeholder="Message agent…" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>

                    {configOpen &&
                        <div aria-label="Configuration panel" className="border-l flex flex-col min-w-100">
                            <div className="items-center border-b flex gap-2 pl-3 pr-2 py-2">
                                <span className="flex-1 text-sm font-medium">
                                    Configuration
                                </span> 
                                <Button
                                    onClick={() => setConfigOpen(false)}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <XIcon className="size-4" />
                                </Button>
                            </div>
                            <div aria-label="Configuration form" className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
                                <Field>
                                    <FieldTitle>Name</FieldTitle>
                                    <Input placeholder="Agent name" />
                                </Field>
                                <Field>
                                    <FieldTitle>Instructions</FieldTitle>
                                    <Textarea placeholder="Describe what this agent should do…" rows={4} />
                                </Field>
                                <Field>
                                    <FieldTitle>Scope</FieldTitle>
                                    <div className="rounded-lg border">
                                        <Combobox multiple>
                                            <ComboboxChips className="rounded-b-none border-0 focus-within:border-0 focus-within:ring-0">
                                                <ComboboxChipsInput placeholder="Search jobs, tags, or people…" />
                                            </ComboboxChips>
                                            <ComboboxContent align="start" sideOffset={4}>
                                                <ComboboxList>
                                                    <ComboboxGroup className="p-1">
                                                        <ComboboxLabel>Recents</ComboboxLabel>
                                                        <ComboboxItem>etl_sales_daily</ComboboxItem>
                                                        <ComboboxItem>domain</ComboboxItem>
                                                        <ComboboxItem>etl_marketing_events</ComboboxItem>
                                                        <ComboboxItem>report_customer_360</ComboboxItem>
                                                        <ComboboxItem>env</ComboboxItem>
                                                    </ComboboxGroup>
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        <Separator />
                                        <div className="flex gap-1 p-1.5">
                                            <Button
                                                className="rounded-sm"
                                                size="sm"
                                                variant="outline"
                                            >
                                                Jobs
                                            </Button>
                                            <Button
                                                className="rounded-sm"
                                                size="sm"
                                                variant="outline"
                                            >
                                                Tags
                                            </Button>
                                            <Button
                                                className="rounded-sm"
                                                size="sm"
                                                variant="outline"
                                            >
                                                Owned by
                                            </Button>
                                        </div>
                                    </div>
                                </Field>
                                <Field>
                                    <FieldTitle>Run as</FieldTitle>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select principal…" />
                                        </SelectTrigger>
                                        <SelectContent></SelectContent>
                                    </Select>
                                </Field>
                            </div>
                        </div>
                    }
                </ResizablePanelGroup>
            </ApplicationContent>
        </ApplicationShell>
    )
}

export default Page
