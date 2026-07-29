import { forwardRef } from "react"

/** use:object Connection | Unity Catalog | linked, joined, related */
const ArrowsConnect = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M5 9H3.5V7.56l-.634.634a1.25 1.25 0 0 0-.366.884V15H1V9.078c0-.73.29-1.429.806-1.944l.633-.634H1V5h4zM10.78 10.22l-1.06 1.06-.97-.97V15h-1.5v-4.69l-.97.97-1.06-1.06L8 7.44zM15 6.5h-1.44l.634.634A2.75 2.75 0 0 1 15 9.078V15h-1.5V9.078c0-.331-.132-.65-.366-.884L12.5 7.56V9H11V5h4z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 0a2.75 2.75 0 1 1 0 5.5A2.75 2.75 0 0 1 8 0m0 1.5A1.25 1.25 0 1 0 8 4a1.25 1.25 0 0 0 0-2.5"
      clipRule="evenodd"
      />
    </svg>
  )
)
ArrowsConnect.displayName = "ArrowsConnect"
export { ArrowsConnect }
