import { Drawer as DrawerPrimitive } from "vaul";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "tw:fixed tw:flex tw:flex-col tw:bg-white tw:outline-none tw:border-muted",
  {
    variants: {
      side: {
        top: "tw:inset-x-0 tw:top-0 tw:max-h-[calc(100%-6rem)] tw:border-b",
        bottom:
          "tw:inset-x-0 tw:bottom-0 tw:max-h-[calc(100%-6rem)] tw:border-t",
        left: "tw:inset-y-0 tw:left-0 tw:h-full tw:w-72 tw:border-r",
        right: "tw:inset-y-0 tw:right-0 tw:h-full tw:w-72 tw:border-l",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

function Drawer({ direction = "left", ...props }) {
  return (
    <DrawerPrimitive.Root autoFocus={true} direction={direction} {...props} />
  );
}

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerHandle = DrawerPrimitive.Handle;

const DrawerClose = DrawerPrimitive.Close;

function DrawerContent({ className, children, side, ...props }) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="tw:fixed tw:inset-0 tw:z-50 tw:bg-black/70" />
      <DrawerPrimitive.Content
        className={cn(sheetVariants({ side }), "tw:!z-[999]", className)}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "tw:flex tw:h-16 tw:shrink-0 tw:flex-wrap tw:items-center tw:justify-between tw:border-b tw:border-muted tw:px-6",
        className
      )}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      className={cn("tw:text-lg tw:font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      className={cn("tw:text-sm tw:font-medium tw:text-secondary", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerHandle,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
};
