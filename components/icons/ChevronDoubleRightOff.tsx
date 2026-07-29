import { forwardRef } from "react"

/** use:action expand disabled | can't expand further */
const ChevronDoubleRightOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m2.5 1.5 12 12-1 1-3.47-3.47-.97.97L8 10.94l.97-.97-.94-.94L5.06 12 4 10.94l2.97-2.97L1.5 2.5zM13.09 7.97l-1 1-4.03-4.03 1-1z"
      />
    </svg>
  )
)
ChevronDoubleRightOff.displayName = "ChevronDoubleRightOff"
export { ChevronDoubleRightOff }
