import { forwardRef } from "react"

/** use:action jump to end | last page, skip right */
const ChevronDoubleRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="m7.954 5.056 2.937 2.946-2.937 2.945 1.062 1.059 3.993-4.004-3.993-4.005z" />
      <path fill="currentColor" d="m3.994 5.056 2.937 2.946-2.937 2.945 1.062 1.059L9.05 8.002 5.056 3.997z" />
    </svg>
  )
)
ChevronDoubleRight.displayName = "ChevronDoubleRight"
export { ChevronDoubleRight }
