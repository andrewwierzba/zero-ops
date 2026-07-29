import { forwardRef } from "react"

/** use:action light mode | day mode, light theme */
const Sun = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8.75 16h-1.5v-3h1.5zM4.995 12.065l-2.121 2.123-1.06-1.061 2.12-2.122zM14.188 13.127l-1.061 1.06-2.121-2.122 1.06-1.06z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 4.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5m0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M3 8.75H0v-1.5h3zM16 8.75h-3v-1.5h3zM4.995 3.935l-1.06 1.06-2.122-2.122 1.061-1.06zM14.188 2.873l-2.122 2.122-1.06-1.06 2.121-2.122zM8.75 3h-1.5V0h1.5z"
      />
    </svg>
  )
)
Sun.displayName = "Sun"
export { Sun }
