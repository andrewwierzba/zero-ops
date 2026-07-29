import { forwardRef } from "react"

/** use:indicator expired | timed out, schedule off, no schedule */
const ClockOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 0a8 8 0 0 1 7.944 8.929 5.005 5.005 0 0 0-1.454-1.265A6.5 6.5 0 0 0 1.5 8a6.5 6.5 0 0 0 6.164 6.49 5 5 0 0 0 1.265 1.454A8 8 0 1 1 8 0"
      />
      <path fill="currentColor" d="M8.75 8a.75.75 0 0 1-.22.53l-2 2-1.06-1.06 1.78-1.78V3h1.5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2.94-1.125-1.126-1.06 1.061L10.94 12l-1.126 1.125 1.061 1.06L12 13.06l1.125 1.125 1.06-1.06L13.06 12l1.125-1.125-1.06-1.06z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ClockOff.displayName = "ClockOff"
export { ClockOff }
