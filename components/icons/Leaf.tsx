import { forwardRef } from "react"

/** use:object Environment | Platform | green, nature, sustainable */
const Leaf = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5 6a2.75 2.75 0 0 0 2.75 2.75h2.395a2 2 0 1 0 0-1.5H7.75C7.06 7.25 6.5 6.69 6.5 6V2H5zm6.5 2a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0"
      clipRule="evenodd"
      />
    </svg>
  )
)
Leaf.displayName = "Leaf"
export { Leaf }
