import { forwardRef } from "react"

/** use:action group | cluster, bundle, aggregate */
const Group = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M2.5 13.5H4V15H1.75a.75.75 0 0 1-.75-.75V12h1.5zM10 15H6v-1.5h4zM15 14.25a.75.75 0 0 1-.75.75H12v-1.5h1.5V12H15z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.75 6.5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 .75-.75zm-3.25 4H8V8H5.5z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M2.5 10H1V6h1.5zM15 10h-1.5V6H15zM11.25 4a.75.75 0 0 1 .75.75V9h-1.5V5.5H7V4zM4 2.5H2.5V4H1V1.75A.75.75 0 0 1 1.75 1H4zM14.25 1a.75.75 0 0 1 .75.75V4h-1.5V2.5H12V1zM10 2.5H6V1h4z"
      />
    </svg>
  )
)
Group.displayName = "Group"
export { Group }
