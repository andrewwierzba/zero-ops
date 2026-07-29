import { forwardRef } from "react"

/** use:action sort descending | high to low, decreasing */
const BarsDescendingVertical = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7 12.75H1v-1.5h6zM15 4.75H1v-1.5h14zM1 7.25h10v1.5H1z" />
    </svg>
  )
)
BarsDescendingVertical.displayName = "BarsDescendingVertical"
export { BarsDescendingVertical }
