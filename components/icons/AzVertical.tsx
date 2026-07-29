import { forwardRef } from "react"

/** use:action sort A-Z | alphabetical vertical, ascending text */
const AzVertical = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" fillRule="evenodd" clipPath="url(#AZVerticalIcon_svg__a)" clipRule="evenodd">
      <path d="M7.996 0a.75.75 0 0 1 .695.468L11.343 7h-1.62l-.405-1H6.675l-.406 1H4.65L7.301.468A.75.75 0 0 1 7.996 0m-.712 4.5h1.425l-.713-1.756zM8.664 9.5H4.996V8h5.25a.75.75 0 0 1 .58 1.225L7.33 13.5h3.667V15h-5.25a.75.75 0 0 1-.58-1.225z" />
      </g>
      <defs>
      <clipPath>
      <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      </defs>
    </svg>
  )
)
AzVertical.displayName = "AzVertical"
export { AzVertical }
