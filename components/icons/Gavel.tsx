import { forwardRef } from "react"

/** use:object Judges | AI | rules, policy, compliance */
const Gavel = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M4 21v-2h12v2zm5.65-4.85L4 10.5l2.1-2.15L11.8 14zM16 9.8l-5.65-5.7L12.5 2l5.65 5.65zM20.6 20 7.55 6.95l1.4-1.4L22 18.6z"
      />
    </svg>
  )
)
Gavel.displayName = "Gavel"
export { Gavel }
