import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

function Popover({ ...props }) {
  return <PopoverPrimitive.Root data-slot="popover" modal={true} {...props} />;
}

function PopoverTrigger({ ...props }) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "tw:origin-top tw:w-[var(--radix-popover-trigger-width)] tw:border tw:border-muted tw:transition tw:duration-200 tw:ease-out tw:data-[state=closed]:scale-95 tw:data-[state=closed]:opacity-0 tw:bg-white tw:shadow-lg tw:rounded-lg tw:z-50 tw:p-3",
          className
        )}
        {...props}
      >
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

PopoverContent.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf(["start", "center", "end"]),
  sideOffset: PropTypes.number,
  children: PropTypes.node,
};

function PopoverAnchor({ ...props }) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
