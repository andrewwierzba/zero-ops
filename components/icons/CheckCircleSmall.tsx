import { forwardRef } from "react"

/** use:indicator success | complete, passed, check */
const CheckCircleSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 3.5c.873 0 1.687.25 2.377.68L9.271 5.285a3 3 0 1 0 1.523 1.629l-2.787 2.79-1.882-1.882.79-.789 1.092 1.093 3.24-3.238A4.5 4.5 0 1 1 8 3.5"
      />
    </svg>
  )
)
CheckCircleSmall.displayName = "CheckCircleSmall"
export { CheckCircleSmall }
