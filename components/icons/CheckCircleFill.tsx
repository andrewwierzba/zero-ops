import { forwardRef } from "react"

/** use:indicator success | success, complete, passed, healthy */
const CheckCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.53-1.47-1.06-1.06L7 8.94 5.53 7.47 4.47 8.53l2 2 .53.53.53-.53z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CheckCircleFill.displayName = "CheckCircleFill"
export { CheckCircleFill }
