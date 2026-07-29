import { forwardRef } from "react"

/** use:action pull request | PR, merge request, code review */
const PullRequest = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.75 1a2.748 2.748 0 0 1 .75 5.393v3.213A2.749 2.749 0 0 1 2.75 15 2.75 2.75 0 0 1 2 9.606V6.393A2.748 2.748 0 0 1 2.75 1m0 10a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0-8.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M10.53 2.03 9.56 3h1.69A2.75 2.75 0 0 1 14 5.75v3.856A2.749 2.749 0 0 1 13.25 15a2.75 2.75 0 0 1-.75-5.394V5.75c0-.69-.56-1.25-1.25-1.25H9.56l.97.97-1.06 1.06-2.78-2.78L9.47.97zM13.25 11a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
PullRequest.displayName = "PullRequest"
export { PullRequest }
