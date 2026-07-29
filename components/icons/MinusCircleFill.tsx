import { forwardRef } from "react"

/** use:action remove | minus, subtract, exclude, decrease */
const MinusCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m3.5-7.25h-7v-1.5h7z"
      clipRule="evenodd"
      />
    </svg>
  )
)
MinusCircleFill.displayName = "MinusCircleFill"
export { MinusCircleFill }
