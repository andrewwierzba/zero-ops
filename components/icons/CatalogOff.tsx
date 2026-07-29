import { forwardRef } from "react"

/** use:object Disabled catalog | Unity Catalog | unavailable, restricted */
const CatalogOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" clipPath="url(#CatalogOffIcon_svg__a)">
      <path d="m14 11.94-1.5-1.5V5H7.061l-1.5-1.5h6.94v-2h-8c-.261 0-.499.1-.677.263L2.764.703A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75z" />
      <path
      fillRule="evenodd"
      d="M2 4.06.47 2.53l1.06-1.06 13.5 13.5-1.06 1.06-.03-.03H4.75A2.75 2.75 0 0 1 2 13.25zm1.5 1.5v7.69c0 .69.56 1.25 1.25 1.25h7.69z"
      clipRule="evenodd"
      />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
CatalogOff.displayName = "CatalogOff"
export { CatalogOff }
