import { forwardRef } from "react"

/** use:object Scheduled event | Lakeflow | appointment, calendar item */
const CalendarEvent = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M8.5 10.25a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 2H6V0H4.5v2H1.75a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V2.75a.75.75 0 0 0-.75-.75H11.5V0H10zM2.5 3.5v2h11v-2zm0 10V7h11v6.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CalendarEvent.displayName = "CalendarEvent"
export { CalendarEvent }
