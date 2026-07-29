import { forwardRef } from "react"

/** use:action heading 4 | minor heading */
const H4 = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M2.5 7.25H6V3h1.5v10H6V8.75H2.5V13H1V3h1.5zM13.249 3a.75.75 0 0 1 .75.75L14 9.5h1V11h-1v2h-1.5v-2H9.25a.75.75 0 0 1-.75-.75V9.5a.75.75 0 0 1 .097-.37l3.25-5.75.055-.083A.75.75 0 0 1 12.5 3zm-3.137 6.5H12.5l-.001-4.224z"
      />
    </svg>
  )
)
H4.displayName = "H4"
export { H4 }
