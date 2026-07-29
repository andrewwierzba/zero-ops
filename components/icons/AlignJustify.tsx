import { forwardRef } from "react"

/** use:action justify | full width text, block align */
const AlignJustify = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M1 2.5h14V1H1zm14 3.25H1v-1.5h14zm-14 3v-1.5h14v1.5zM1 15v-1.5h14V15zm0-3.25h14v-1.5H1z"
      />
    </svg>
  )
)
AlignJustify.displayName = "AlignJustify"
export { AlignJustify }
