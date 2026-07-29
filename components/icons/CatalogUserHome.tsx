import { forwardRef } from "react"

/** use:object Personal catalog | Unity Catalog | my catalog, user home */
const CatalogUserHome = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 6.5V.75a.75.75 0 0 0-.75-.75H4.5A2.5 2.5 0 0 0 2 2.5v10.75A2.75 2.75 0 0 0 4.75 16H6.5v-1.5H4.75c-.69 0-1.25-.56-1.25-1.25V4.792c.306.134.644.208 1 .208h8v1.5zm-9.5-3a1 1 0 0 1 0-2h8v2z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M11.75 8.5a2.501 2.501 0 0 1 1.594 4.426 4.76 4.76 0 0 1 1.969 1.332.75.75 0 0 1-1.126.993 3.24 3.24 0 0 0-2.437-1.1c-.97 0-1.84.424-2.437 1.1a.75.75 0 0 1-1.126-.993 4.76 4.76 0 0 1 1.968-1.332A2.5 2.5 0 0 1 11.75 8.5m0 1.501a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
      />
    </svg>
  )
)
CatalogUserHome.displayName = "CatalogUserHome"
export { CatalogUserHome }
