import { forwardRef } from "react"

/** use:component close | dismiss, x, cancel, remove */
const Close = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.97 8.03 2 3.06 3.06 2l4.97 4.97L13 2l1.06 1.06-4.969 4.97 4.97 4.97L13 14.06 8.03 9.092l-4.97 4.97L2 13z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Close.displayName = "Close"
export { Close }
