import { forwardRef } from "react"

/** use:component info | information, help, hint, tooltip */
const InfoSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7.25 10.5v-3h1.5v3zM8 5a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 5" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12m0-1.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9"
      clipRule="evenodd"
      />
    </svg>
  )
)
InfoSmall.displayName = "InfoSmall"
export { InfoSmall }
