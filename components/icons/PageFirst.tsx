import { forwardRef } from "react"

/** use:action first page | jump to start, beginning */
const PageFirst = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="m12.97 1 1.06 1.06-5.97 5.97L14.03 14l-1.06 1.06-7.03-7.03zM2.5 15.03H1v-14h1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PageFirst.displayName = "PageFirst"
export { PageFirst }
