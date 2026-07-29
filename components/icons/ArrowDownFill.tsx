import { forwardRef } from "react"

/** use:indicator download | arrow down, descend */
const ArrowDownFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 15.75a.75.75 0 0 1-.53-.22L1.22 9.28A.75.75 0 0 1 1.75 8H5.5V.75A.75.75 0 0 1 6.25 0h3.5a.75.75 0 0 1 .75.75V8h3.75a.751.751 0 0 1 .53 1.28l-6.25 6.25-.114.094A.75.75 0 0 1 8 15.75"
      />
    </svg>
  )
)
ArrowDownFill.displayName = "ArrowDownFill"
export { ArrowDownFill }
