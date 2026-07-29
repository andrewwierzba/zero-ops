import { forwardRef } from "react"

/** use:object Hardware | Compute | GPU, processor, accelerator */
const Chip = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M10 10H6V6h4z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7 3h2V1h1.5v2h1.75a.75.75 0 0 1 .75.75V5.5h2V7h-2v2h2v1.5h-2v1.75a.75.75 0 0 1-.75.75H10.5v2H9v-2H7v2H5.5v-2H3.75a.75.75 0 0 1-.75-.75V10.5H1V9h2V7H1V5.5h2V3.75A.75.75 0 0 1 3.75 3H5.5V1H7zm-2.5 8.5h7v-7h-7z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Chip.displayName = "Chip"
export { Chip }
