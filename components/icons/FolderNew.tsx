import { forwardRef } from "react"

/** use:action new folder | create directory */
const FolderNew = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M.75 2a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75H7.5v-1.5h-6v-9h3.172c.331 0 .649.132.883.366L6.97 5.28c.14.141.331.22.53.22h7V8H16V4.75a.75.75 0 0 0-.75-.75H7.81L6.617 2.805A2.75 2.75 0 0 0 4.672 2z"
      />
      <path fill="currentColor" d="M11.25 11.25V9h1.5v2.25H15v1.5h-2.25V15h-1.5v-2.25H9v-1.5z" />
    </svg>
  )
)
FolderNew.displayName = "FolderNew"
export { FolderNew }
