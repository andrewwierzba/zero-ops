import { forwardRef } from "react"

/** use:action dock panel | attach panel, pin sidebar */
const PanelDocked = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75H14.3a.7.7 0 0 0 .7-.7V1.75a.75.75 0 0 0-.75-.75zM8 13.5V8.7a.7.7 0 0 1 .7-.7h4.8V2.5h-11v11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PanelDocked.displayName = "PanelDocked"
export { PanelDocked }
