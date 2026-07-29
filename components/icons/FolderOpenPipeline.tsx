import { forwardRef } from "react"

/** use:action Open pipeline folder | expanded DLT directory */
const FolderOpenPipeline = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 1.75A.75.75 0 0 1 .75 1h3.922c.729 0 1.428.29 1.944.805L7.811 3h5.439a.75.75 0 0 1 .75.75V6h1.25a.75.75 0 0 1 .658 1.11L14.56 9.58A4.99 4.99 0 0 0 10.5 7.5H9.25A2.25 2.25 0 0 0 7 9.75v2.5q.002.396.128.75H.75a.747.747 0 0 1-.75-.75zm1.5 7.559L3.092 6.39A.75.75 0 0 1 3.75 6h8.75V4.5h-5a.75.75 0 0 1-.53-.22L5.555 2.866a1.25 1.25 0 0 0-.883-.366H1.5z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.5 9.75A.75.75 0 0 1 9.25 9h1.25a3.5 3.5 0 0 1 3.465 3h.785a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H13.5a3.5 3.5 0 0 1-3.465-3H9.25a.75.75 0 0 1-.75-.75zm1.5.75v1h.5a1 1 0 0 1 1 1 2 2 0 0 0 2 2h.5v-1h-.5a1 1 0 0 1-1-1 2 2 0 0 0-2-2z"
      clipRule="evenodd"
      />
    </svg>
  )
)
FolderOpenPipeline.displayName = "FolderOpenPipeline"
export { FolderOpenPipeline }
