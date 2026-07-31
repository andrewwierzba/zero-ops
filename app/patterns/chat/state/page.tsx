'use client'

import { useState } from 'react'

import { State, StateContent, StateHead, StateItem } from '@/components/app/state'

import { ChevronDown } from '@/components/icons/ChevronDown'
import { ChevronRight } from '@/components/icons/ChevronRight'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Page() {
    const [stateIsOpen, setStateIsOpen] = useState(true)

    const tabs = ['default', 'dubois'] as const

    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">State</h1>

            <Tabs defaultValue="default">
                <TabsList variant="line">
                    <TabsTrigger value="default">Default</TabsTrigger>
                    <TabsTrigger value="dubois">DuBois</TabsTrigger>
                </TabsList>

                {tabs.map((tab) =>
                    <TabsContent key={tab} value={tab}>
                        <div className="border rounded-4xl flex flex-col gap-4 p-4">
                            <State className={`gap-1 ${tab === 'dubois' && "bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-[16px]"}`}>
                                <StateHead className={`flex-row p-1 ${tab === 'dubois' && "px-3 py-1"}`} onClick={() => setStateIsOpen(!stateIsOpen)}>
                                    <div className="items-center flex flex-1 flex-row gap-2">
                                        {stateIsOpen ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                        <span>2 Files</span>
                                    </div>
                                    <Button
                                        className={`${tab === 'dubois' && 'rounded-[4px]'}`}
                                        size="sm"
                                        variant="outline"
                                    >
                                        Review
                                    </Button>
                                </StateHead>
                                {stateIsOpen && (
                                    <StateContent className="px-1">
                                        <StateItem className="flex-row" title="users.py">
                                            <span className="flex-1">File-1.txt</span>
                                            <div className="flex flex-row gap-1">
                                                <span className="text-green-600">+2</span>
                                                <span className="text-red-600">-1</span>
                                            </div>
                                        </StateItem>
                                        <StateItem className="flex-row" title="auth.py">
                                            <span className="flex-1">File-2.txt</span>
                                            <div className="flex flex-row gap-1">
                                                <span className="text-green-600">+2</span>
                                                <span className="text-red-600">-1</span>
                                            </div>
                                        </StateItem>
                                    </StateContent>
                                )}
                            </State>
                        </div>
                    </TabsContent>
                )}
            </Tabs>
        </div>
    )
}

export default Page
