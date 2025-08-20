import { cn } from "@/lib/utils";
import {
  Combobox as ComboboxPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxOption as ComboboxOptionPrimitive,
  ComboboxOptions as ComboboxOptionsPrimitive,
} from "@headlessui/react";
import PropTypes from "prop-types";

// Combobox Root
const Combobox = ({ children, ...props }) => {
  return <ComboboxPrimitive {...props}>{children}</ComboboxPrimitive>;
};

Combobox.propTypes = {
  children: PropTypes.node,
};

// Combobox Input
const ComboboxInput = ({ children, ...props }) => {
  return <ComboboxInputPrimitive {...props}>{children}</ComboboxInputPrimitive>;
};

ComboboxInput.propTypes = {
  children: PropTypes.node,
};

// Combobox Options
const ComboboxOptions = ({ children, ...props }) => {
  return (
    <ComboboxOptionsPrimitive
      {...props}
      anchor="bottom start"
      transition
      className={cn(
        "tw:origin-top tw:mt-2 tw:border tw:border-muted tw:transition tw:duration-200 tw:ease-out tw:empty:invisible tw:data-closed:scale-95 tw:data-closed:opacity-0 tw:bg-white tw:shadow-lg tw:rounded-lg tw:z-20 tw:p-3",
        props.className
      )}
    >
      {children}
    </ComboboxOptionsPrimitive>
  );
};

ComboboxOptions.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
};

// Combobox Option
const ComboboxOption = ({ children, ...props }) => {
  return (
    <ComboboxOptionPrimitive
      {...props}
      className={cn(
        "tw:w-full tw:data-focus:bg-muted/50 tw:py-2 tw:px-3 tw:rounded-md tw:flex tw:items-center tw:gap-2 tw:truncate tw:cursor-default"
      )}
    >
      {children}
    </ComboboxOptionPrimitive>
  );
};

ComboboxOption.propTypes = {
  children: PropTypes.node,
};

export { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions };
