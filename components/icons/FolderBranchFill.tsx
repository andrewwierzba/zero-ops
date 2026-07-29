import { forwardRef } from "react"

/** use:object Git Folder | Git | git folder, versioned directory */
const FolderBranchFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M.75 2a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75H5.5c0-.98.403-1.866 1.05-2.5a3.5 3.5 0 1 1 5.945-2.661 3.5 3.5 0 0 1 1.505-.339c.744 0 1.433.232 2 .627V4.75a.75.75 0 0 0-.75-.75H7.81L6.617 2.805A2.75 2.75 0 0 0 4.672 2z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.75 12.145a2 2 0 1 1-1.5 0v-1.29a2 2 0 1 1 2.538-.957c.3.585.812 1.017 1.416 1.221a2 2 0 1 1-.096 1.53 4 4 0 0 1-2.358-1.577zM8.5 14a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m5.5-2.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1M8.5 9a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0"
      clipRule="evenodd"
      />
    </svg>
  )
)
FolderBranchFill.displayName = "FolderBranchFill"
export { FolderBranchFill }
