import { forwardRef } from "react"

/** use:action date range | date picker, period selector, timespan */
const CalendarRange = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" clipPath="url(#CalendarRangeIcon_svg__a)">
      <path
      fillRule="evenodd"
      d="M6 2h4V0h1.5v2h2.75a.75.75 0 0 1 .75.75V8.5h-1.5V7h-11v6.5H8V15H1.75a.75.75 0 0 1-.75-.75V2.75A.75.75 0 0 1 1.75 2H4.5V0H6zM2.5 5.5h11v-2h-11z"
      clipRule="evenodd"
      />
      <path d="M10.47 9.47 7.94 12l2.53 2.53 1.06-1.06-.72-.72h2.38l-.72.72 1.06 1.06L16.06 12l-2.53-2.53-1.06 1.06.72.72h-2.38l.72-.72z" />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
CalendarRange.displayName = "CalendarRange"
export { CalendarRange }
