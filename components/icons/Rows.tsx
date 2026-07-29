import { forwardRef } from "react"

/** use:action rows | horizontal layout, row view */
const Rows = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.25 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V1.75A.75.75 0 0 1 1.75 1zM2.5 2.5h11V5h-11zm0 4v3h11v-3zm11 4.5h-11v2.5h11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Rows.displayName = "Rows"
export { Rows }
