import { forwardRef } from "react"

/** use:action edit | modify, write, compose */
const PencilFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M11.013 1.513a1.75 1.75 0 0 1 2.474 0l1.086 1.085a1.75 1.75 0 0 1 0 2.475l-1.512 1.513L9.5 3.026zM8.439 4.086l-7.22 7.22a.75.75 0 0 0-.219.53v2.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .53-.22L12 7.646z"
      />
    </svg>
  )
)
PencilFill.displayName = "PencilFill"
export { PencilFill }
