import { Checkbox } from "@/components/ui/checkbox";
import { FilterCollapsible } from "@/components/ui/filter-collapsible";

const SearchFilterSidebar = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-5">
      {/* Filter Header */}
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:text-[15px] tw:font-medium">Filter</h4>
        <button className="tw:bg-dark-purple tw:!text-white tw:!rounded tw:text-[13px] tw:font-medium tw:py-1.5 tw:!px-[14px]">
          Reset Now
        </button>
      </div>

      {/* Filter Stops */}
      <FilterCollapsible title="Stops">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm tw:font-medium">Direct Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $241</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm tw:font-medium">1 Stops Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $129</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm tw:font-medium">2 Stops Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $538</span>
          </div>
        </label>
      </FilterCollapsible>

      {/* Filter Baggage */}
      <FilterCollapsible title="Baggage"></FilterCollapsible>

      {/* Filter Departure Times */}
      <FilterCollapsible title="Departure Times"></FilterCollapsible>

      {/* Journey Duration */}
      <FilterCollapsible title="Journey Duration"></FilterCollapsible>

      {/* Airports */}
      <FilterCollapsible title="Airports"></FilterCollapsible>

      {/* Airlines */}
      <FilterCollapsible title="Airlines"></FilterCollapsible>

      {/* Flight Emissions */}
      <FilterCollapsible title="Flight Emissions"></FilterCollapsible>
    </div>
  );
};

export default SearchFilterSidebar;
