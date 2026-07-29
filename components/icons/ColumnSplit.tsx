import { forwardRef } from "react"

/** use:action split column | divide, separate columns */
const ColumnSplit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V1.75a.75.75 0 0 0-.75-.75zm.75 12.5v-11h4.75v11zm6.25 0h4.75v-11H8.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ColumnSplit.displayName = "ColumnSplit"
export { ColumnSplit }
