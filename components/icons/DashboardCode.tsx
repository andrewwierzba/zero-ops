import { forwardRef } from "react"

/** use:object Code dashboard | AI/BI | programmatic dashboard */
const DashboardCode = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M10.53 11.03 8.56 13l1.97 1.97-1.06 1.06L6.44 13l3.03-3.03zM16.06 13l-3.03 3.03-1.06-1.06L13.94 13l-1.97-1.97 1.06-1.06z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.25 1a.75.75 0 0 1 .75.75V8.5h-1.5V7H8.75v1.5h-1.5v-6H2.5V9H7l-1.5 1.5h-3v3H5V15H1.75a.75.75 0 0 1-.75-.75V1.75A.75.75 0 0 1 1.75 1zm-5.5 4.5h4.75v-3H8.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
DashboardCode.displayName = "DashboardCode"
export { DashboardCode }
