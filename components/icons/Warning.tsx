import { forwardRef } from "react"

/** use:component warning | In Component | caution, !, alert, attention */
const Warning = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7.25 10V6.5h1.5V10zM8 12.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0 1.5" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1a.75.75 0 0 1 .649.374l7.25 12.5A.75.75 0 0 1 15.25 15H.75a.75.75 0 0 1-.649-1.126l7.25-12.5A.75.75 0 0 1 8 1m0 2.245L2.052 13.5h11.896z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Warning.displayName = "Warning"
export { Warning }
