import { forwardRef } from "react"

/** use:object Temporal table | Unity Catalog | time travel, table history */
const TableClock = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.75 4.31 1.72 1.72 1.06-1.06-1.28-1.28V9.5h-1.5z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.327 1.004A.75.75 0 0 1 15 1.75V7H6.5v8H1.75a.75.75 0 0 1-.75-.75V1.75l.004-.077A.75.75 0 0 1 1.75 1h12.5zM2.5 13.5H5V7H2.5zm0-8h11v-3h-11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
TableClock.displayName = "TableClock"
export { TableClock }
