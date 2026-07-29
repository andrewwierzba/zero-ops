import { forwardRef } from "react"

/** use:indicator marker | pointer, caret, sort indicator */
const Triangle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 3a.75.75 0 0 1 .65.375l4.33 7.5A.75.75 0 0 1 12.33 12H3.67a.75.75 0 0 1-.65-1.125l4.33-7.5.056-.083A.75.75 0 0 1 8 3"
      />
    </svg>
  )
)
Triangle.displayName = "Triangle"
export { Triangle }
