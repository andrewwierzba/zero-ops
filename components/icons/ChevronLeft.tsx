import { forwardRef } from "react"

/** use:component back | previous, navigate left */
const ChevronLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.083 8 10 10.947 8.958 12 5 8l3.958-4L10 5.053z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ChevronLeft.displayName = "ChevronLeft"
export { ChevronLeft }
