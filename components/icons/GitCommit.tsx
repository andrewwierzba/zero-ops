import { forwardRef } from "react"

/** use:action commit | repos, git, save version */
const GitCommit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.07 7.25a4.001 4.001 0 0 1 7.86 0H16v1.5h-4.07a4.001 4.001 0 0 1-7.86 0H0v-1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
GitCommit.displayName = "GitCommit"
export { GitCommit }
