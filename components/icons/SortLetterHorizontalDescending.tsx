import { forwardRef } from "react"

/** use:action sort Z-A | alphabetical descending */
const SortLetterHorizontalDescending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" clipPath="url(#SortLetterHorizontalDescendingIcon_svg__a)">
      <path d="M.94 4 4.97-.03l1.06 1.06-2.22 2.22H10v1.5H3.81l2.22 2.22-1.06 1.06z" />
      <path
      fillRule="evenodd"
      d="M4.307 9a.75.75 0 0 1 .697.473L7.596 16H5.982l-.238-.6H2.855l-.24.6H1l2.61-6.528A.75.75 0 0 1 4.307 9m-.852 4.9h1.693l-.844-2.124z"
      clipRule="evenodd"
      />
      <path d="M11.777 10.5H8.5V9h4.75a.75.75 0 0 1 .607 1.191L10.723 14.5H14V16H9.25a.75.75 0 0 1-.607-1.191z" />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
SortLetterHorizontalDescending.displayName = "SortLetterHorizontalDescending"
export { SortLetterHorizontalDescending }
