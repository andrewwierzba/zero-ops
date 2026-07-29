import { forwardRef } from "react"

/** use:object Bundle | Workspace | DAB, suitcase, work */
const BriefcaseFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5 4V2.75C5 1.784 5.784 1 6.75 1h2.5c.966 0 1.75.784 1.75 1.75V4h3.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5A.75.75 0 0 1 1.75 4zm1.5-1.25a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V4h-3zm-4 5.423V6.195A7.72 7.72 0 0 0 8 8.485c2.15 0 4.095-.875 5.5-2.29v1.978A9.2 9.2 0 0 1 8 9.985a9.2 9.2 0 0 1-5.5-1.812"
      clipRule="evenodd"
      />
    </svg>
  )
)
BriefcaseFill.displayName = "BriefcaseFill"
export { BriefcaseFill }
