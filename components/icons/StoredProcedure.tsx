import { forwardRef } from "react"

/** use:object Stored procedure | Unity Catalog | function, routine, sproc */
const StoredProcedure = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.514 11.853c.019-.244.075-.478.16-.698L.8 10.458l.936-1.172.872.695q.297-.201.646-.312V8.554h1.5v1.115q.35.111.647.312l.872-.696.935 1.173-.874.697q.129.331.16.698l1.09.248-.334 1.463-1.09-.248a2.5 2.5 0 0 1-.447.559l.486 1.007-1.351.65-.486-1.006a2.5 2.5 0 0 1-.358.027q-.181 0-.358-.027l-.484 1.006-1.352-.65.485-1.006a2.5 2.5 0 0 1-.447-.56l-1.089.248-.334-1.462zm1.49.2a1 1 0 1 0 2 .001 1 1 0 0 0-2 0"
      clipRule="evenodd"
      />
      <circle cx={12.25} cy={3.75} r={2} stroke="currentColor" strokeWidth={1.5} />
      <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M10.25 3.75H6a2 2 0 0 0-2 2V7.5M13.5 12.25h-5M11.5 9.75l2.5 2.5-2.5 2.5"
      />
    </svg>
  )
)
StoredProcedure.displayName = "StoredProcedure"
export { StoredProcedure }
