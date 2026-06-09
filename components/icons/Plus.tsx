import { forwardRef } from "react"

/** use:component add new | create, new, insert, plus, + */
const Plus = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.25 7.25V1h1.5v6.25H15v1.5H8.75V15h-1.5V8.75H1v-1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Plus.displayName = "Plus"
export { Plus }
