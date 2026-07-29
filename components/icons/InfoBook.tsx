import { forwardRef } from "react"

/** use:object Instructions | AI/BI | knowledge base, review queue, Genie setup */
const InfoBook = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
      fill="currentColor"
      d="M11.75 4.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M12.5 7.75a.75.75 0 0 0-.75-.75h-1.5v1.5H11V11h1.5z"
      />
      <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 2.75A.75.75 0 0 1 .75 2h4.396A3.75 3.75 0 0 1 8 3.317 3.75 3.75 0 0 1 10.854 2h4.396a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.396a2.25 2.25 0 0 0-2.012 1.244l-.171.341a.75.75 0 0 1-1.342 0l-.17-.341A2.25 2.25 0 0 0 5.145 14H.75a.75.75 0 0 1-.75-.75zm1.5.75v9h3.646c.765 0 1.494.233 2.104.646V4.927l-.092-.183A2.25 2.25 0 0 0 5.146 3.5zm7.25 1.427v8.219a3.75 3.75 0 0 1 2.104-.646H14.5v-9h-3.646a2.25 2.25 0 0 0-2.012 1.244z"
      clipRule="evenodd"
      />
    </svg>
  )
)
InfoBook.displayName = "InfoBook"
export { InfoBook }
