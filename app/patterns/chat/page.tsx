'use client'

import { useState } from 'react'

import { Bubble, BubbleContent, BubbleGroup } from '@/components/app/bubble'
import { Chatbox } from '@/components/app/chatbox'
import { CodeBlock } from '@/components/app/code-block'
import { State, StateContent, StateHead, StateItem } from '@/components/app/state'

import { ChevronDown } from '@/components/icons/ChevronDown'
import { ChevronRight } from '@/components/icons/ChevronRight'

import { Button } from '@/components/ui/button'

function Page() {
    const [state, setState] = useState(true)
    const [stateIsOpen, setStateIsOpen] = useState(true)

    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Chat</h1>
            <div className="border rounded-4xl flex flex-col gap-2 p-4">
                <BubbleGroup>
                    <Bubble align="end">
                        <BubbleContent>
                            Write a SQL query for top customers by revenue this quarter.
                        </BubbleContent>
                    </Bubble>
                </BubbleGroup>
                <BubbleGroup>
                    <Bubble align="start" variant="secondary">
                        <BubbleContent>
                            Aggregate orders for the current quarter, then rank by total
                            revenue:
                        </BubbleContent>
                    </Bubble>
                    <CodeBlock language="sql">
                        {`SELECT
    customer_id,
    SUM(amount) AS revenue
FROM main.sales.orders
WHERE order_date >= DATE_TRUNC('QUARTER', CURRENT_DATE())
GROUP BY customer_id
ORDER BY revenue DESC
LIMIT 10`}
                    </CodeBlock>
                </BubbleGroup>

                {state ? (
                    <State className="gap-1">
                        {stateIsOpen ? ( 
                            <>
                                <StateHead className="flex-row p-1" onClick={() => setStateIsOpen(false)}>
                                    <div className="items-center flex flex-1 flex-row gap-2">
                                        <ChevronDown className="h-4 w-4" />
                                        <span>1 File</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        Review
                                    </Button>
                                </StateHead>
                                <StateContent className="px-1">
                                    <StateItem className="flex-row" title="File-1.txt">
                                        <span>File-1.txt</span>
                                        <div className="flex flex-row gap-1">
                                            <span className="text-green-600">+2</span>
                                            <span className="text-red-600">-1</span>
                                        </div>
                                    </StateItem>
                                </StateContent>
                            </>
                        ) : (
                            <StateHead className="flex-row p-1" onClick={() => setStateIsOpen(true)}>
                                <div className="items-center flex flex-1 flex-row gap-2">
                                    <ChevronRight className="h-4 w-4" />
                                    <span>State</span>
                                </div>
                                <Button size="sm" variant="outline">
                                    Review
                                </Button>
                            </StateHead>
                        )}
                        <Chatbox model="GPT-5.6 Sol Medium" />
                    </State>
                ) : (
                    <Chatbox model="GPT-5.6 Sol Medium" />
                )}
            </div>
        </div>
    )
}

export default Page
