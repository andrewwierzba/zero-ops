import { forwardRef } from "react"

/** use:object SQL Editor | Workspace | query editor, IDE, authoring */
const QueryEditor = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 12H8v-1.5h4zM5.53 11.53 7.56 9.5 5.53 7.47 4.47 8.53l.97.97-.97.97z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V1.75a.75.75 0 0 0-.75-.75zm.75 3V2.5h11V4zm0 1.5v8h11v-8z"
      clipRule="evenodd"
      />
    </svg>
  )
)
QueryEditor.displayName = "QueryEditor"
export { QueryEditor }
