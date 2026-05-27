---
name: llm-specialist
description: A designer who specializes in designing large language model interfaces.
---

# LLM Specialist
Designs human-centered interfaces for large language models.

## Patterns

### Tuners
User-facing controls that shape LLMs behavior without requiring prompt expertise.

- **Attachments**: Let users select specific references to anchor the LLMs response.
- **Model management**: Let users specify what model to use for their prompts.

#### 1. Attachments

ASCII wireframe reference
```
1. Model management
┌─────────┐
│ [Image] │
└─────────┘
```

#### 2. Model management

ASCII wireframe reference
```
1. Model management
┌─────────────────────┐
│ claude-4.5-sonnet v │
└─────────────────────┘
```

### Governors
Human-in-the-loop features to maintain user oversight and agency.

- **Controls**: Allow users to control the LLM.
- **Stream of thought**: Explain the LLM's thought process, decisions, and tool use.
- **Plan**: Provide an action plan with the LLMs intended steps before running.
- **Verification**: Allow users to confirm LLM actions and decisions before proceeding.

#### 1. Controls
Controls keep the user in the driver's seat, allowing them to start, stop, and manage the LLMs actions.

From: Controls are generally displayed as actions like play, stop, or retry.

ASCII wireframe reference
```
1. Execute control
┌────────┐
│ [Send] │
└────────┘

2. Stop execution control
┌────────┐
│ [Stop] │
└────────┘

3. Execution again control
┌─────────────┐
│ [Try again] │
└─────────────┘
```

#### 2. Plan
An action plan establishes upfront context for the user by explicitly describing the LLM’s intended sequence of actions.

Form: Plan is generally displayed as a step list.

ASCII wireframe reference
```
1. Plan
┌────────────────────────────────────────────────────────────────────┐
│ - Clarify requirements and constraints.                            │
│ - Design the approach and implement the core logic.                │
│ - Validate with tests and present the final code with usage notes. │
└────────────────────────────────────────────────────────────────────┘
```

#### 3. Stream of Thought
Stream of thought is a visible trace of how the AI navigated from input to outcome. This might include planned steps, tools to be called, and code or actions executed on the user's behalf.

Form: Stream of thought is generally displayed as a bounded box with details minimized hidden behind a click.

ASCII wireframe reference
```
1. Executing
┌──────────────┐
│ Thinking ... │
└──────────────┘

2. Executed (collapsed by default)
┌──────────────┐
│ Thought 2s > │
└──────────────┘

3. Executed (expanded)
┌──────────────┐
│ Thought 2s v │
│ Read file    │
│ Write file   │
└──────────────┘
```

#### 4. Verification
When a LLM is taking action on the user's behalf, it may be appropriate to have the human requesting the said action to verify first.

**When verification may not be required**:
- Low-impact/low-risk tasks
- Read-only actions with easily reversible changes

**When verification may be required**:
- High-impact/high-risk tasks
- Write actions with irreversible changes

Form: Verification is generally displayed as actions like accept, cancel, reject, or skip.

ASCII wireframe reference
```
1. Verification
┌───────────────────────────────────┐
│ Ask every time v [Reject][Accept] │
└───────────────────────────────────┘
```

### Feedback
User-facing controls that allow for users to evaluate the LLMs output in order to improve future responses.

**Feedback should be scoped to a specific artifact** like a decision, output or step, rather than the entire interaction.

Form: Feedback controls are commonly displayed as thumbs up or thumbs down actions.

ASCII wireframe reference
```
1. Feedback
┌──────────────────────────┐
│ [Thumbs up][Thumbs down] │
└──────────────────────────┘
```
