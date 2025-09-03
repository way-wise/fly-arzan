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
      disabled={{ before: new Date() }}
      classNames={{
        root: "tw:relative",
        caption_label: "tw:font-medium",
        month_grid: cn("tw:w-full tw:mt-4"),
        month_caption: "tw:text-center",
        today: cn(
          "tw:relative tw:after:absolute tw:after:content-[' '] tw:after:bottom-0 tw:after:left-1/2 tw:after:-translate-x-1/2 tw:after:w-2.5 tw:after:h-1 tw:after:bg-primary tw:after:rounded-full"
        ),
        day: "group tw:size-9 tw:text-sm tw:leading-[2.25rem] tw:text-center tw:rounded tw:hover:bg-muted",
        selected: cn(
          "tw:bg-primary tw:text-white tw:hover:bg-primary tw:hover:text-white"
        ),
        outside: "tw:text-secondary",
        weekday:
          "tw:size-9 tw:!border tw:!border-muted tw:text-sm tw:font-medium tw:text-dark-purple tw:leading-[2.25rem] tw:!text-center",
        button_previous: "tw:absolute tw:left-0 tw:top-0",
        button_next: "tw:absolute tw:right-0 tw:top-0",
      }}
      {...props}
    />
  );
};

export default Calendar;
