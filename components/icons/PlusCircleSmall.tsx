import { forwardRef } from "react"

/** use:action add | create, new, plus */
const PlusCircleSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M8.5 7h2.25v1.5H8.5v2.25H7V8.5H4.75V7H7V4.75h1.5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.75 1a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5m0 1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
PlusCircleSmall.displayName = "PlusCircleSmall"
export { PlusCircleSmall }
