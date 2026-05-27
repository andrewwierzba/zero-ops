# Genie Autopilot Chat Experience

Genie chat is the primary interface for creating and managing threads. The interface is composed of a collapsible threads panel (left) and a chat or contents panel (right).

**ASCII diagram:**
```
┌──────────────────────────────────────────────────┐
│ Threads [←] | Thread / Configuration / Inbox     │
└──────────────────────────────────────────────────┘
```

## Routes

| Route                                 | Description                    |
| ------------------------------------- | ------------------------------ |
| `/c`                                  | All threads                    |
| `/c?filter-id={filterId}`             | Apply a saved filter           |
| `/c?sort-id={sortId}`                 | Apply a sort order             |
| `/c/configure`                        | Configuration home             |
| `/c/configure/automations`            | Manage automations             |
| `/c/connections`                      | Manage connections             |
| `/c/tools`                            | Manage tools                   |
| `/c/inbox`                            | Inbox view                     |
| `/c/inbox?search-id={incidentId}`     | Search for a specific incident |
| `/c/{uuid}`                           | Open a specific thread         |

## The treads panel

The threads panel lists all threads.

### Actions

| Action     | Description                                     |
| ---------- | ----------------------------------------------- |
| New thread | Start a new thread                              |
| Search     | Search all threads                              |
| Configure  | Manage connections, tools, and automations      |
| Inbox      | Scoped view of incident or insight threads only |
| Recents    | All recent threads                              |

**ASCII diagram:**
```
┌─────────────────────────┐
│ Threads             [←] │
├─────────────────────────┤
│ New thread              │
├─────────────────────────┤
│ Search                  │
├─────────────────────────┤
│ Configure               │
├─────────────────────────┤
│ Inbox                   │
├─────────────────────────┤
│ Recents [Filter | Sort] │
│ Thread C      [Archive] │
│ Thread B      [Archive] │
│ Thread A      [Archive] │
└─────────────────────────┘
```

## Notes

- Threads is the canonical store for all conversations — incidents and insights are threads and can be accessed from either the threads list or the inbox view.
- The inbox view is a scoped filter that excludes non-incident or non-insight threads.
- Apply filters like all or incidents and insights, or sort by date created or date updated.

## References

**Reference guides:**
- `threads.md` - Threads
