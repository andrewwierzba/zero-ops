import { forwardRef } from "react"

/** use:indicator serverless | instant, auto-provisioned */
const LightningCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m.763 3.927a.38.38 0 0 0-.428.13l-3.326 4.35a.384.384 0 0 0 .304.616h1.664v2.687a.383.383 0 0 0 .688.233l3.326-4.35a.384.384 0 0 0-.304-.616H9.023V4.29a.38.38 0 0 0-.26-.363"
      />
    </svg>
  )
)
LightningCircleFill.displayName = "LightningCircleFill"
export { LightningCircleFill }
