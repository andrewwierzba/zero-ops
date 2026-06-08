'use client'

// import { AppIcon, ChevronDownIcon, SearchIcon } from '@databricks/design-system'
import { ChevronDown, LayoutGrid, Search } from 'lucide-react'

import Image from 'next/image'
import { createContext, useContext, useState } from 'react'

import databricksLockupLight from '@/app/assets/primary-lockup-full-color-rgb.svg'
import databricksLockupDark from '@/app/assets/primary-lockup-full-color-white-rgb.svg'

import { PanelLeftCloseIcon } from '@/app/assets/icons/panel-left-close'
import { PanelLeftOpenIcon } from '@/app/assets/icons/panel-left-open'

import { Sidebar } from '@/components/app/sidebar'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { GenieCodeIcon } from '@/app/assets/icons/genie-code'

function ApplicationContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 min-h-0 min-w-0 pb-1 px-1">
            <div className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(235,235,235)] dark:border-[rgb(31,39,45)] border rounded-md flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

const genieGradient = 'linear-gradient(38deg, rgba(66,153,224,0.1) 23.5%, rgba(202,66,224,0.1) 47%, rgba(255,95,70,0.1) 76%)';

type SidebarOpenContextValue = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarOpenContext = createContext<SidebarOpenContextValue | null>(null)

function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    return (
        <SidebarOpenContext value={{ open, setOpen }}>
            {children}
        </SidebarOpenContext>
    )
}

function useSidebarOpen(): SidebarOpenContextValue {
    const ctx = useContext(SidebarOpenContext)
    const localState = useState(false)
    if (ctx) return ctx
    const [open, setOpen] = localState
    return { open, setOpen }
}

function ApplicationShell({ children }: { children: React.ReactNode }) {
    const { open: sideBarOpen, setOpen: setSidebarOpen } = useSidebarOpen();

    return (
        <div className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] flex flex-col h-screen overflow-hidden">
            <div aria-label="Application header" className="gap-2 grid grid-cols-4 justify-between p-2 shrink-0">
                <div className="items-center flex gap-2 col-span-1">
                    <Button
                        aria-label="toggle-panel-1"
                        className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)] group"
                        onClick={() => setSidebarOpen((o) => !o)}
                        size="icon"
                        variant="ghost"
                    >
                        {sideBarOpen ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
                    </Button>
                    <Image
                        alt="Databricks"
                        className="h-4 w-auto dark:hidden"
                        src={databricksLockupLight}
                    />
                    <Image
                        alt="Databricks"
                        className="h-4 w-auto hidden dark:block"
                        src={databricksLockupDark}
                    />
                </div>
                <div className="col-span-2">
                    <InputGroup className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] rounded-[4px] flex-1 justify-self-center max-w-140">
                        <InputGroupAddon align="inline-start">
                            <InputGroupText>
                                <Search
                                    className="size-4 text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput className="text-[13px] md:text-[13px] truncate" placeholder="Search data, notebooks, recents, and more..." />
                        <InputGroupAddon align="inline-end">
                            <InputGroupText className="gap-1">
                                <Kbd>⌘</Kbd>+<Kbd>P</Kbd>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div aria-label="Application actions" className="items-center flex gap-1 col-span-1 justify-end">
                    <div className="bg-[rgb(240,0,64)]/6 dark:bg-[rgb(240,0,64)]/10 rounded-[4px] text-[rgb(100,23,43)] dark:text-[rgb(254,210,255)] text-[13px] leading-[20px] px-1">
                        Production
                    </div>
                    <Button
                        aria-label="Open workspace switcher"
                        className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)] group max-w-50"
                        variant="ghost"
                    >
                        <span className="text-[13px] truncate">Workspace (eu-west-2)</span>
                        <ChevronDown className="size-4" />
                    </Button>
                    <Button
                        aria-label="Open Genie Code"
                        className="border-none rounded-[4px] group"
                        size="icon"
                        style={{ background: genieGradient }}
                        variant="ghost"
                    >
                        <GenieCodeIcon />
                    </Button>
                    <Button
                        aria-label="Open app switcher"
                        className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)] hover:text-[rgb(14,83,139)] dark:hover:text-[rgb(138,202,255)] group"
                        size="icon"
                        variant="ghost"
                    >
                        <LayoutGrid className="size-4" />
                    </Button>
                    <Button
                        aria-label="Open profile"
                        className="hover:bg-[rgb(34,114,180)]/8 dark:hover:bg-[rgb(143,205,255)]/8 rounded-[4px] group"
                        size="icon"
                        variant="ghost"
                    >
                        <Avatar size="sm">
                            <AvatarFallback className="bg-[rgb(138,99,191)] text-white">DB</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {sideBarOpen && <Sidebar />}
                {children}
            </div>
        </div>
    );
}

export { ApplicationShell, ApplicationContent, SidebarProvider }
