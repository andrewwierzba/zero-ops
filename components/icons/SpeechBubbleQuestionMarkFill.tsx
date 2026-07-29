import { forwardRef } from "react"

/** use:action Help | support, FAQ, ask a question */
const SpeechBubbleQuestionMarkFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 7a6 6 0 0 1 6-6h4a6 6 0 0 1 0 12h-.94l-2.78 2.78A.75.75 0 0 1 5 15.25v-2.299A5.75 5.75 0 0 1 0 7.25zm10.079-.389A2.25 2.25 0 1 0 5.75 5.75h1.5A.75.75 0 1 1 8 6.5h-.75V8H8a2.25 2.25 0 0 0 2.079-1.389M8 10.5A.75.75 0 1 1 8 9a.75.75 0 0 1 0 1.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
SpeechBubbleQuestionMarkFill.displayName = "SpeechBubbleQuestionMarkFill"
export { SpeechBubbleQuestionMarkFill }
