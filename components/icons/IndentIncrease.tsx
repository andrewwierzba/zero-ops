import { forwardRef } from "react"

/** use:action indent | increase indent, shift right */
const IndentIncrease = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M16 2H0v1.5h16zM16 5.5H8V7h8zM16 9H8v1.5h8zM0 12.5V14h16v-1.5zM1.97 6.03l1.06-1.06L6.06 8l-3.03 3.03-1.06-1.06L3.94 8z"
      />
    </svg>
  )
)
IndentIncrease.displayName = "IndentIncrease"
export { IndentIncrease }
