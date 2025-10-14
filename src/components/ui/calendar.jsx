import { DayPicker } from "react-day-picker";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const Calendar = ({ mode = "range", selected, onSelect, ...props }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Compute hover range dynamically for better UX
  const hoverRange = useMemo(() => {
    if (
      mode === "range" &&
      selected?.from &&
      !selected?.to &&
      hoveredDay &&
      hoveredDay > selected.from
    ) {
      return { from: selected.from, to: hoveredDay };
    }
    return undefined;
  }, [mode, selected, hoveredDay]);

  return (
    <DayPicker
      selected={selected}
      onSelect={onSelect}
      onDayMouseEnter={setHoveredDay}
      onDayMouseLeave={() => setHoveredDay(null)}
      modifiers={{ hoverRange }}
      mode={mode}
      numberOfMonths={2}
      showOutsideDays
      fixedWeeks
      navLayout="around"
      captionLayout="label"
      disabled={{ before: new Date() }}
      classNames={{
        root: "tw:relative tw:p-1",
        months: "tw:flex sm:tw:flex-row tw:gap-4",
        month: "tw:space-y-2",
        caption_label: "tw:font-semibold tw:text-gray-900",
        month_grid: "tw:w-full tw:mt-2",
        month_caption: "tw:text-center",
        day: "tw:size-10 tw:text-center tw:!border tw:!border-muted/30",
        day_button:
          "tw:size-full tw:hover:bg-primary tw:hover:!text-white tw:disabled:!text-secondary tw:disabled:!bg-transparent",
        outside: "tw:text-secondary",
        weekday:
          "tw:size-10 tw:text-sm tw:font-normal tw:text-center tw:!text-center",
        today: "tw:text-white tw:bg-slate-400",
        selected: "tw:!bg-primary tw:text-white",
        range_start: "tw:!bg-primary tw:text-white",
        range_end: "tw:!bg-primary tw:text-white",
        range_middle: "tw:!bg-primary/20 tw:text-primary",
        button_previous: "tw:absolute tw:left-0 tw:top-1",
        button_next: "tw:absolute tw:right-0 tw:top-1",
      }}
      modifiersClassNames={{
        hoverRange: "tw:!bg-primary/10 tw:!text-primary tw:transition-all",
        range_middle: "tw:!bg-slate-100 tw:!text-gray-600",
        range_start: "tw:bg-primary tw:text-white",
        range_end: "tw:bg-primary tw:text-white",
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
