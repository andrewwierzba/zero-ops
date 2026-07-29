import { forwardRef } from "react"

/** use:object Domains | Unity Catalog | domain hierarchy, domain groups */
const DomainCirclesThree = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.75 13.375a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m0-1.25a1.375 1.375 0 1 0 0-2.75 1.375 1.375 0 0 0 0 2.75M4.25 13.375a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m0-1.25a1.375 1.375 0 1 0 0-2.75 1.375 1.375 0 0 0 0 2.75M8 7.375a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m0-1.25a1.375 1.375 0 1 0 0-2.75 1.375 1.375 0 0 0 0 2.75"
      clipRule="evenodd"
      />
    </svg>
  )
)
DomainCirclesThree.displayName = "DomainCirclesThree"
export { DomainCirclesThree }
