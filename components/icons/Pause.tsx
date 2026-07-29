import { forwardRef } from "react"

/** use:action pause | hold, suspend, pause job */
const Pause = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" fillRule="evenodd" d="M10 12V4h1.5v8zm-5.5 0V4H6v8z" clipRule="evenodd" />
    </svg>
  )
)
Pause.displayName = "Pause"
export { Pause }
