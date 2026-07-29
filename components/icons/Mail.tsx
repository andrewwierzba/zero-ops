import { forwardRef } from "react"

/** use:action mail | message, notification, invite */
const Mail = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M.75 2a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h14.5a.75.75 0 0 0 .75-.75V2.75a.75.75 0 0 0-.75-.75zm.75 2.347V12.5h13V4.347L9.081 8.604a1.75 1.75 0 0 1-2.162 0zM13.15 3.5H2.85l4.996 3.925a.25.25 0 0 0 .308 0z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Mail.displayName = "Mail"
export { Mail }
