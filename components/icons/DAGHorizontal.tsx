import { forwardRef } from "react"

/** use:object horizontal DAG | Lakeflow | left-to-right flow, dependency flow */
const DAGHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 2.75A.75.75 0 0 1 9.75 2h5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.748-.692L7.311 8l1.691 1.692A.75.75 0 0 1 9.75 9h5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-1.44L6.998 9.809a.75.75 0 0 1-.748.692H.75A.75.75 0 0 1 0 9.75v-3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .748.692L9 4.189zm1.5 2.75h4v-2h-4zM5.5 7h-4v2h4zm5 3.5v2h4v-2z"
      clipRule="evenodd"
      />
    </svg>
  )
)
DAGHorizontal.displayName = "DAGHorizontal"
export { DAGHorizontal }
