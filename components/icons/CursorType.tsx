import { forwardRef } from "react"

/** use:action text cursor | I-beam, text select, type mode */
const CursorType = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 3.75h1c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H8v1.5h1c.788 0 1.499-.331 2-.863a2.74 2.74 0 0 0 2 .863h1v-1.5h-1c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25h1v-1.5h-1c-.788 0-1.499.331-2 .863a2.74 2.74 0 0 0-2-.863H8z"
      />
      <path fill="currentColor" d="M5.936 8.003 3 5.058 4.062 4l3.993 4.004-3.993 4.005L3 10.948z" />
    </svg>
  )
)
CursorType.displayName = "CursorType"
export { CursorType }
