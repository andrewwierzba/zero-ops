import { forwardRef } from "react"

/** use:component collapse | collapse, close menu, fold */
const ChevronUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 7.083 5.053 10 4 8.958 8 5l4 3.958L10.947 10z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ChevronUp.displayName = "ChevronUp"
export { ChevronUp }
