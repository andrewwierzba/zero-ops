import { forwardRef } from "react"

/** use:action sort ascending | low to high, A-Z */
const SortHorizontalAscending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.47 5.03.94 4.5l.53-.53 3.5-3.5 1.06 1.06-2.22 2.22H10v1.5H3.81l2.22 2.22-1.06 1.06zM4.5 15v-4H6v4zm8 0V5H14v10zm-4-7v7H10V8z"
      clipRule="evenodd"
      />
    </svg>
  )
)
SortHorizontalAscending.displayName = "SortHorizontalAscending"
export { SortHorizontalAscending }
