import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

export const Progress = ({ isLoading }) => {
  return (
    <div className="tw:flex tw:items-center tw:gap-2">
      <div className="tw:w-full tw:h-1.5 tw:bg-muted tw:rounded-full tw:overflow-hidden">
        <div
          className={cn(
            "tw:size-full tw:bg-primary tw:origin-left tw:origin-right-[50%]",
            isLoading && "tw:!animate-progress"
          )}
        />
      </div>
    </div>
  );
};

Progress.propTypes = {
  isLoading: PropTypes.bool,
};
