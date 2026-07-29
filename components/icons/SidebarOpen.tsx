import { forwardRef } from "react"

/** use:component sidebar open | panel visible, sidebar on */
const SidebarOpen = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13 1a3 3 0 0 1 3 3v8l-.004.154A3 3 0 0 1 13 15H3l-.154-.004a3 3 0 0 1-2.842-2.842L0 12V4a3 3 0 0 1 3-3zM3 2.5A1.5 1.5 0 0 0 1.5 4v8A1.5 1.5 0 0 0 3 13.5h1.5v-11zm3 11h7a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 13 2.5H6z"
      clipRule="evenodd"
      />
    </svg>
  )
)
SidebarOpen.displayName = "SidebarOpen"
export { SidebarOpen }
