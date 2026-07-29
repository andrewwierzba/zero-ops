import { forwardRef } from "react"

/** use:action retry | loop, repeat, iterate, re-run */
const Loop = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M3.75 2A2.75 2.75 0 0 0 1 4.75v6.5A2.75 2.75 0 0 0 3.75 14H5.5v-1.5H3.75c-.69 0-1.25-.56-1.25-1.25v-6.5c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v6.5c0 .69-.56 1.25-1.25 1.25H9.81l.97-.97-1.06-1.06-2.78 2.78 2.78 2.78 1.06-1.06-.97-.97h2.44A2.75 2.75 0 0 0 15 11.25v-6.5A2.75 2.75 0 0 0 12.25 2z"
      />
    </svg>
  )
)
Loop.displayName = "Loop"
export { Loop }
