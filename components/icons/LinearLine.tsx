import { forwardRef } from "react"

/** use:object Linear interpolation | AI/BI | straight line chart, trend */
const LinearLine = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M14.5 2a1.5 1.5 0 0 1 .09 2.995L12.25 9.673a1.5 1.5 0 1 1-2.729.572L5.517 6.906q-.203.075-.427.09L2.75 11.672a1.5 1.5 0 1 1-1.342-.669l2.34-4.678a1.5 1.5 0 1 1 2.729-.572l4.004 3.339q.202-.075.426-.09l2.34-4.677A1.5 1.5 0 0 1 14.5 2"
      />
    </svg>
  )
)
LinearLine.displayName = "LinearLine"
export { LinearLine }
