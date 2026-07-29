import { forwardRef } from "react"

/** use:indicator offline | disconnected, no cloud, unavailable */
const CloudOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.97 14.53 2.47 3.03l-1 1 1.628 1.628a4.252 4.252 0 0 0 .723 8.32A.8.8 0 0 0 4 14h7.44l1.53 1.53zM4.077 7.005a.75.75 0 0 0 .29-.078L9.939 12.5H4.115l-.062-.007a2.75 2.75 0 0 1 .024-5.488"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M4.8 3.24a4.75 4.75 0 0 1 7.945 3.293 3.75 3.75 0 0 1 1.928 6.58l-1.067-1.067A2.25 2.25 0 0 0 12.25 8H12a.75.75 0 0 1-.75-.75v-.5a3.25 3.25 0 0 0-5.388-2.448z"
      />
    </svg>
  )
)
CloudOff.displayName = "CloudOff"
export { CloudOff }
