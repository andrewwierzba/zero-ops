import { forwardRef } from "react"

/** use:action heading 6 | smallest heading */
const H6 = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M2.5 7.25H6V3h1.5v10H6V8.75H2.5V13H1V3h1.5zM12.125 3c1.167 0 2.17.695 2.62 1.69l-1.366.62a1.38 1.38 0 0 0-1.254-.81h-.375c-.69 0-1.25.56-1.25 1.25v1.154A3 3 0 0 1 15 9.5v.5a3 3 0 0 1-5.996.154L9 10V5.75A2.75 2.75 0 0 1 11.75 3zM12 8a1.5 1.5 0 0 0-1.5 1.5v.5a1.5 1.5 0 0 0 3 0v-.5A1.5 1.5 0 0 0 12 8"
      />
    </svg>
  )
)
H6.displayName = "H6"
export { H6 }
