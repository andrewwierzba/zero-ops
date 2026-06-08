'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

import { ChevronDownIcon, ChevronRightIcon, FileIcon } from '@databricks/design-system'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export function PreviewContent({ children, className }: { children?: React.ReactNode; className?: string }) {
    return (
        <CollapsibleContent className={cn("border-t px-3 py-2", className)}>
            {children}
        </CollapsibleContent>
    )
}

export function PreviewTrigger({ children, open }: { children?: React.ReactNode; open: boolean }) {
    return (
        <CollapsibleTrigger className="items-center flex gap-2 px-2 py-2 w-full">
            {children}

            { open
                ? <ChevronDownIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
                : <ChevronRightIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
            }
        </CollapsibleTrigger>
    )
}

export function Preview({
    children,
    className,
    onOpenChange,
    open,
}: {
    children: React.ReactNode
    className?: string
    icon?: typeof FileIcon
    onOpenChange: (open: boolean) => void
    open: boolean
}) {
    return (
        <Collapsible
            className={cn("bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border rounded-lg text-[13px] overflow-hidden", className)}
            onOpenChange={onOpenChange}
            open={open}
        >
            {children}
        </Collapsible>
    )
}
