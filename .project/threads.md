# Threads

## Postgres database example

| Column         | Description        | Type          | Default value | Foreign keys | Primary key | Allow nullable | Unique  |
| -------------- | ------------------ | ------------- | ------------- | ------------ | ----------- | -------------- | ------- |
| `id`           |                    | `uuid`        |               |              | `true`      | `false`        | `true`  |
| `user_id`      |                    | `uuid`        | `null`        | `users.id`   | `false`     | `false`        | `true`  |
| `archived_at`  | Archived timestamp | `timestamptz` |               |              | `false`     | `true`         | `false` |
| `created_at`   | Creation timestamp | `timestamptz` | `now()`       |              | `false`     | `false`        | `false` |
| `updated_at`   | Last update        | `timestamptz` | `now()`       |              | `false`     | `false`        | `false` |
| `deleted_at`   | Deletion timestamp | `timestamptz` |               |              | `false`     | `true`         | `false` |

## Thread.ts example

```ts
export type Thread = {
  id: string;           // uuid, primary key, unique, required
  user_id: string;      // uuid, foreign key → users.id, unique, required
  archived_at?: string; // timestamptz, nullable
  created_at: string;   // timestamptz, defaults to now()
  updated_at: string;   // timestamptz, defaults to now()
  deleted_at?: string;  // timestamptz, nullable
};
```
