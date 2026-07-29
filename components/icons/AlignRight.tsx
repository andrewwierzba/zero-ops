import { forwardRef } from "react"

/** use:action align right | right align, flush right */
const AlignRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M1 2.5h14V1H1zM15 5.75H8v-1.5h7zM1 8.75v-1.5h14v1.5zM1 15v-1.5h14V15zM8 11.75h7v-1.5H8z"
      />
    </svg>
  )
)
AlignRight.displayName = "AlignRight"
export { AlignRight }
