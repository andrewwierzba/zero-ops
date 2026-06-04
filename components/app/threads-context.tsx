'use client'

import { createContext, useContext, useRef, useState } from 'react'

import { Agent, defaultAgents } from '@/data/agents'
import { defaultMessages, Message } from '@/data/messages'
import { normalizePrompt, scenarios, ScenarioStep } from '@/data/scenarios'
import { defaultThreads, Thread } from '@/data/threads'

export interface ThinkingStep {
    description: string
    detail?: string
    status: 'pending' | 'current' | 'completed'
}

export interface ThinkingState {
    steps?: ThinkingStep[]
}

interface ThreadsContextValue {
    addAgent: (agent: Agent) => void
    addMessage: (threadId: string, message: Message) => void
    addThread: (thread: Thread) => void
    agents: Agent[]
    messages: Record<string, Message[]>
    sendUserMessage: (threadId: string, content: string) => void
    setAgentActive: (agentId: string, active: boolean) => void
    thinking: Record<string, ThinkingState | null>
    threads: Thread[]
    updateAgentConfiguration: (
        agentId: string,
        updates: Partial<Pick<Agent['configuration'], 'scope' | 'run_as'>>
    ) => void
}

const ThreadsContext = createContext<ThreadsContextValue | null>(null)

function ThreadsProvider({ children }: { children: React.ReactNode }) {
    const [threads, setThreads] = useState<Thread[]>(
        [...defaultThreads].sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
    )
    const [agents, setAgents] = useState<Agent[]>([...defaultAgents])
    const [messages, setMessages] = useState<Record<string, Message[]>>(
        Object.fromEntries(defaultMessages.map(({ threadId, messages }) => [threadId, messages]))
    )
    const [thinking, setThinking] = useState<Record<string, ThinkingState | null>>({})

    // Track active timers so a future "stop" or thread reset could cancel them.
    const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({})

    // Mirror threads state so sendUserMessage can read scenario state even when
    // called in the same tick as addThread (before React commits the update).
    const threadsRef = useRef(threads)
    threadsRef.current = threads

    function setThreadsBoth(updater: (prev: Thread[]) => Thread[]) {
        const next = updater(threadsRef.current)
        threadsRef.current = next
        setThreads(next)
    }

    function addThread(thread: Thread) {
        setThreadsBoth((prev) => [thread, ...prev])
    }

    function addAgent(agent: Agent) {
        setAgents((prev) => [agent, ...prev])
    }

    function setAgentActive(agentId: string, active: boolean) {
        setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, active } : a)))
    }

    function updateAgentConfiguration(
        agentId: string,
        updates: Partial<Pick<Agent['configuration'], 'scope' | 'run_as'>>
    ) {
        const nowIso = new Date().toISOString()
        setAgents((prev) =>
            prev.map((a) =>
                a.id === agentId
                    ? {
                          ...a,
                          configuration: {
                              ...a.configuration,
                              ...updates,
                              updated_at: nowIso,
                          },
                      }
                    : a
            )
        )
    }

    function addMessage(threadId: string, message: Message) {
        setMessages((prev) => ({
            ...prev,
            [threadId]: [...(prev[threadId] ?? []), message],
        }))
    }

    function bumpScenarioCursor(threadId: string) {
        setThreadsBoth((prev) =>
            prev.map((t) =>
                t.id === threadId ? { ...t, scenario_cursor: (t.scenario_cursor ?? 0) + 1 } : t
            )
        )
    }

    /** Run a scripted step: progress its thought steps, then drop the agent reply. */
    function runScriptedStep(threadId: string, step: ScenarioStep) {
        const initialSteps: ThinkingStep[] | undefined = step.steps?.map((s, i) => ({
            description: s.description,
            detail: s.detail,
            status: i === 0 ? 'current' : 'pending',
        }))

        setThinking((prev) => ({ ...prev, [threadId]: { steps: initialSteps } }))

        const handles: ReturnType<typeof setTimeout>[] = []
        let elapsed = 0

        if (step.steps && step.steps.length > 0) {
            step.steps.forEach((s, i) => {
                elapsed += s.durationMs
                handles.push(
                    setTimeout(() => {
                        setThinking((prev) => {
                            const current = prev[threadId]
                            if (!current?.steps) return prev
                            const next = current.steps.map((cs, ci) => {
                                if (ci === i) return { ...cs, status: 'completed' as const }
                                if (ci === i + 1) return { ...cs, status: 'current' as const }
                                return cs
                            })
                            return { ...prev, [threadId]: { steps: next } }
                        })
                    }, elapsed)
                )
            })
        }

        const total = Math.max(elapsed, step.thoughtDurationMs)
        handles.push(
            setTimeout(() => {
                addMessage(threadId, {
                    actions: step.reply.actions,
                    content: step.reply.content,
                    created_at: new Date().toISOString(),
                    id: crypto.randomUUID(),
                    role: 'agent',
                    suggestions: step.reply.suggestions,
                    thought_duration_ms: total,
                })
                setThinking((prev) => ({ ...prev, [threadId]: null }))
                bumpScenarioCursor(threadId)
                timersRef.current[threadId] = []
            }, total)
        )

        timersRef.current[threadId] = handles
    }

    function sendUserMessage(threadId: string, content: string) {
        const trimmed = content.trim()
        if (!trimmed) return

        addMessage(threadId, {
            id: crypto.randomUUID(),
            role: 'user',
            content: trimmed,
            created_at: new Date().toISOString(),
        })

        const thread = threadsRef.current.find((t) => t.id === threadId)
        const scenario = thread?.scenario_id ? scenarios[thread.scenario_id] : undefined
        const cursor = thread?.scenario_cursor ?? 0
        const nextStep = scenario?.steps[cursor]

        if (nextStep && normalizePrompt(nextStep.promptMatch) === normalizePrompt(trimmed)) {
            runScriptedStep(threadId, nextStep)
        } else {
            // Off-script: stay in the thinking state indefinitely.
            setThinking((prev) => ({ ...prev, [threadId]: {} }))
        }
    }

    return (
        <ThreadsContext
            value={{
                addAgent,
                addMessage,
                addThread,
                agents,
                messages,
                sendUserMessage,
                setAgentActive,
                thinking,
                threads,
                updateAgentConfiguration,
            }}
        >
            {children}
        </ThreadsContext>
    )
}

function useThreads() {
    const ctx = useContext(ThreadsContext)
    if (!ctx) throw new Error('useThreads must be used within ThreadsProvider')
    return ctx
}

export { ThreadsProvider, useThreads }
