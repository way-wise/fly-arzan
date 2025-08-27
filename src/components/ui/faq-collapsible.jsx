import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";

export const FaqCollapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="tw:bg-white tw:rounded-[10px] tw:shadow"
    >
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:gap-2 tw:rounded-md tw:transition-colors tw:focus-visible:!outline-hidden tw:p-4 tw:focus-visible:bg-light-purple/10"
          )}
        >
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:md:text-xl tw:text-left tw:font-semibold tw:text-base">
              {title}
            </span>
          </div>
          <Plus
            className={`tw:!shrink-0 tw:transition tw:bg-dark-purple tw:text-white tw:size-8 tw:p-1 tw:rounded-full tw:stroke-[1.5] ${
              open ? "tw:rotate-180" : "tw:rotate-0"
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="tw:px-5 tw:flex tw:flex-col tw:gap-4 tw:pb-5 tw:pt-2.5">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

FaqCollapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
