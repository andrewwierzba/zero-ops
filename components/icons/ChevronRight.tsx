import { forwardRef } from "react"

/** use:component expand tree | forward, next, more */
const ChevronRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.917 8 6 5.053 7.042 4 11 8l-3.958 4L6 10.947z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ChevronRight.displayName = "ChevronRight"
export { ChevronRight }
