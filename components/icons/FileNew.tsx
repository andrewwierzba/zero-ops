import { forwardRef } from "react"

/** use:action new file | create file, blank document */
const FileNew = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 .75A.75.75 0 0 1 2.75 0h6a.75.75 0 0 1 .53.22l4.5 4.5c.141.14.22.331.22.53V7.5h-1.5V6H8.75A.75.75 0 0 1 8 5.25V1.5H3.5v12h4V15H2.75a.75.75 0 0 1-.75-.75zm7.5 1.81 1.94 1.94H9.5z"
      clipRule="evenodd"
      />
      <path fill="currentColor" d="M11.25 15v-2.25H9v-1.5h2.25V9h1.5v2.25H15v1.5h-2.25V15z" />
    </svg>
  )
)
FileNew.displayName = "FileNew"
export { FileNew }
