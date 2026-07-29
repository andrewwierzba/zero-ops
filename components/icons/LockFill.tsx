import { forwardRef } from "react"

/** use:action locked | secure, protected, restricted */
const LockFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 6V4a4 4 0 0 0-8 0v2H2.75a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75v-8.5a.75.75 0 0 0-.75-.75zM5.5 6h5V4a2.5 2.5 0 0 0-5 0zm1.75 7V9h1.5v4z"
      clipRule="evenodd"
      />
    </svg>
  )
)
LockFill.displayName = "LockFill"
export { LockFill }
