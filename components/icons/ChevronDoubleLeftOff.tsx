import { forwardRef } from "react"

/** use:action collapse disabled | can't collapse further */
const ChevronDoubleLeftOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m2.5 1.5 12 12-1 1-7.47-7.47-.94.94 2.97 2.97L7 12 2.97 7.97l2-2L1.5 2.5zM12.06 5l-1.97 1.97-1.06-1.06L11 3.94z"
      />
    </svg>
  )
)
ChevronDoubleLeftOff.displayName = "ChevronDoubleLeftOff"
export { ChevronDoubleLeftOff }
