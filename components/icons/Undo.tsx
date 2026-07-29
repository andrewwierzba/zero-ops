import { forwardRef } from "react"

/** use:action undo | revert, go back, ctrl+Z, rollback */
const Undo = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#UndoIcon_svg__a)">
      <path
      fill="currentColor"
      d="M2.81 6.5h8.69a3 3 0 0 1 0 6H7V14h4.5a4.5 4.5 0 0 0 0-9H2.81l2.72-2.72-1.06-1.06-4.53 4.53 4.53 4.53 1.06-1.06z"
      />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M16 16H0V0h16z" />
      </clipPath>
      </defs>
    </svg>
  )
)
Undo.displayName = "Undo"
export { Undo }
