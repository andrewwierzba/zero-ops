import { forwardRef } from "react"

/** use:indicator info | information, help, hint, tooltip */
const InfoFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8.75 3V7h1.5v4zM8 4.5A.75.75 0 1 1 8 6a.75.75 0 0 1 0-1.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
InfoFill.displayName = "InfoFill"
export { InfoFill }
