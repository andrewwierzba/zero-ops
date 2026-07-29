import { forwardRef } from "react"

/** use:action Rich text | formatted text, WYSIWYG */
const RichText = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M16 16H2v-1.5h14zM16 12.75H2v-1.5h14zM9 3.5H6.25v6.25h-1.5V3.5H2V2h7zM16 9.75h-5.5v-1.5H16zM16 6.75h-5.5v-1.5H16zM16 3.5h-5.5V2H16z"
      />
    </svg>
  )
)
RichText.displayName = "RichText"
export { RichText }
