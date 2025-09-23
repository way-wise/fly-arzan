import React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "tw:flex tw:min-h-[80px] tw:w-full tw:rounded-md tw:border tw:border-gray-200 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-white placeholder:tw:text-gray-500 tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-gray-950 tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };