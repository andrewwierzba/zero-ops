import { forwardRef } from "react"

/** use:indicator denied | blocked, forbidden, not allowed, prohibited */
const No = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.5 8a6.5 6.5 0 0 1 10.535-5.096l-9.131 9.131A6.47 6.47 0 0 1 1.5 8m2.465 5.096a6.5 6.5 0 0 0 9.131-9.131z"
      clipRule="evenodd"
      />
    </svg>
  )
)
No.displayName = "No"
export { No }
