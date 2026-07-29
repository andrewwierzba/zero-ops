import { forwardRef } from "react"

/** use:action expand | show more, unfold, see details */
const ExpandMore = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m4 4.03 1.06 1.061 2.97-2.97L11 5.091l1.06-1.06L8.03 0zM12.06 12.091l-4.03 4.03L4 12.091l1.06-1.06L8.03 14 11 11.03z"
      />
    </svg>
  )
)
ExpandMore.displayName = "ExpandMore"
export { ExpandMore }
