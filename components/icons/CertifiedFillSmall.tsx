import { forwardRef } from "react"

/** use:indicator Certified | verified, approved, badge, endorsed */
const CertifiedFillSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 3c.71 0 1.33.37 1.686.928a1.997 1.997 0 0 1 2.385 2.385 1.996 1.996 0 0 1 0 3.373 1.996 1.996 0 0 1-2.385 2.385 1.996 1.996 0 0 1-3.373 0 1.996 1.996 0 0 1-2.385-2.385 1.996 1.996 0 0 1 0-3.373 1.997 1.997 0 0 1 2.385-2.385A2 2 0 0 1 8 3m-.675 5.22-.87-.871-.955.954 1.825 1.825L10.5 6.954 9.546 6z"
      />
    </svg>
  )
)
CertifiedFillSmall.displayName = "CertifiedFillSmall"
export { CertifiedFillSmall }
