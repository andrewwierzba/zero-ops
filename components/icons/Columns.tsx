import { forwardRef } from "react"

/** use:action columns | fields, table columns */
const Columns = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 1.75A.75.75 0 0 1 1.75 1h12.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75zM2.5 13.5v-11H5v11zm4 0h3v-11h-3zm4.5-11v11h2.5v-11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Columns.displayName = "Columns"
export { Columns }
