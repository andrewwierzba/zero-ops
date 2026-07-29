import { forwardRef } from "react"

/** use:component separator | divider, path separator, breadcrumb */
const Slash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M11.5 2L9 13H7.5L10 2H11.5Z" fill="currentColor"/>
<circle cx="8" cy="12" r="1" fill="currentColor"/>
<circle cx="5" cy="12" r="1" fill="currentColor"/>
</svg>
  )
)
Slash.displayName = "Slash"
export { Slash }
