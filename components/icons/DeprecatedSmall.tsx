import { forwardRef } from "react"

/** use:indicator deprecated | obsolete, end of life, legacy */
const DeprecatedSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 3a5 5 0 1 1 0 10A5 5 0 0 1 8 3m-3.268 7.585q.301.379.68.68l5.856-5.85a4.2 4.2 0 0 0-.682-.683z"
      />
    </svg>
  )
)
DeprecatedSmall.displayName = "DeprecatedSmall"
export { DeprecatedSmall }
