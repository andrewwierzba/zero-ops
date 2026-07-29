import { forwardRef } from "react"

/** use:indicator question | help, FAQ, support */
const QuestionMark = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M7.25 10.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0M10.079 7.111A2.25 2.25 0 1 0 5.75 6.25h1.5A.75.75 0 1 1 8 7a.75.75 0 0 0-.75.75V9h1.5v-.629a2.25 2.25 0 0 0 1.329-1.26"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13"
      clipRule="evenodd"
      />
    </svg>
  )
)
QuestionMark.displayName = "QuestionMark"
export { QuestionMark }
