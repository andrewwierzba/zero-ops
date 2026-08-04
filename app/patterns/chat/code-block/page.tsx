import { CodeBlock } from '@/components/app/code-block'

function Page() {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Code block</h1>

            <div className="border rounded-4xl flex flex-col gap-2 p-4">
                <CodeBlock className="bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)]" language="python">
                    {`def get_user(id):
        user = db.query(User).filter(User.id == id).first()
        if user is None:
            raise NotFound()
        return user`}
                </CodeBlock>
            </div>
        </div>
    )
}

export default Page
