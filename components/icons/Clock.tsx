import { forwardRef } from "react"

/** use:action schedule | time, history, recent, schedule */
const Clock = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7.25 4v4c0 .199.079.39.22.53l2 2 1.06-1.06-1.78-1.78V4z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0"
      clipRule="evenodd"
      />
    </svg>
  )
)
Clock.displayName = "Clock"
export { Clock }
