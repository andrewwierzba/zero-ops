import { forwardRef } from "react"

/** use:action sort ascending | low to high, increasing */
const BarsAscendingVertical = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7 3.25H1v1.5h6zM15 11.25H1v1.5h14zM1 8.75h10v-1.5H1z" />
    </svg>
  )
)
BarsAscendingVertical.displayName = "BarsAscendingVertical"
export { BarsAscendingVertical }
