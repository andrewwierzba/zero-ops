import { forwardRef } from "react"

/** use:action sort ascending | low to high, increasing */
const BarsAscendingHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M3.25 9v6h1.5V9zM11.25 1v14h1.5V1zM8.75 15V5h-1.5v10z" />
    </svg>
  )
)
BarsAscendingHorizontal.displayName = "BarsAscendingHorizontal"
export { BarsAscendingHorizontal }
