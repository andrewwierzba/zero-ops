import { forwardRef } from "react"

/** use:indicator deprecated | obsolete, end of life, legacy */
const Deprecated = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2m-3.92 9.103q.36.454.815.816l7.026-7.023a5 5 0 0 0-.817-.817z"
      />
    </svg>
  )
)
Deprecated.displayName = "Deprecated"
export { Deprecated }
