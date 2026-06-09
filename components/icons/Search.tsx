import { forwardRef } from "react"

/** use:component search | keyword search, find, lookup, discover */
const Search = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#SearchIcon_svg__a)">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1a7 7 0 1 0 4.39 12.453l2.55 2.55 1.06-1.06-2.55-2.55A7 7 0 0 0 8 1M2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0"
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
Search.displayName = "Search"
export { Search }
