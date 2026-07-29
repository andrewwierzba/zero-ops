import { forwardRef } from "react"

/** use:action Text widget | AI/BI | text box, text input, label */
const TextBox = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.75 1a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V1.75a.75.75 0 0 0-.75-.75zm.75 12.5v-11h11v11zM5 6h2.25v5.5h1.5V6H11V4.5H5z"
      clipRule="evenodd"
      />
    </svg>
  )
)
TextBox.displayName = "TextBox"
export { TextBox }
