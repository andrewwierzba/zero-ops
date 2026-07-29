import { forwardRef } from "react"

/** use:action justify text | full width, block align */
const TextJustify = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M15 15H1v-1.5h14zM15 11.75H1v-1.5h14zM15 8.75H1v-1.5h14zM15 5.75H1v-1.5h14zM15 2.5H1V1h14z"
      />
    </svg>
  )
)
TextJustify.displayName = "TextJustify"
export { TextJustify }
