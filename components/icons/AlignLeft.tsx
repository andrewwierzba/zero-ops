import { forwardRef } from "react"

/** use:action align left | left align, flush left */
const AlignLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M1 2.5h14V1H1zM8 5.75H1v-1.5h7zM1 8.75v-1.5h14v1.5zM1 15v-1.5h14V15zM1 11.75h7v-1.5H1z"
      />
    </svg>
  )
)
AlignLeft.displayName = "AlignLeft"
export { AlignLeft }
