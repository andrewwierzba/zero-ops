import { forwardRef } from "react"

/** use:object Domains | Unity Catalog | data domain, business domain */
const Domains = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M6.25 3.25a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-1.5 0a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 0 0-6.5 0M11 11.75a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-1.5 0a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 0 0-6.5 0M1.5 11.75a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-1.5 0a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 0 0-6.5 0"
      />
    </svg>
  )
)
Domains.displayName = "Domains"
export { Domains }
