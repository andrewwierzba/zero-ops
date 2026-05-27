import { ThreadsProvider } from '@/components/app/threads-context'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ThreadsProvider>{children}</ThreadsProvider>
}
