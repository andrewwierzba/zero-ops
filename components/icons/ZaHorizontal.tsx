import { forwardRef } from "react"

/** use:action sort Z-A | reverse alphabetical, descending text */
const ZaHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.654 4.5a.75.75 0 0 1 .695.468L15 11.5h-1.619l-.406-1h-2.643l-.406 1H8.307l2.652-6.532a.75.75 0 0 1 .695-.468M10.94 9h1.425l-.712-1.756zM4.667 6H1V4.5h5.25a.75.75 0 0 1 .58 1.225L3.333 10H7v1.5H1.75a.75.75 0 0 1-.58-1.225z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ZaHorizontal.displayName = "ZaHorizontal"
export { ZaHorizontal }
