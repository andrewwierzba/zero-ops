import { forwardRef } from "react"

/** use:action pinned | anchored, stuck, kept visible */
const PinFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M5 .75A.75.75 0 0 1 5.75 0h4.5a.75.75 0 0 1 .75.75v4.007c0 .597.237 1.17.659 1.591L13.78 8.47c.141.14.22.331.22.53v2.25a.75.75 0 0 1-.75.75h-4.5v4h-1.5v-4h-4.5a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 .22-.53L4.34 6.348A2.25 2.25 0 0 0 5 4.758z"
      />
    </svg>
  )
)
PinFill.displayName = "PinFill"
export { PinFill }
