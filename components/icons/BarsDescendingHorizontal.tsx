import { forwardRef } from "react"

/** use:action sort descending | high to low, decreasing */
const BarsDescendingHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12.75 9v6h-1.5V9zM4.75 1v14h-1.5V1zM7.25 15V5h1.5v10z" />
    </svg>
  )
)
BarsDescendingHorizontal.displayName = "BarsDescendingHorizontal"
export { BarsDescendingHorizontal }
