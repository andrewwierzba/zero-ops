import { forwardRef } from "react"

/** use:object Metric | AI/BI | measure, KPI, metric definition */
const Measure = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.22.72a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-9.5 9.5a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06zm.53 1.59-8.44 8.44 2.94 2.94 1.314-1.315-1.47-1.47 1.061-1.06 1.47 1.47L8.939 10 7.47 8.53 8.53 7.47 10 8.94l1.314-1.315-1.47-1.47 1.061-1.06 1.47 1.47 1.314-1.315z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Measure.displayName = "Measure"
export { Measure }
