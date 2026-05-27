import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const boxVariants = cva(
    "bg-(--gray-100) border border-(--gray-200) rounded-sm",
    {
        variants: {
            size: {
                sm: "h-4 w-4",
                default: "h-6 w-6",
                lg: "h-8 w-8",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {}

function Box({
    className,
    size,
    ...props
}: BoxProps) {
    return (
        <div
            aria-label="box"
            className={cn(boxVariants({ size, className }))}
            {...props}
        />
    )
};

export { Box, type BoxProps };
