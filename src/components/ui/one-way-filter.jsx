import { Checkbox } from "@/components/ui/checkbox";
import { FilterCollapsible } from "@/components/ui/filter-collapsible";
import { RangeSelector } from "@/components/ui/range-selector";
import { useSidebarFilter } from "@/providers/filter-sidebar-provider";
import { useMemo, useEffect } from "react";
import { format, parse } from "date-fns";

// Helper to convert "HH:mm" to minutes from midnight
const timeToMinutes = (timeStr) => {
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  } catch {
    return 0;
  }
};

// Helper to convert minutes from midnight to "HH:mm"
const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const OneWayFilter = ({ flightOffersData }) => {
  const {
    filters,
    handleFilterChange,
    handleRangeChange,
    resetFilters,
    setFilters,
  } = useSidebarFilter();

  const { stops, airlines, departureTimeRange, journeyDurationRange } =
    useMemo(() => {
      if (!flightOffersData?.data) {
        return {
          stops: [],
          airlines: [],
          departureTimeRange: { min: 0, max: 1440 },
          journeyDurationRange: { min: 0, max: 3000 },
        };
      }

      const stopOptions = [0, 1, 2]; // Static list of stop options
      const airlineSet = new Map();
      let minDeparture = 1440;
      let maxDeparture = 0;
      let minDuration = 3000;
      let maxDuration = 0;

      flightOffersData.data.forEach((offer) => {
        offer.itineraries[0].segments.forEach((segment) => {
          const departureMinutes = timeToMinutes(
            format(
              parse(segment.departure.at, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
              "HH:mm"
            )
          );
          if (departureMinutes < minDeparture) minDeparture = departureMinutes;
          if (departureMinutes > maxDeparture) maxDeparture = departureMinutes;

          const duration =
            parseInt(segment.duration.match(/(\d+)H/)?.[1] || 0) * 60 +
            parseInt(segment.duration.match(/(\d+)M/)?.[1] || 0);
          if (duration < minDuration) minDuration = duration;
          if (duration > maxDuration) maxDuration = duration;

          const carrierCode = segment.carrierCode;
          if (
            !airlineSet.has(carrierCode) &&
            flightOffersData.dictionaries.carriers[carrierCode]
          ) {
            airlineSet.set(
              carrierCode,
              flightOffersData.dictionaries.carriers[carrierCode]
            );
          }
        });
      });

      return {
        stops: stopOptions,
        airlines: Array.from(airlineSet.entries()),
        departureTimeRange: { min: minDeparture, max: maxDeparture },
        journeyDurationRange: { min: minDuration, max: maxDuration },
      };
    }, [flightOffersData]);

  useEffect(() => {
    if (flightOffersData?.data) {
      setFilters((prev) => ({
        ...prev,
        departureTime: departureTimeRange,
        journeyDuration: journeyDurationRange,
      }));
    }
  }, [departureTimeRange, journeyDurationRange, setFilters, flightOffersData]);

  return (
    <div className="tw:flex tw:flex-col tw:gap-5">
      {/* Filter Header */}
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:text-[15px] tw:font-medium">Filter</h4>
        <button
          onClick={resetFilters}
          className="tw:bg-dark-purple tw:!text-white tw:!rounded tw:text-[13px] tw:font-medium tw:py-1.5 tw:!px-[14px]"
        >
          Reset Now
        </button>
      </div>

      {/* Filter Stops */}
      <FilterCollapsible title="Stops">
        {stops.map((stop) => (
          <label key={stop} className="tw:!flex tw:!mb-0 tw:gap-2.5">
            <Checkbox
              checked={filters.stops.includes(stop)}
              onCheckedChange={() => handleFilterChange("stops", stop)}
            />
            <div className="tw:flex tw:flex-col">
              <span className="tw:text-sm">
                {stop === 0 ? "Direct" : `${stop} Stop${stop > 1 ? "s" : ""}`}
              </span>
            </div>
          </label>
        ))}
      </FilterCollapsible>

      {/* Filter Baggage */}
      <FilterCollapsible title="Baggage">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox
            checked={filters.baggage.includes("checked")}
            onCheckedChange={() => handleFilterChange("baggage", "checked")}
          />
          <span className="tw:text-sm">Checked Bag</span>
        </label>
      </FilterCollapsible>

      {/* Filter Departure Times */}
      <FilterCollapsible title="Departure Times">
        <div className="tw:flex tw:flex-col tw:gap-1">
          <span className="tw:text-sm">
            {minutesToTime(filters.departureTime.min)} -{" "}
            {minutesToTime(filters.departureTime.max)}
          </span>
        </div>
        <RangeSelector
          min={departureTimeRange.min}
          max={departureTimeRange.max}
          value={[filters.departureTime.min, filters.departureTime.max]}
          onValueChange={(value) => handleRangeChange("departureTime", value)}
          step={15}
        />
      </FilterCollapsible>

      {/* Journey Duration */}
      <FilterCollapsible title="Journey Duration">
        <div className="tw:flex tw:flex-col tw:gap-1">
          <span className="tw:text-sm">
            {Math.floor(filters.journeyDuration.min / 60)}h{" "}
            {filters.journeyDuration.min % 60}m -{" "}
            {Math.floor(filters.journeyDuration.max / 60)}h{" "}
            {filters.journeyDuration.max % 60}m
          </span>
        </div>
        <RangeSelector
          min={journeyDurationRange.min}
          max={journeyDurationRange.max}
          value={[filters.journeyDuration.min, filters.journeyDuration.max]}
          onValueChange={(value) => handleRangeChange("journeyDuration", value)}
          step={15}
        />
      </FilterCollapsible>

      {/* Airlines */}
      <FilterCollapsible title="Airlines">
        {airlines.map(([code, name]) => (
          <label key={code} className="tw:!flex tw:!mb-0 tw:gap-2.5">
            <Checkbox
              checked={filters.airlines.includes(code)}
              onCheckedChange={() => handleFilterChange("airlines", code)}
            />
            <div className="tw:flex tw:flex-col">
              <span className="tw:text-sm">{name}</span>
            </div>
          </label>
        ))}
      </FilterCollapsible>
    </div>
  );
};

export default OneWayFilter;
