import { forwardRef } from "react"

/** use:object Streaming Table | Lakeflow | real-time table, live data */
const TableStream = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75H6.5V7h3v1H11V7h2.5v1H15V1.75a.75.75 0 0 0-.75-.75zM5 7v6.5H2.5V7zm8.5-1.5v-3h-11v3z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M9.024 10.92a1.187 1.187 0 0 1 1.876.03 2.687 2.687 0 0 0 4.247.066l.439-.548-1.172-.937-.438.548a1.187 1.187 0 0 1-1.876-.03 2.687 2.687 0 0 0-4.247-.066l-.439.548 1.172.937z"
      />
      <path
      fill="currentColor"
      d="M9.024 13.92a1.187 1.187 0 0 1 1.876.03 2.687 2.687 0 0 0 4.247.066l.439-.548-1.172-.937-.438.548a1.187 1.187 0 0 1-1.876-.03 2.687 2.687 0 0 0-4.247-.066l-.439.548 1.172.937z"
      />
    </svg>
  )
)
TableStream.displayName = "TableStream"
export { TableStream }
