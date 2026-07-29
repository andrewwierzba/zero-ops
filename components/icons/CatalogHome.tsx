import { forwardRef } from "react"

/** use:object Home Catalog | Unity Catalog | default catalog, primary */
const CatalogHome = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
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
      fillRule="evenodd"
      d="M12.457 7.906a.75.75 0 0 0-.914 0l-3.25 2.5A.75.75 0 0 0 8 11v4.25c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75V11a.75.75 0 0 0-.293-.594zM9.5 14.5v-3.13L12 9.445l2.5 1.923V14.5h-1.75V12h-1.5v2.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CatalogHome.displayName = "CatalogHome"
export { CatalogHome }
