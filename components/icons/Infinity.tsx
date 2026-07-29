import { forwardRef } from "react"

/** use:indicator unlimited | infinite, no limit, unbounded */
const Infinity = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="m8 6.94 1.59-1.592a3.75 3.75 0 1 1 0 5.304L8 9.06l-1.591 1.59a3.75 3.75 0 1 1 0-5.303zm2.652-.531a2.25 2.25 0 1 1 0 3.182L9.06 8zM6.939 8 5.35 6.409a2.25 2.25 0 1 0 0 3.182l1.588-1.589z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Infinity.displayName = "Infinity"
export { Infinity }
