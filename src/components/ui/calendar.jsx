import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";

const Calendar = ({ ...props }) => {
  return (
    <DayPicker
      mode="single"
      showOutsideDays
      fixedWeeks
      navLayout="around"
      captionLayout="label"
      classNames={{
        caption_label: "tw:font-medium",
        month_grid: cn("tw:w-full"),
        months: "tw:relative tw:flex tw:flex-col tw:sm:flex-row tw:gap-4",
        today: cn("tw:bg-muted"),
        day: "group tw:size-9 tw:text-sm tw:leading-[2.25rem] tw:text-center tw:rounded tw:hover:bg-muted",
        selected: cn(
          "tw:bg-primary tw:text-white tw:hover:bg-primary tw:hover:text-white"
        ),
        outside: "tw:text-secondary",
        weekday:
          "tw:size-9 tw:!border tw:!border-muted tw:text-sm tw:font-medium tw:text-dark-purple tw:leading-[2.25rem] tw:!text-center",
      }}
      {...props}
    />
  );
};

export default Calendar;
