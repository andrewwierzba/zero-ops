import { forwardRef } from "react"

/** use:action accept | checkmark, confirm, done */
const CheckSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.03 6.03 7 11.06 3.97 8.03l1.06-1.06L7 8.94l3.97-3.97z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CheckSmall.displayName = "CheckSmall"
export { CheckSmall }
