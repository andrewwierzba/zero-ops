import { forwardRef } from "react"

/** use:action reset branch | repos, git, revert, undo branch */
const BranchReset = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.75 1a2.748 2.748 0 0 1 .75 5.393v3.213A2.749 2.749 0 0 1 2.75 15 2.75 2.75 0 0 1 2 9.606V6.393A2.748 2.748 0 0 1 2.75 1m0 10a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0-8.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M13.25 1A2.748 2.748 0 0 1 14 6.393v3.213A2.749 2.749 0 0 1 13.25 15a2.75 2.75 0 0 1-.75-5.394V6.393A2.748 2.748 0 0 1 13.25 1m0 10a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0-8.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
      <path fill="currentColor" d="m11.31 8-2.78 2.78-1.06-1.06.97-.97H5v-1.5h3.44l-.97-.97 1.06-1.06z" />
    </svg>
  )
)
BranchReset.displayName = "BranchReset"
export { BranchReset }
