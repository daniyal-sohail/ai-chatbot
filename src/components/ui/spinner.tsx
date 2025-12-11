import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, noPadding, ...props }: React.ComponentProps<"svg"> & { noPadding?: boolean }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className, noPadding ? '' : 'py-10')}
      {...props}
    />
  )
}

export { Spinner }
