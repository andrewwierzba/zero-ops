import { forwardRef } from "react"

/** use:action cursor | pointer, selection, select */
const Cursor = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#CursorIcon_svg__a)">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.22 1.22a.75.75 0 0 1 .802-.169l13.5 5.25a.75.75 0 0 1-.043 1.413L9.597 9.597l-1.883 5.882a.75.75 0 0 1-1.413.043l-5.25-13.5a.75.75 0 0 1 .169-.802m1.847 1.847 3.864 9.937 1.355-4.233a.75.75 0 0 1 .485-.485l4.233-1.355z"
      clipRule="evenodd"
      />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M16 0H0v16h16z" />
      </clipPath>
      </defs>
    </svg>
  )
)
Cursor.displayName = "Cursor"
export { Cursor }
