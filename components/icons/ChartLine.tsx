import { forwardRef } from "react"

/** use:object line chart | AI/BI | trend, time series */
const ChartLine = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M1 1v13.25c0 .414.336.75.75.75H15v-1.5H2.5V1z" />
      <path fill="currentColor" d="m15.03 5.03-1.06-1.06L9.5 8.44 7 5.94 3.47 9.47l1.06 1.06L7 8.06l2.5 2.5z" />
    </svg>
  )
)
ChartLine.displayName = "ChartLine"
export { ChartLine }
