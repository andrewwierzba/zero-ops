import { forwardRef } from "react"

/** use:component context menu | more, kebab menu, ellipsis */
const Overflow = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 1a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 8 1M8 6.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M8 11.5A1.75 1.75 0 1 0 8 15a1.75 1.75 0 0 0 0-3.5"
      />
    </svg>
  )
)
Overflow.displayName = "Overflow"
export { Overflow }
