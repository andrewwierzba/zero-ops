import { forwardRef } from "react"

/** use:object Timestamp | Data Type | scheduled time, deadline, timed event */
const CalendarClock = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 0v2H1.75a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75H6v-1.5H2.5V7H15V2.75a.75.75 0 0 0-.75-.75H11.5V0H10v2H6V0zm9 5.5v-2h-11v2z"
      clipRule="evenodd"
      />
      <path fill="currentColor" d="M10.25 10.5V12c0 .199.079.39.22.53l1 1 1.06-1.06-.78-.78V10.5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
      clipRule="evenodd"
      />
    </svg>
  )
)
CalendarClock.displayName = "CalendarClock"
export { CalendarClock }
