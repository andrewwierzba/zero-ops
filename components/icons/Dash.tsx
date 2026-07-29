import { forwardRef } from "react"

/** use:component remove | minus, subtract, separator */
const Dash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" fillRule="evenodd" d="M15 8.75H1v-1.5h14z" clipRule="evenodd" />
    </svg>
  )
)
Dash.displayName = "Dash"
export { Dash }
