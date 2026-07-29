import { forwardRef } from "react"

/** use:indicator error | failure, critical, alert */
const DangerSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.688 3.5c.111 0 .22.044.298.123l2.386 2.387c.08.079.124.186.124.298v3.38c0 .111-.045.22-.124.298l-2.386 2.386a.42.42 0 0 1-.299.124h-3.38a.42.42 0 0 1-.297-.124L3.624 9.986a.42.42 0 0 1-.124-.299v-3.38c0-.111.045-.218.124-.297L6.01 3.623a.42.42 0 0 1 .298-.123zm-1.69 5.604a1.065 1.065 0 1 0 0 2.129 1.065 1.065 0 0 0 0-2.13m-.69-4.341v3.536h1.38V4.763z"
      clipRule="evenodd"
      />
    </svg>
  )
)
DangerSmall.displayName = "DangerSmall"
export { DangerSmall }
