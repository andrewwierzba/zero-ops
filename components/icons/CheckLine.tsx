import { forwardRef } from "react"

/** use:indicator partial success | partial check, some complete */
const CheckLine = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.06 2.06 14 1 5.53 9.47 2.06 6 1 7.06l4.53 4.531zM1.03 15.03h14v-1.5h-14z"
      clipRule="evenodd"
      />
    </svg>
  )
)
CheckLine.displayName = "CheckLine"
export { CheckLine }
