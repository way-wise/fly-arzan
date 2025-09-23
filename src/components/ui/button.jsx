import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:!rounded-md tw:text-sm tw:font-medium tw:ring-offset-white tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-gray-950 tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 [&_svg]:tw:pointer-events-none [&_svg]:tw:size-4 [&_svg]:tw:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-gray-900 tw:text-gray-50 tw:hover:bg-gray-900/90",
        destructive: "tw:bg-red-500 tw:text-gray-50 tw:hover:bg-red-500/90",
        outline:
          "tw:border tw:border-gray-200 tw:bg-white tw:hover:bg-gray-100 tw:hover:text-gray-900",
        secondary: "tw:bg-gray-100 tw:text-gray-900 tw:hover:bg-gray-100/80",
        ghost: "tw:hover:bg-gray-100 tw:hover:text-gray-900",
        link: "tw:text-gray-900 tw:underline-offset-4 tw:hover:underline",
      },
      size: {
        default: "tw:h-10 tw:px-4 tw:py-2",
        sm: "tw:h-9 tw:rounded-md tw:px-3",
        lg: "tw:h-11 tw:rounded-md tw:px-8",
        icon: "tw:h-10 tw:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
