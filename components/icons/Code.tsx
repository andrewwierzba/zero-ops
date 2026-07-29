import { forwardRef } from "react"

/** use:object Code | Platform | source, script, angle brackets */
const Code = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M4.03 12.06 5.091 11l-2.97-2.97 2.97-2.97L4.031 4 0 8.03zM12.091 4l4.03 4.03-4.03 4.03-1.06-1.06L14 8.03l-2.97-2.97z"
      />
    </svg>
  )
)
Code.displayName = "Code"
export { Code }
