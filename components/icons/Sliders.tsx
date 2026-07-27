import { forwardRef } from "react"

/** use:action adjust | sliders, controls, tuning, settings */
const Sliders = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4 15v-2.354a2.751 2.751 0 0 1 0-5.292V1h1.5v6.354a2.751 2.751 0 0 1 0 5.292V15zm.75-3.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5M10.5 1v2.354a2.751 2.751 0 0 0 0 5.292V15H12V8.646a2.751 2.751 0 0 0 0-5.292V1zm.75 3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
Sliders.displayName = "Sliders"
export { Sliders }
