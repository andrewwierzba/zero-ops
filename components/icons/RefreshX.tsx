import { forwardRef } from "react"

/** use:indicator sync failed | refresh error, reload failed */
const RefreshX = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 1c1.878 0 3.583.74 4.84 1.943l.66.596V2H15v4h-4V4.5h1.326l-.491-.443-.009-.008-.01-.009a5.5 5.5 0 1 0 .083 7.839l1.064 1.057A7 7 0 1 1 8 1"
      />
      <path
      fill="currentColor"
      d="M5 6.05 6.95 8 5 9.95 6.05 11 8 9.05 9.95 11 11 9.95 9.05 8 11 6.05 9.95 5 8 6.95 6.05 5z"
      />
    </svg>
  )
)
RefreshX.displayName = "RefreshX"
export { RefreshX }
