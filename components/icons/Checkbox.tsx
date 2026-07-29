import { forwardRef } from "react"

/** use:action checkbox | toggle, boolean, multi-select */
const Checkbox = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M1.75 2a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75V9h-1.5v4.5h-10v-10H10V2z"
      />
      <path fill="currentColor" d="m15.03 4.03-1.06-1.06L7.5 9.44 5.53 7.47 4.47 8.53l3.03 3.03z" />
    </svg>
  )
)
Checkbox.displayName = "Checkbox"
export { Checkbox }
