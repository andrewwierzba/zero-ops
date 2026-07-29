import { forwardRef } from "react"

/** use:object bar chart | AI/BI | trend, histogram, column chart */
const BarChart = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M1 1v13.25c0 .414.336.75.75.75H15v-1.5H2.5V1z" />
      <path fill="currentColor" d="M7 1v11h1.5V1zM10 5v7h1.5V5zM4 5v7h1.5V5zM13 12V8h1.5v4z" />
    </svg>
  )
)
BarChart.displayName = "BarChart"
export { BarChart }
