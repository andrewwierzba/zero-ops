import { forwardRef } from "react"

/** use:action collapse all | fold all, minimize all */
const ChevronDoubleUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M5.056 8.047 8 5.11l2.944 2.937 1.06-1.062L8 2.991 3.997 6.985z" />
      <path fill="currentColor" d="M5.056 12.008 8 9.07l2.944 2.937 1.06-1.062L8 6.952l-4.003 3.994z" />
    </svg>
  )
)
ChevronDoubleUp.displayName = "ChevronDoubleUp"
export { ChevronDoubleUp }
