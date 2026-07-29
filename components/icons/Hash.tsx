import { forwardRef } from "react"

/** use:object ID | Platform | hash, identifier, number sign */
const Hash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.67 5H15v1.5h-3.536l-.414 3H15V11h-4.156l-.552 4H8.777l.552-4H5.844l-.552 4H3.777l.552-4H1V9.5h3.535l.414-3H1V5h4.156l.552-4h1.515L6.67 5h3.485l.552-4h1.515zM6.05 9.5h3.485l.414-3H6.464z"
      clipRule="evenodd"
      />
    </svg>
  )
)
Hash.displayName = "Hash"
export { Hash }
