import { forwardRef } from "react"

/** use:action bold | strong text, heavy font */
const Bold = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.75 3a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h4.375a2.875 2.875 0 0 0 1.496-5.33A2.875 2.875 0 0 0 8.375 3zm.75 5.75v2.75h3.625a1.375 1.375 0 0 0 0-2.75zm2.877-1.5a1.375 1.375 0 0 0-.002-2.75H5.5v2.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Bold.displayName = "Bold"
export { Bold }
