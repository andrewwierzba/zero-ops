import { forwardRef } from "react"

/** use:object Lineage | Unity Catalog | DAG, data flow, dependency graph */
const DAG = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1.75A.75.75 0 0 1 8.75 1h5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-5.5A.75.75 0 0 1 8 5.25v-1H5.5c-.69 0-1.25.56-1.25 1.25h2a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-2c0 .69.56 1.25 1.25 1.25H8v-1a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-1H5.5a2.75 2.75 0 0 1-2.75-2.75h-2A.75.75 0 0 1 0 9.75v-3.5a.75.75 0 0 1 .75-.75h2A2.75 2.75 0 0 1 5.5 2.75H8zm1.5.75v2h4v-2zM1.5 9V7h4v2zm8 4.5v-2h4v2z"
      clipRule="evenodd"
      />
    </svg>
  )
)
DAG.displayName = "DAG"
export { DAG }
