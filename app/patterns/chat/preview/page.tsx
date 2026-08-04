'use client'

import { useState } from 'react'

import { DagIcon } from '@/lib/icons'

import { Preview, PreviewContent, PreviewTrigger } from '@/components/app/preview'

function Page() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Preview</h1>
            <Preview onOpenChange={setOpen} open={open}>
                <PreviewTrigger open={open}>
                    <span className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] rounded-sm inline-flex p-1">
                        <DagIcon
                            className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                        />
                    </span>
                    <span className="flex-1 text-left">Preview</span>
                </PreviewTrigger>
                <PreviewContent>
                    <span>PreviewContent</span>
                </PreviewContent>
            </Preview>
        </div>
    )
}

export default Page
