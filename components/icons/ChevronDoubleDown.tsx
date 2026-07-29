import { forwardRef } from "react"

/** use:action expand all | unfold all, open all */
const ChevronDoubleDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M10.947 7.954 8 10.891 5.056 7.954 3.997 9.016l4.004 3.993 4.005-3.993z" />
      <path fill="currentColor" d="M10.947 3.994 8 6.931 5.056 3.994 3.997 5.056 8.001 9.05l4.005-3.993z" />
    </svg>
  )
)
ChevronDoubleDown.displayName = "ChevronDoubleDown"
export { ChevronDoubleDown }
