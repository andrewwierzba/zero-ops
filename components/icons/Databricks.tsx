import { forwardRef } from "react"

/** use:object brand | databricks, logo, company */
const Databricks = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M15.2809 11.8434V9.00724L14.9591 8.83375L7.6397 12.8556L0.689666 9.03733L0.69115 7.39278L7.6397 11.168L15.2809 7.01138V4.2183L14.9591 4.04481L7.6397 8.06667L0.975916 4.40469L7.6397 0.765661L13.0206 3.70356L13.424 3.48418V3.15727L7.6397 0L0 4.17099V4.58249L7.6397 8.75063L14.5898 4.95672V6.61995L7.6397 10.4382L0.321845 6.41778L0 6.59127V9.42591L7.6397 13.5826L14.5898 9.8016V11.4548L7.6397 15.2731L0.321845 11.2512L0 11.4247V11.8434L7.6397 16L15.2809 11.8434Z" fill="currentColor"/>
</svg>
  )
)
Databricks.displayName = "Databricks"
export { Databricks }
