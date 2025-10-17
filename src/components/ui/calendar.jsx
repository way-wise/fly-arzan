import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";
import { useState, useLayoutEffect } from "react";

const Calendar = ({ mode = "range", selected, onSelect, ...props }) => {
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  // Responsive number of months based on screen size
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNumberOfMonths(2);
      } else {
        setNumberOfMonths(12);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DayPicker
      selected={selected}
      onSelect={onSelect}
      mode={mode}
      numberOfMonths={numberOfMonths}
      showOutsideDays={false}
      fixedWeeks
      navLayout="around"
      captionLayout="label"
      disabled={{ before: new Date() }}
      classNames={{
        root: "tw:relative tw:p-1",
        months: "tw:flex tw:flex-col tw:lg:flex-row tw:gap-4",
        month: "tw:space-y-2",
        caption_label: "tw:font-semibold tw:text-gray-900 tw:text-lg",
        month_grid: "tw:w-full tw:mt-2",
        month_caption: "tw:text-center",
        day: "tw:size-12 tw:text-center tw:!border-muted/30 tw:rounded-full tw:font-medium",
        day_button:
          "tw:size-full tw:disabled:!text-secondary tw:disabled:!bg-transparent",
        outside: "tw:invisible tw:pointer-events-none tw:!border-0",
        hidden: "tw:invisible",
        weekday:
          "tw:size-10 tw:text-sm tw:font-normal tw:text-center tw:!text-center",
        today: "tw:text-white tw:bg-slate-400",
        selected: "tw:!bg-primary tw:text-white",
        button_previous: "tw:absolute tw:left-0 tw:top-1",
        button_next: "tw:absolute tw:right-0 tw:top-1",
      }}
      modifiersClassNames={{
        hoverRange: "tw:!bg-primary/10 tw:!text-primary tw:transition-all",
        range_start: "tw:!bg-primary tw:!text-white",
        range_end: "tw:!bg-primary tw:!text-white",
        range_middle: "tw:!bg-slate-100 tw:!text-gray-600",
      }}
      {...props}
    />
  );
};

Calendar.propTypes = {
  mode: PropTypes.oneOf(["single", "multiple", "range"]),
  selected: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  onSelect: PropTypes.func,
};

export default Calendar;
