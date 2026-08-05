import { ArrowUpIcon, ChevronDownIcon, MicIcon, PlusIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

import { Stop } from '@/components/icons/Stop'

import { Button } from '@/components/ui/button'

export function Chatbox({ className, isRunning = false, mode = "Agent", model = "claude-4.6-sonnet-medium", onStop, onSubmit, placeholder = "Plan, @ for context, / for commands", showModelSelection = true, ...props }: Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> & {
    className?: string,
    isRunning?: boolean,
    mode?: string,
    model?: string,
    onStop?: () => void,
    onSubmit?: (prompt: string) => void,
    placeholder?: string,
    showModelSelection?: boolean
}) {
    const [isEmpty, setIsEmpty] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    function submit() {
        const el = editorRef.current;
        if (!el) return;
        const text = el.textContent?.trim();
        if (!text) return;
        onSubmit?.(text);
        el.innerHTML = '';
        setIsEmpty(true);
    }

    return (
        <div className="flex flex-col gap-1.5">
            <div
                aria-label="chatbox"
                className={cn(
                    "bg-background border rounded-xl shadow-lg flex flex-col text-sm gap-3 max-h-full p-4",
                    isFocused ? "border-neutral-300 dark:border-neutral-700" : "border-neutral-200 dark:border-neutral-800",
                    className
                )}
                {...props}
            >
                <div
                    aria-invalid="false"
                    aria-label="chatbox-prompt"
                    aria-multiline="true"
                    aria-required="false"
                    className={cn(
                        "text-neutral-700 dark:text-neutral-200 focus:outline-none break-words whitespace-break-spaces",
                        isEmpty && "before:text-neutral-500 dark:before:text-neutral-400 before:content-[attr(data-placeholder)]"
                    )}
                    contentEditable="true"
                    data-placeholder={placeholder}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    onInput={(e) => {
                        const el = e.currentTarget;
                        const empty = el.textContent?.trim() === '';
                        if (empty) el.innerHTML = '';
                        setIsEmpty(empty);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                        }
                    }}
                    ref={editorRef}
                    role="textbox"
                    tabIndex={0}
                    translate="no"
                />
                <div className="flex gap-2 justify-between">
                    <div className="flex gap-1 min-w-0">
                        <Button
                            aria-label="add-attachment"
                            size="icon"
                            variant="ghost"
                        >
                            <PlusIcon />
                        </Button>
                        <Button
                            aria-label="select mode"
                            className="min-w-0 shrink"
                            variant="ghost"
                        >
                            <span className="truncate">{mode}</span>
                            <ChevronDownIcon />
                        </Button>
                    </div>
                    <div className="flex gap-1 min-w-0">
                        {showModelSelection && (
                            <Button
                                aria-label="select-model"
                                className="min-w-0 shrink"
                                variant="ghost"
                            >
                                <span className="truncate">{model}</span>
                                <ChevronDownIcon />
                            </Button>
                        )}

                        {
                            isRunning ? (
                                <Button
                                    aria-label="stop"
                                    className="rounded-full"
                                    onClick={onStop}
                                    size="icon"
                                >
                                    <Stop />
                                </Button>
                            ) : isFocused ? (
                                <Button
                                    aria-label="send"
                                    className="rounded-full"
                                    onClick={submit}
                                    size="icon"
                                >
                                    <ArrowUpIcon />
                                </Button>
                            ) : (
                                <Button
                                    aria-label="record"
                                    className="rounded-full"
                                    size="icon"
                                >
                                    <MicIcon />
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
            <p aria-label="chatbox-disclosure" className="text-[11px] text-muted-foreground text-center">
                Always review the accuracy of responses.
            </p>
        </div>
    );
}
