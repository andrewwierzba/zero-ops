import { forwardRef } from "react"

/** use:action restart | re-run, refresh and play */
const RefreshPlay = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 1c1.878 0 3.583.74 4.84 1.943l.66.596V2H15v4h-4V4.5h1.326l-.491-.443-.009-.008-.01-.009a5.5 5.5 0 1 0 .083 7.839l1.064 1.057A7 7 0 1 1 8 1"
      />
      <path
      fill="currentColor"
      d="M6.375 5.186a.75.75 0 0 1 .75 0l3.75 2.165.083.055a.75.75 0 0 1-.083 1.243l-3.75 2.166A.75.75 0 0 1 6 10.165v-4.33a.75.75 0 0 1 .375-.65"
      />
    </svg>
  )
)
RefreshPlay.displayName = "RefreshPlay"
export { RefreshPlay }
