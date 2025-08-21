import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FaCheck, FaMinus } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "tw:flex tw:size-[18px] tw:shrink-0 tw:items-center tw:justify-center tw:!rounded tw:border-2 tw:border-light-purple tw:focus-visible:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:border-dark-purple tw:data-[state=checked]:bg-dark-purple tw:data-[state=checked]:!text-white tw:data-[state=indeterminate]:border-dark-purple tw:data-[state=indeterminate]:bg-dark-purple tw:data-[state=indeterminate]:!text-white tw:!mt-0.5",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        {props.checked === "indeterminate" ? (
          <FaMinus className="tw:size-3 tw:stroke-2" />
        ) : (
          <FaCheck className="tw:size-3.5 tw:stroke-2" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.string,
};

export { Checkbox };
