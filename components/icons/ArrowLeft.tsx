import { forwardRef } from "react"

/** use:action back | previous, return */
const ArrowLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 8.03 8.03 1l1.061 1.06-5.22 5.22h11.19v1.5H3.87L9.091 14l-1.06 1.06z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ArrowLeft.displayName = "ArrowLeft"
export { ArrowLeft }
