import { forwardRef } from "react"

/** use:action align middle | center vertically, vertical align */
const AlignVerticalCenter = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m11.53 12.97-1.06 1.06-1.72-1.72V16h-1.5v-3.69l-1.72 1.72-1.06-1.06L8 9.44zM15 8.75H1v-1.5h14zM8.75 3.69l1.72-1.72 1.06 1.06L8 6.56 4.47 3.03l1.06-1.06 1.72 1.72V0h1.5z"
      />
    </svg>
  )
)
AlignVerticalCenter.displayName = "AlignVerticalCenter"
export { AlignVerticalCenter }
