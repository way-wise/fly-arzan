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
        root: "tw:relative tw:p-1",
        caption_label: "tw:font-semibold tw:text-gray-900",
        month_grid: "tw:w-full tw:mt-2",
        month_caption: "tw:text-center",
        day: "tw:size-10 tw:text-center tw:!border tw:!border-muted/30",
        day_button:
          "tw:size-full tw:hover:bg-primary tw:hover:!text-white tw:disabled:!text-secondary tw:disabled:!bg-transparent",
        outside: "tw:text-secondary",
        weekday:
          "tw:size-10 tw:text-sm tw:font-normal tw:text-center tw:!text-center",
        today: "tw:bg-primary/10 tw:text-primary",
        selected: "tw:!bg-primary tw:text-white",
        button_previous: "tw:absolute tw:left-0 tw:top-1",
        button_next: "tw:absolute tw:right-0 tw:top-1",
      }}
      {...props}
    />
  );
};

export default Calendar;
