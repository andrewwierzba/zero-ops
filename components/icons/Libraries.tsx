import { forwardRef } from "react"

/** use:object Library | Compute | packages, dependencies, jar, whl */
const Libraries = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="m8.301 1.522 5.25 13.5 1.398-.544-5.25-13.5zM1 15V1h1.5v14zM5 15V1h1.5v14z" />
    </svg>
  )
)
Libraries.displayName = "Libraries"
export { Libraries }
