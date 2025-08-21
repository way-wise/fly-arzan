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
      <FilterCollapsible title="Stops"></FilterCollapsible>

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
