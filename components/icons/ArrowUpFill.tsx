import { forwardRef } from "react"

/** use:indicator upload | arrow up, ascend */
const ArrowUpFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 .25c.199 0 .39.08.53.22l6.25 6.25A.75.75 0 0 1 14.25 8H10.5v7.25a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V8H1.75a.751.751 0 0 1-.53-1.28L7.47.47l.114-.094A.75.75 0 0 1 8 .25"
      />
    </svg>
  )
)
ArrowUpFill.displayName = "ArrowUpFill"
export { ArrowUpFill }
