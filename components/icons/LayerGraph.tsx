import { forwardRef } from "react"

/** use:object Feature graph | AI | feature lineage, feature dependencies */
const LayerGraph = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 3.75a2.75 2.75 0 1 1 3.5 2.646v3.208c.916.259 1.637.98 1.896 1.896h3.208a2.751 2.751 0 1 1 0 1.5H6.396A2.751 2.751 0 1 1 3 9.604V6.396A2.75 2.75 0 0 1 1 3.75m11.25 9.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m-8.5-11a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0 8.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
      <path fill="currentColor" d="M10 1.5h3.75a.75.75 0 0 1 .75.75V6H13V3h-3z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.75 4a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zm.75 3.5v-2h2v2z"
      clipRule="evenodd"
      />
    </svg>
  )
)
LayerGraph.displayName = "LayerGraph"
export { LayerGraph }
