import { forwardRef } from "react"

/** use:component loading | spinner, progress, waiting */
const Loading = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M23.212 12a.79.79 0 0 1-.789-.788 9.6 9.6 0 0 0-.757-3.751 9.66 9.66 0 0 0-5.129-5.129 9.6 9.6 0 0 0-3.749-.755.788.788 0 0 1 0-1.577c1.513 0 2.983.296 4.365.882a11.1 11.1 0 0 1 3.562 2.403 11.157 11.157 0 0 1 3.283 7.927.785.785 0 0 1-.786.788"
      clipRule="evenodd"
      />
    </svg>
  )
)
Loading.displayName = "Loading"
export { Loading }
