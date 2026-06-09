import { forwardRef } from "react"

/** use:component open menu | expand, dropdown */
const ChevronDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 8.917 10.947 6 12 7.042 8 11 4 7.042 5.053 6z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ChevronDown.displayName = "ChevronDown"
export { ChevronDown }
