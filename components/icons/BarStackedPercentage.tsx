import { forwardRef } from "react"

/** use:object Percentage bar chart | AI/BI | 100% stacked, proportional */
const BarStackedPercentage = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75V1.75a.75.75 0 0 0-.75-.75zM9 8.5v5H7v-5zM9 7V2.5H7V7zm3.5 6.5h-2v-1.75h2zm-2-11v7.75h2V2.5zm-5 0h-2v7.75h2zm0 11v-1.75h-2v1.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
BarStackedPercentage.displayName = "BarStackedPercentage"
export { BarStackedPercentage }
