import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Merge and conditionally apply Tailwind CSS classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
