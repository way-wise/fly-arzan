import * as SelectPrimitive from "@goto-bus-stop/radix-select-nonmodal";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

function Select({ ...props }) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className="tw:text-secondary"
      {...props}
    />
  );
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-2 tw:py-2 tw:px-3 tw:!rounded-md tw:border tw:border-muted tw:bg-white tw:text-[15px] tw:font-semibold tw:shadow-xs tw:transition tw:outline-none focus-visible:tw:border-primary focus-visible:tw:ring-0 disabled:tw:cursor-not-allowed tw:select-none disabled:tw:opacity-50 tw:focus-visible:!outline-hidden",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTrigger.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "default"]),
  children: PropTypes.node,
};

function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:w-[var(--radix-select-trigger-width)] tw:mt-2 tw:border tw:border-muted tw:transition tw:duration-200 tw:ease-out tw:empty:invisible tw:data-[state=closed]:scale-95 tw:data-[state=closed]:opacity-0 tw:bg-white tw:shadow-lg tw:rounded-lg tw:!z-50 tw:overflow-hidden tw:!p-2",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

SelectContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  position: PropTypes.oneOf(["popper", "fixed"]),
};

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "tw:text-secondary tw:px-2 tw:py-1.5 tw:text-xs",
        className
      )}
      {...props}
    />
  );
}

SelectLabel.propTypes = {
  className: PropTypes.string,
};

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "tw:w-full tw:focus:bg-muted/50 tw:py-2 tw:px-3 tw:rounded-md tw:flex tw:items-center tw:gap-2 tw:truncate tw:cursor-default data-[disabled]:tw:pointer-events-none data-[disabled]:tw:opacity-50",
        className
      )}
      {...props}
    >
      <span className="tw:absolute tw:right-2 tw:flex tw:size-3.5 tw:items-center tw:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="tw:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

SelectItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "tw:bg-muted tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px",
        className
      )}
      {...props}
    />
  );
}

SelectSeparator.propTypes = {
  className: PropTypes.string,
};

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

SelectScrollUpButton.propTypes = {
  className: PropTypes.string,
};

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

SelectScrollDownButton.propTypes = {
  className: PropTypes.string,
};

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
