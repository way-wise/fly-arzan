import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

function Popover({ open: controlledOpen, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (newOpen) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  // Create refs for trigger and content
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const popoverRef = useRef(null);

  // Handle click outside to close (but not on trigger)
  useOnClickOutside(popoverRef, (event) => {
    // Don't close if clicking on the trigger
    if (triggerRef.current && triggerRef.current.contains(event.target)) {
      return;
    }
    if (open) setOpen(false);
  });

  // Focus on content when it opens
  useEffect(() => {
    if (open && contentRef.current) {
      // Small delay to ensure the content is rendered
      setTimeout(() => {
        contentRef.current.focus();
      }, 0);
    }
  }, [open]);

  // Clone children and pass necessary props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // Use displayName instead of direct component reference for HMR compatibility
    const displayName = child.type.displayName || child.type.name;

    if (displayName === "PopoverTrigger") {
      return React.cloneElement(child, {
        onClick: (e) => {
          e.stopPropagation();
          setOpen(!open);
        },
        ref: triggerRef,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
      });
    }

    if (displayName === "PopoverContent") {
      return React.cloneElement(child, {
        open,
        ref: contentRef,
        "data-state": open ? "open" : "closed",
      });
    }

    return child;
  });

  return (
    <div ref={popoverRef} className="tw:relative">
      {childrenWithProps}
    </div>
  );
}

Popover.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  children: PropTypes.node,
};

// Popover Trigger
const PopoverTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("tw:cursor-pointer", className)}
        data-slot="popover-trigger"
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

PopoverTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  asChild: PropTypes.bool,
};

// Popover Content
const PopoverContent = React.forwardRef(
  ({ className, open, align = "end", sideOffset = 8, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        data-slot="popover-content"
        tabIndex={-1}
        style={{ marginTop: `${sideOffset}px` }}
        className={cn(
          "tw:absolute tw:min-w-[300px] tw:!w-max tw:border tw:border-muted tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:bg-white tw:shadow-lg tw:rounded-lg tw:z-50 tw:p-3 tw:outline-none",
          // Positioning based on align prop
          align === "start" && "tw:left-0 tw:origin-top-left",
          align === "center" &&
            "tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:origin-top",
          align === "end" && "tw:right-0 tw:origin-top-right",
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

PopoverContent.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  align: PropTypes.oneOf(["start", "center", "end"]),
  sideOffset: PropTypes.number,
  children: PropTypes.node,
};

export { Popover, PopoverContent, PopoverTrigger };
