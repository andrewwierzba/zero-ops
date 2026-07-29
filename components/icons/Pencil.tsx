import { forwardRef } from "react"

/** use:action edit | edit, write, modify, rename, compose */
const Pencil = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.487 1.513a1.75 1.75 0 0 0-2.474 0L1.22 11.306a.75.75 0 0 0-.22.53v2.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .53-.22l9.793-9.793a1.75 1.75 0 0 0 0-2.475zm-1.414 1.06a.25.25 0 0 1 .354 0l1.086 1.086a.25.25 0 0 1 0 .354L12 5.525l-1.44-1.44zM9.5 5.146l-7 7v1.44h1.44l7-7z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Pencil.displayName = "Pencil"
export { Pencil }
