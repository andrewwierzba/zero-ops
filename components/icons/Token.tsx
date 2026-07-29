import { forwardRef } from "react"

/** use:object Access token | IAM | credential, auth token, PAT */
const Token = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="TokenIcon_svg__a" fill="#fff">
      <path d="M5.596 10.799a5 5 0 1 0 .082-9.621l.258.94a4.025 4.025 0 1 1-.066 7.745z" />
      </mask>
      <path
      stroke="currentColor"
      strokeWidth={2}
      d="M5.596 10.799a5 5 0 1 0 .082-9.621l.258.94a4.025 4.025 0 1 1-.066 7.745z"
      mask="url(#TokenIcon_svg__a)"
      />
      <circle cx={5} cy={6} r={4.5} stroke="currentColor" />
      <circle cx={5} cy={6} r={1.5} stroke="currentColor" />
    </svg>
  )
)
Token.displayName = "Token"
export { Token }
