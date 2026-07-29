import { forwardRef } from "react"

/** use:object Document File | Workspace | text, document */
const FileDocument = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 1.75A.75.75 0 0 1 2.75 1h6a.75.75 0 0 1 .53.22l4.5 4.5c.141.14.22.331.22.53V10h-1.5V7H8.75A.75.75 0 0 1 8 6.25V2.5H3.5V16H2zm7.5 1.81 1.94 1.94H9.5z"
      clipRule="evenodd"
      />
      <path fill="currentColor" d="M5 11.5V13h9v-1.5zM14 16H5v-1.5h9z" />
    </svg>
  )
)
FileDocument.displayName = "FileDocument"
export { FileDocument }
