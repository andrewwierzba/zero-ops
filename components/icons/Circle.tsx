import { forwardRef } from "react"

/** use:indicator health | dot, status */
const Circle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12.5 8a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0" />
    </svg>
  )
)
Circle.displayName = "Circle"
export { Circle }
