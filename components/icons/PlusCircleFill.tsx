import { forwardRef } from "react"

/** use:action add | create, new, plus */
const PlusCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m-.75-4.5V8.75H4.5v-1.5h2.75V4.5h1.5v2.75h2.75v1.5H8.75v2.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PlusCircleFill.displayName = "PlusCircleFill"
export { PlusCircleFill }
