import { Bubble, BubbleContent, BubbleGroup } from '@/components/app/bubble'

function Page() {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-3xl w-full">
            <h1 className="text-3xl font-bold">Bubble</h1>

            <div className="border rounded-4xl flex flex-col gap-2 p-4">
                <BubbleGroup>
                    <Bubble align="end" className="bg-[rgb(240,248,255)] dark:bg-[rgb(4,53,93)] rounded-br-none text-default">
                        <BubbleContent>What is Genie Code?</BubbleContent>
                    </Bubble>
                </BubbleGroup>
                <BubbleGroup>
                    <Bubble
                        align="start"
                        className="bg-transparent dark:bg-transparent rounded-none px-0"
                        variant="secondary"
                    >
                        <BubbleContent>
                            Genie Code is Databricks&apos; AI assistant for data and AI workflows.
                            It helps you write, debug, and optimize code across notebooks, jobs, and
                            pipelines — all within your Databricks workspace.
                        </BubbleContent>
                    </Bubble>
                </BubbleGroup>
            </div>
        </div>
    )
}

export default Page
