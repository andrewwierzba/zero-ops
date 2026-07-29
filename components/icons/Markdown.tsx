import { forwardRef } from "react"

/** use:action Markdown | md, formatted text */
const Markdown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="m13.75 10.125 1.207-1.268 1.086 1.035L13 13.088 9.957 9.892l1.086-1.035 1.207 1.268V6h1.5zM7.743 3.297A.752.752 0 0 1 9.05 3.8V13h-1.5V5.746L5.056 8.503a.75.75 0 0 1-1.118-.008L1.55 5.785V13H.05V3.8a.75.75 0 0 1 1.312-.496l3.145 3.569z"
      />
    </svg>
  )
)
Markdown.displayName = "Markdown"
export { Markdown }
