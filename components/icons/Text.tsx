import { forwardRef } from "react"

/** use:action add text | string, characters */
const Text = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7.118 13V4.62H4.083V3.135h7.84v1.483H8.883V13z" />
    </svg>
  )
)
Text.displayName = "Text"
export { Text }
