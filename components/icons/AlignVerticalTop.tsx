import { forwardRef } from "react"

/** use:action align top | snap to top, vertical align */
const AlignVerticalTop = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m4.47 7.47 1.06 1.06 1.72-1.72V15h1.5V6.81l1.72 1.72 1.06-1.06L8 3.94zM1 1v1.5h14V1z"
      />
    </svg>
  )
)
AlignVerticalTop.displayName = "AlignVerticalTop"
export { AlignVerticalTop }
