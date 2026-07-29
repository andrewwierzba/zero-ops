import { forwardRef } from "react"

/** use:indicator running | in progress, active, spinning */
const RunningSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M12.5 8C12.5 10.4853 10.4853 12.5 8 12.5V11C9.65685 11 11 9.65685 11 8L10.999 7.99805L12.499 7.99609L12.5 8Z" fill="currentColor"/>
<path d="M8 5C6.34315 5 5 6.34315 5 8H3.5C3.5 5.51472 5.51472 3.5 8 3.5V5Z" fill="currentColor"/>
</svg>
  )
)
RunningSmall.displayName = "RunningSmall"
export { RunningSmall }
