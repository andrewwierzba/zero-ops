import { forwardRef } from "react"

/** use:object Temporary credential | Unity Catalog | time-limited key, expiring token */
const ClockKey = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 1.5a6.5 6.5 0 0 0-5.07 10.57l-1.065 1.065A8 8 0 1 1 15.418 11h-1.65A6.5 6.5 0 0 0 8 1.5"
      />
      <path fill="currentColor" d="M7.25 8V4h1.5v3.25H11v1.5H8A.75.75 0 0 1 7.25 8" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4 13a3 3 0 0 1 5.959-.5h4.291a.75.75 0 0 1 .75.75V16h-1.5v-2h-1v2H11v-2H9.83A3.001 3.001 0 0 1 4 13m3-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      clipRule="evenodd"
      />
    </svg>
  )
)
ClockKey.displayName = "ClockKey"
export { ClockKey }
