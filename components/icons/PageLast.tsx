import { forwardRef } from "react"

/** use:action last page | jump to end, final page */
const PageLast = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.06 1 2 2.06l5.97 5.97L2 14l1.06 1.06 7.031-7.03zm10.47 14.03h1.5v-14h-1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PageLast.displayName = "PageLast"
export { PageLast }
