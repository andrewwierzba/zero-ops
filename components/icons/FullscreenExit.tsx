import { forwardRef } from "react"

/** use:action exit fullscreen | minimize, restore size */
const FullscreenExit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M6 1v4.25a.75.75 0 0 1-.75.75H1V4.5h3.5V1zM10 15v-4.25a.75.75 0 0 1 .75-.75H15v1.5h-3.5V15zM10.75 6H15V4.5h-3.5V1H10v4.25c0 .414.336.75.75.75M1 10h4.25a.75.75 0 0 1 .75.75V15H4.5v-3.5H1z"
      />
    </svg>
  )
)
FullscreenExit.displayName = "FullscreenExit"
export { FullscreenExit }
