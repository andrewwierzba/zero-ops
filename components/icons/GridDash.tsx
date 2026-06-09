import { forwardRef } from "react"

/** use:indicator placeholder | empty, skeleton, wireframe */
const GridDash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M1 1.75V4h1.5V2.5H4V1H1.75a.75.75 0 0 0-.75.75M15 14.25V12h-1.5v1.5H12V15h2.25a.75.75 0 0 0 .75-.75M12 1h2.25a.75.75 0 0 1 .75.75V4h-1.5V2.5H12zM1.75 15H4v-1.5H2.5V12H1v2.25a.75.75 0 0 0 .75.75M10 2.5H6V1h4zM6 15h4v-1.5H6zM13.5 10V6H15v4zM1 6v4h1.5V6z"
      />
    </svg>
  )
)
GridDash.displayName = "GridDash"
export { GridDash }
