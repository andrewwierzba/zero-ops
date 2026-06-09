import { forwardRef } from "react"

/** use:action app grid | modules, app gallery */
const App = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.75 1a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M8 1a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 8 1m5.25 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M2.75 6.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5.25 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5.25 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M2.75 11.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5.25 0A1.75 1.75 0 1 0 8 15a1.75 1.75 0 0 0 0-3.5m5.25 0a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
App.displayName = "App"
export { App }
