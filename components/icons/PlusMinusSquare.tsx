import { forwardRef } from "react"

/** use:action increment/decrement | plus minus, counter, stepper */
const PlusMinusSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M7.25 4.25V6H5.5v1.5h1.75v1.75h1.5V7.5h1.75V6H8.75V4.25zM10.5 10.5h-5V12h5z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V1.75a.75.75 0 0 0-.75-.75zm.75 12.5v-11h11v11z"
      clipRule="evenodd"
      />
    </svg>
  )
)
PlusMinusSquare.displayName = "PlusMinusSquare"
export { PlusMinusSquare }
