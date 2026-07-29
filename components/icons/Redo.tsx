import { forwardRef } from "react"

/** use:action redo | redo, ctrl+Y, repeat */
const Redo = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#RedoIcon_svg__a)">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="m13.19 5-2.72-2.72 1.06-1.06 4.53 4.53-4.53 4.53-1.06-1.06 2.72-2.72H4.5a3 3 0 1 0 0 6H9V14H4.5a4.5 4.5 0 0 1 0-9z"
      clipRule="evenodd"
      />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 16h16V0H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
Redo.displayName = "Redo"
export { Redo }
