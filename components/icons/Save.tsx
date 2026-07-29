import { forwardRef } from "react"

/** use:action save | persist, store, ctrl+S */
const Save = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M10 9.25H6v1.5h4z" />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1 1.75A.75.75 0 0 1 1.75 1H11a.75.75 0 0 1 .53.22l3.25 3.25c.141.14.22.331.22.53v9.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75zm1.5.75H5v3.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V2.81l2.5 2.5v8.19h-11zm4 0h3v3h-3z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Save.displayName = "Save"
export { Save }
