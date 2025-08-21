import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

export const FilterCollapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="tw:bg-white tw:rounded tw:border tw:border-muted"
    >
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:gap-2 tw:rounded-md tw:transition-colors tw:focus-visible:outline-hidden tw:p-5"
          )}
        >
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:text-[15px] tw:font-semibold">{title}</span>
          </div>
          <ChevronDown
            className={`tw:transition tw:text-secondary tw:stroke-[1.5] ${
              open ? "tw:rotate-180" : "tw:rotate-0"
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="tw:px-5 tw:flex tw:flex-col tw:gap-3 tw:pb-5">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

FilterCollapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
