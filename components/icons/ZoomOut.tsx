import { forwardRef } from "react"

/** use:action zoom out | shrink, reduce */
const ZoomOut = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M11 7.25H5v1.5h6z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 8a7 7 0 1 1 12.45 4.392l2.55 2.55-1.06 1.061-2.55-2.55A7 7 0 0 1 1 8m7-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11"
      clipRule="evenodd"
      />
    </svg>
  )
)
ZoomOut.displayName = "ZoomOut"
export { ZoomOut }
