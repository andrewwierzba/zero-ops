import { forwardRef } from "react"

/** use:action zoom in | magnify, enlarge */
const ZoomIn = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M8.75 7.25H11v1.5H8.75V11h-1.5V8.75H5v-1.5h2.25V5h1.5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1a7 7 0 1 0 4.39 12.453l2.55 2.55 1.06-1.06-2.55-2.55A7 7 0 0 0 8 1M2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0"
      clipRule="evenodd"
      />
    </svg>
  )
)
ZoomIn.displayName = "ZoomIn"
export { ZoomIn }
