import { forwardRef } from "react"

/** use:object App | Workspace | Custom app, Databricks Apps */
const CustomApp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.03 3.5A4.516 4.516 0 0 0 6.115 5H2.373l2.975 3.5h8.28l-.637-.752c.42-.28.79-.628 1.095-1.028l1.737 2.044A.751.751 0 0 1 15.252 10h-1.78l2.351 2.764A.75.75 0 0 1 15.252 14H5.002a.75.75 0 0 1-.571-.264l-4.252-5A.75.75 0 0 1 .749 7.5h1.78L.18 4.736A.752.752 0 0 1 .749 3.5zM2.373 9l2.975 3.5h8.28L11.504 10H5.002a.75.75 0 0 1-.571-.264L3.805 9z"
      clipRule="evenodd"
      />
      <path
      fill="currentColor"
      d="M10.5.5c.426 0 .79.306.863.725l.178 1.023a.875.875 0 0 0 .712.712l1.023.178a.875.875 0 0 1 0 1.724l-1.023.178a.875.875 0 0 0-.712.712l-.178 1.023a.875.875 0 0 1-1.724 0L9.46 5.752a.875.875 0 0 0-.712-.712l-1.023-.178a.876.876 0 0 1 0-1.724L8.75 2.96a.875.875 0 0 0 .712-.712l.178-1.023A.876.876 0 0 1 10.5.5"
      />
    </svg>
  )
)
CustomApp.displayName = "CustomApp"
export { CustomApp }
