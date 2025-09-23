import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "tw:flex tw:h-10 tw:w-full tw:rounded-md tw:border tw:border-gray-200 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-white file:tw:border-0 file:tw:bg-transparent file:tw:text-sm file:tw:font-medium file:tw:text-gray-950 placeholder:tw:text-gray-500 tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-gray-950 tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };