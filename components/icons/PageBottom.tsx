import { forwardRef } from "react"

/** use:action scroll to bottom | jump to end, last item */
const PageBottom = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 3.06 2.06 2l5.97 5.97L14 2l1.06 1.06-7.03 7.031zm14.03 10.47v1.5h-14v-1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PageBottom.displayName = "PageBottom"
export { PageBottom }
