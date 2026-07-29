import { forwardRef } from "react"

/** use:action reader view | read mode, focus mode, clean view */
const ReaderMode = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M13 4.5h-3V6h3zM13 7.25h-3v1.5h3zM13 10h-3v1.5h3z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M.75 2a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h14.5a.75.75 0 0 0 .75-.75V2.75a.75.75 0 0 0-.75-.75zm.75 10.5v-9h5.75v9zm7.25 0h5.75v-9H8.75z"
      clipRule="evenodd"
      />
    </svg>
  )
)
ReaderMode.displayName = "ReaderMode"
export { ReaderMode }
