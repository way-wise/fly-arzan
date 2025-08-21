import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

function Collapsible({ ...props }) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({ className, children, ...props }) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "tw:overflow-hidden tw:transition-[height] tw:data-[state=closed]:animate-collapsible-collapse tw:data-[state=open]:animate-collapsible-expand",
        className
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
}

CollapsibleContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
