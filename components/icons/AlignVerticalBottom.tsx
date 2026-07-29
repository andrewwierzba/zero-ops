import { forwardRef } from "react"

/** use:action align bottom | snap to bottom, vertical align */
const AlignVerticalBottom = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M15 13.5V15H1v-1.5zM8.75 1v8.19l1.72-1.72 1.06 1.06L8 12.06 4.47 8.53l1.06-1.06 1.72 1.72V1z"
      />
    </svg>
  )
)
AlignVerticalBottom.displayName = "AlignVerticalBottom"
export { AlignVerticalBottom }
