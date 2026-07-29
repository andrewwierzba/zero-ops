import { forwardRef } from "react"

/** use:action branch | repos, git, split, diverge */
const ForkHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 4.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M2.75 2a2.75 2.75 0 1 0 2.646 3.5H6.75v3.75A2.75 2.75 0 0 0 9.5 12h.104a2.751 2.751 0 1 0 0-1.5H9.5c-.69 0-1.25-.56-1.25-1.25V5.5h1.354a2.751 2.751 0 1 0 0-1.5H5.396A2.75 2.75 0 0 0 2.75 2m9.5 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0 6.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
ForkHorizontal.displayName = "ForkHorizontal"
export { ForkHorizontal }
