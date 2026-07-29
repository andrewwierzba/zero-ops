import { forwardRef } from "react"

/** use:action dark mode | night mode, dark theme */
const Moon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M5.25 5c0-.682.119-1.336.337-1.943a5.5 5.5 0 1 0 7.354 7.355A5.75 5.75 0 0 1 5.25 5m1.5 0a4.25 4.25 0 0 0 6.962 3.271.75.75 0 0 1 1.222.678A7 7 0 1 1 7.05 1.065l.114-.006a.75.75 0 0 1 .564 1.228A4.23 4.23 0 0 0 6.75 5"
      />
    </svg>
  )
)
Moon.displayName = "Moon"
export { Moon }
