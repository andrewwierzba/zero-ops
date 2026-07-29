import { forwardRef } from "react"

/** use:object Pie chart | AI/BI | donut, proportion, percentage chart */
const PieChart = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75A6.75 6.75 0 0 0 9.25 0M10 1.553A5.25 5.25 0 0 1 14.447 6H10z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.75 2.5a6.75 6.75 0 1 0 6.75 6.75.75.75 0 0 0-.75-.75H7.5V3.25a.75.75 0 0 0-.75-.75M1.5 9.25A5.25 5.25 0 0 1 6 4.053V9.25c0 .414.336.75.75.75h5.197A5.251 5.251 0 0 1 1.5 9.25"
      clipRule="evenodd"
      />
    </svg>
  )
)
PieChart.displayName = "PieChart"
export { PieChart }
