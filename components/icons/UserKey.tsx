import { forwardRef } from "react"

/** use:object Service principal | IAM | API key user, machine identity */
const UserKey = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.75 4.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0M8 2.5A1.75 1.75 0 1 0 8 6a1.75 1.75 0 0 0 0-3.5M12.75 12.372a2.251 2.251 0 1 0-1.5 0v2.878c0 .414.336.75.75.75h2v-2.75h-1.25zM12 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M1.75 15h8v-1.5H2.5v-.474a7.23 7.23 0 0 1 5.759-2.521 3.8 3.8 0 0 1 .2-1.493 8.735 8.735 0 0 0-7.295 3.275.75.75 0 0 0-.164.469v1.494c0 .414.336.75.75.75"
      />
    </svg>
  )
)
UserKey.displayName = "UserKey"
export { UserKey }
