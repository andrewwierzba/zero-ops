import { forwardRef } from "react"

/** use:action heading 5 | small heading */
const H5 = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M2.5 7.25H6V3h1.5v10H6V8.75H2.5V13H1V3h1.5zM14.5 4.5h-4v2.097a3.4 3.4 0 0 1 2.013-.27C13.803 6.55 15 7.556 15 9.25V10a3 3 0 0 1-6 0h1.5a1.5 1.5 0 0 0 3 0v-.75c0-.834-.539-1.324-1.244-1.446-.679-.118-1.381.133-1.756.71V8.5H9V3.75A.75.75 0 0 1 9.75 3h4.75z"
      />
    </svg>
  )
)
H5.displayName = "H5"
export { H5 }
