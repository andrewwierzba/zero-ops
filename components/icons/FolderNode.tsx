import { forwardRef } from "react"

/** use:object Linked Folder | Workspace | folder in tree, connected */
const FolderNode = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.217 1c.713 0 1.4.277 1.912.772l.58.561h5.541l.077.004a.75.75 0 0 1 .673.746V9.75a.75.75 0 0 1-.75.75h-4.5v1.13A2.25 2.25 0 0 1 10.12 13H14v1.5h-3.88a2.248 2.248 0 0 1-4.24 0H2V13h3.88a2.25 2.25 0 0 1 1.37-1.37V10.5h-4.5A.75.75 0 0 1 2 9.75v-8l.004-.077A.75.75 0 0 1 2.75 1zM8 13a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M3.5 9h9V3.833H7.405a.75.75 0 0 1-.408-.12l-.113-.09-.798-.771a1.25 1.25 0 0 0-.87-.352H3.5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
FolderNode.displayName = "FolderNode"
export { FolderNode }
