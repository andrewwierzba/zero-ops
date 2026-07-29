import { forwardRef } from "react"

/** use:action italic | emphasis, slanted text */
const Italic = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.648 4.5H12V3H6v1.5h2.102l-1.75 7H4V13h6v-1.5H7.898z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Italic.displayName = "Italic"
export { Italic }
