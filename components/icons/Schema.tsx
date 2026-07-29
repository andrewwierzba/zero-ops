import { forwardRef } from "react"

/** use:object Tree | Unity Catalog | data structure, DDL */
const Schema = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.75 0A.75.75 0 0 0 2 .75v3a.75.75 0 0 0 .75.75h1v7a2.75 2.75 0 0 0 2.75 2.75H7v1c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v.5h-.5c-.69 0-1.25-.56-1.25-1.25V8.45c.375.192.8.3 1.25.3H7v.75c0 .414.336.75.75.75h5.5A.75.75 0 0 0 14 9.5v-3a.75.75 0 0 0-.75-.75h-5.5A.75.75 0 0 0 7 6.5v.75h-.5c-.69 0-1.25-.56-1.25-1.25V4.5h8a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75zm.75 3V1.5h9V3zm5 10v1.5h4V13zm0-4.25v-1.5h4v1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Schema.displayName = "Schema"
export { Schema }
