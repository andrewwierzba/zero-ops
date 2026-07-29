import { forwardRef } from "react"

/** use:action remove | minus, subtract, exclude, decrease */
const MinusCircle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M4.5 8.75v-1.5h7v1.5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13"
      clipRule="evenodd"
      />
    </svg>
  )
)
MinusCircle.displayName = "MinusCircle"
export { MinusCircle }
