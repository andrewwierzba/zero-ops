import { forwardRef } from "react"

/** use:indicator running | in progress, active, spinning */
const Running = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#RunningIcon_svg__a)">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1.5A6.5 6.5 0 0 0 1.5 8H0a8 8 0 0 1 8-8zm0 13A6.5 6.5 0 0 0 14.5 8H16a8 8 0 0 1-8 8z"
      clipRule="evenodd"
      />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
Running.displayName = "Running"
export { Running }
