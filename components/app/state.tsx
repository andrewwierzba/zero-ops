import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stateVariants = cva(
    "flex flex-col gap-2",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface StateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stateVariants> {}

function State({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('bg-neutral-100 dark:bg-neutral-800 rounded-xl flex flex-col gap-2 p-0.5', className)} {...props} />
    )
}

function StateContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col gap-1 pb-1', className)} {...props} />
    )
}

function StateHead({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col gap-2', className)} {...props} />
    )
}

function StateItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('hover:bg-black/5 dark:hover:bg-white/5 rounded-md flex flex-col gap-2 p-2', className)} {...props} />
    )
}

export { State, StateContent, StateHead, StateItem, type StateProps };