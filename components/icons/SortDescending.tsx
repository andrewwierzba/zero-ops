import { forwardRef } from "react"

/** use:action sort descending | Z to A, high to low, sort down */
const SortDescending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 3.5h10V2H1zm0 8h4V10H1zm7-4H1V6h7zm3.5 7.56 4.03-4.03-1.06-1.06-2.22 2.22V6h-1.5v6.19L8.53 9.97l-1.06 1.06z"
      clipRule="evenodd"
      />
    </svg>
  )
)
SortDescending.displayName = "SortDescending"
export { SortDescending }
