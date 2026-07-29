import { forwardRef } from "react"

/** use:action position bottom | align bottom, dock bottom */
const PositionBottom = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 10v2H4v-2z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.25 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V1.75A.75.75 0 0 1 1.75 1zM2.5 13.5h11v-11h-11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PositionBottom.displayName = "PositionBottom"
export { PositionBottom }
