import { forwardRef } from "react"

/** use:action bookmark | save, favorite, flag */
const Bookmark = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 .75A.75.75 0 0 1 2.75 0h10.5a.75.75 0 0 1 .75.75v14.5a.75.75 0 0 1-1.28.53L8 11.06l-4.72 4.72A.75.75 0 0 1 2 15.25zm1.5.75v11.94l3.97-3.97a.75.75 0 0 1 1.06 0l3.97 3.97V1.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Bookmark.displayName = "Bookmark"
export { Bookmark }
