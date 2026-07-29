import { forwardRef } from "react"

/** use:indicator typing | loading dots, ellipsis, in progress */
const ThreeDots = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M9 7.375A3.437 3.437 0 1 1 9 .5a3.437 3.437 0 0 1 0 6.875M13.688 8a3.438 3.438 0 1 0 0 6.875 3.438 3.438 0 0 0 0-6.875M4.313 8a3.437 3.437 0 1 0 0 6.875 3.437 3.437 0 0 0 0-6.875"
      />
    </svg>
  )
)
ThreeDots.displayName = "ThreeDots"
export { ThreeDots }
