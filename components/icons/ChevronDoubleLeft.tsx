import { forwardRef } from "react"

/** use:action jump to start | first page, skip left */
const ChevronDoubleLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M8.047 10.944 5.11 8l2.937-2.944-1.062-1.06L2.991 8l3.994 4.003z" />
      <path fill="currentColor" d="M12.008 10.944 9.07 8l2.938-2.944-1.062-1.06L6.952 8l3.994 4.003z" />
    </svg>
  )
)
ChevronDoubleLeft.displayName = "ChevronDoubleLeft"
export { ChevronDoubleLeft }
