import { forwardRef } from "react"

/** use:action new conversation | new chat, start thread */
const NewChat = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8.318 2.5H3.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V7.682l1.5-1.5v6.068A2.75 2.75 0 0 1 12.25 15h-8.5A2.75 2.75 0 0 1 1 12.25v-8.5A2.75 2.75 0 0 1 3.75 1h6.068z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.263.677a1.75 1.75 0 0 1 2.474 0l.586.586a1.75 1.75 0 0 1 0 2.475L9.28 9.78a.75.75 0 0 1-.53.22h-2A.75.75 0 0 1 6 9.25v-2c0-.2.08-.39.22-.531zM7.5 7.561v.94h.94l4-4-.94-.94zm6.177-5.823a.25.25 0 0 0-.354 0l-.763.762.94.94.763-.763a.25.25 0 0 0 0-.353z"
      clipRule="evenodd"
      />
    </svg>
  )
)
NewChat.displayName = "NewChat"
export { NewChat }
