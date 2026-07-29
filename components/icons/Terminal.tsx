import { forwardRef } from "react"

/** use:object Web Terminal | Compute | console, CLI, shell */
const Terminal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M5.03 4.97 8.06 8l-3.03 3.03-1.06-1.06L5.94 8 3.97 6.03zM12 9.5H8V11h4z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 1.75A.75.75 0 0 1 1.75 1h12.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75zm1.5.75v11h11v-11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Terminal.displayName = "Terminal"
export { Terminal }
