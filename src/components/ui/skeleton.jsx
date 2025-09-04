import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("tw:bg-muted/50 tw:animate-pulse tw:rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
