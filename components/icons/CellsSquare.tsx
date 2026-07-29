import { forwardRef } from "react"

/** use:action table cells | grid cells, matrix */
const CellsSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 1.75A.75.75 0 0 1 1.75 1h12.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75zm1.5.75v4.75h4.75V2.5zm6.25 0v4.75h4.75V2.5zm-1.5 6.25H2.5v4.75h4.75zm1.5 4.75V8.75h4.75v4.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CellsSquare.displayName = "CellsSquare"
export { CellsSquare }
