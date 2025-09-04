
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

const FlexibleDates = ({ flexibleDates, selectedFlexibleDate, handleFlexibleDateClick, setIsCalendarOpen }) => {
  return (
    <div className="container tw:flex tw:items-center tw:gap-[10px]">
      <div className="tw:flex tw:items-center tw:snap-x tw:overflow-x-auto tw:scrollbar-hide tw:shadow tw:grow tw:divide-x tw:divide-muted tw:bg-white tw:rounded-xl">
        {flexibleDates.map((date) => (
          <label
            key={date.id}
            className={cn(
              "tw:snap-center tw:basis-[100px] tw:shrink-0 tw:!flex tw:flex-col tw:justify-center tw:gap-1 tw:!py-[24px] tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:h-[93px] tw:first:rounded-l-xl tw:last:rounded-r-xl tw:relative",
              selectedFlexibleDate === date.id && "tw:bg-primary",
              date.isCheapest &&
                selectedFlexibleDate !== date.id &&
                "tw:bg-green-50",
              date.isRecommended &&
                selectedFlexibleDate !== date.id &&
                "tw:bg-blue-50"
            )}
            onClick={() => handleFlexibleDateClick(date.id)}
          >
            {/* Indicator for cheapest/recommended */}
            {(date.isCheapest || date.isRecommended) && (
              <div className="tw:absolute tw:top-2 tw:right-2">
                <div
                  className={cn(
                    "tw:w-2 tw:h-2 tw:rounded-full",
                    date.isCheapest && "tw:bg-green-500",
                    date.isRecommended && "tw:bg-blue-500"
                  )}
                />
              </div>
            )}
            <span
              className={cn(
                "tw:text-[14px] tw:font-medium tw:text-secondary",
                selectedFlexibleDate === date.id && "tw:text-white"
              )}
            >
              {date.date}
            </span>
            <span
              className={cn(
                "tw:text-[20px] tw:font-semibold",
                selectedFlexibleDate === date.id && "tw:text-white",
                selectedFlexibleDate !== date.id &&
                  date.isCheapest &&
                  "tw:text-green-600",
                selectedFlexibleDate !== date.id &&
                  date.isRecommended &&
                  "tw:text-blue-600",
                selectedFlexibleDate !== date.id &&
                  !date.isCheapest &&
                  !date.isRecommended &&
                  "tw:text-primary"
              )}
            >
              {date.price}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={() => setIsCalendarOpen(true)}
        className="tw:!rounded-xl tw:hidden tw:bg-white tw:shadow tw:md:flex tw:flex-col tw:items-center tw:gap-2 tw:!py-[24px] tw:!px-[20px] tw:h-[93px] tw:shrink-0 tw:hover:shadow-lg tw:transition-shadow tw:cursor-pointer"
      >
        <CalendarDays
          size={20}
          className="tw:text-secondary tw:shrink-0"
        />
        <span className="tw:text-[14px] tw:font-medium">
          Flexible Dates
        </span>
      </button>
    </div>
  );
};

export default FlexibleDates;
