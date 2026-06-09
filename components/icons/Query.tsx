import { forwardRef } from "react"

/** use:object Query | Workspace | sql query, editor, code file */
const Query = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" clipPath="url(#QueryIcon_svg__a)">
      <path
      fillRule="evenodd"
      d="M2 1.75A.75.75 0 0 1 2.75 1h6a.75.75 0 0 1 .53.22l4.5 4.5c.141.14.22.331.22.53V10h-1.5V7H8.75A.75.75 0 0 1 8 6.25V2.5H3.5V16h-.75a.75.75 0 0 1-.75-.75zm7.5 1.81 1.94 1.94H9.5z"
      clipRule="evenodd"
      />
      <path d="M5.53 9.97 8.56 13l-3.03 3.03-1.06-1.06L6.44 13l-1.97-1.97zM14 14.5H9V16h5z" />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
Query.displayName = "Query"
export { Query }
