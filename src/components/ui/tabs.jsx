import * as TabsPrimitive from "@radix-ui/react-tabs";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "tw:flex tw:items-center tw:border-none tw:gap-3 tw:overflow-x-auto",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "tw:border-b tw:border-none tw:!text-white tw:data-[state=active]:bg-primary tw:data-[state=active]:border-primary tw:flex tw:items-center tw:gap-2 tw:text-base tw:md:!text-xl tw:capitalize tw:!p-2 tw:!rounded-lg",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none tw:!p-5", className)}
      {...props}
    />
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
};

TabsList.propTypes = {
  className: PropTypes.string,
};

TabsTrigger.propTypes = {
  className: PropTypes.string,
};

TabsContent.propTypes = {
  className: PropTypes.string,
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
