import { forwardRef } from "react"

/** use:indicator info | information, help, hint, tooltip */
const Info = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m.75 5.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0M7.25 11V7h1.5v4z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Info.displayName = "Info"
export { Info }
