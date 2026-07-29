import { forwardRef } from "react"

/** use:action sort descending | high to low, Z-A */
const SortHorizontalDescending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.5 15V5H2v10zm8 0v-4H10v4zm-4-7v7H6V8zm7.03-2.97.53-.53-.53-.53-3.5-3.5-1.06 1.06 2.22 2.22H6v1.5h6.19L9.97 7.47l1.06 1.06z"
      clipRule="evenodd"
      />
    </svg>
  )
)
SortHorizontalDescending.displayName = "SortHorizontalDescending"
export { SortHorizontalDescending }
