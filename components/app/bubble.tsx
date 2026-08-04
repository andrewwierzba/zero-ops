import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bubbleVariants = cva(
    "rounded-3xl px-3 py-2 w-fit data-[align=end]:self-end data-[align=start]:self-start ",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white",
                secondary: "bg-neutral-100 dark:bg-neutral-800",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bubbleVariants> {}

function Bubble({
    align,
    className,
    variant,
    ...props
}: BubbleProps & {
    align?: "end" | "start"
}) {
    return (
        <div
            aria-label="box"
            data-align={align}
            data-variant={variant}
            className={cn(bubbleVariants({ variant, className }))}
            {...props}
        />
    )
};

function BubbleContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            aria-label="bubble-content"
            className={cn("max-w-full min-w-0 w-fit", className)}
            {...props}
        />
    )
}

function BubbleGroup({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            aria-label="bubble-group"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    )
}

export { Bubble, BubbleContent, BubbleGroup, type BubbleProps };
