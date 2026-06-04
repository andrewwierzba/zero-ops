'use client'

import { AppIcon, SearchIcon } from '@databricks/design-system'

import Image from 'next/image'
import { useState } from 'react'

import databricksLogo from '@/app/assets/databricks.png'

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
            <div className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] rounded-md flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

const genieGradient = 'linear-gradient(38deg, rgba(66,153,224,0.1) 23.5%, rgba(202,66,224,0.1) 47%, rgba(255,95,70,0.1) 76%)';

function ApplicationShell({ children }: { children: React.ReactNode }) {
    const [sideBarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] flex flex-col h-screen overflow-hidden">
            <div aria-label="Application header" className="items-center flex gap-2 justify-between p-2 shrink-0">
                <div className="items-center flex gap-2">
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
                        className="size-8"
                        src={databricksLogo}
                    />
                    <span className="font-medium text-sm">Databricks App</span>
                </div>
                <div className="flex-1">
                    <InputGroup className="bg-[rgb(255,255,255)] dark:bg-[rgb(17,23,28)] border-[rgb(203,203,203)] dark:border-[rgb(55,68,79)] rounded-[4px] flex-1 justify-self-center max-w-140">
                        <InputGroupAddon align="inline-start">
                            <InputGroupText>
                                <SearchIcon
                                    className="text-[rgb(111,111,111)] dark:text-[rgb(146,164,179)]"
                                    onPointerEnterCapture={() => {}}
                                    onPointerLeaveCapture={() => {}}
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
                <div aria-label="Application actions" className="items-center flex gap-1">
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
                        <AppIcon onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
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

export { ApplicationShell, ApplicationContent }
