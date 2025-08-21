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
            <span className="tw:text-sm">Direct Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $241</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">1 Stops Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $129</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">2 Stops Flights</span>
            <span className="tw:text-[13px] tw:text-secondary">from $538</span>
          </div>
        </label>
      </FilterCollapsible>

      {/* Filter Baggage */}
      <FilterCollapsible title="Baggage">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <span className="tw:text-sm">Cabin Bag</span>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <span className="tw:text-sm">Checked Bag</span>
        </label>
      </FilterCollapsible>

      {/* Filter Departure Times */}
      <FilterCollapsible title="Departure Times"></FilterCollapsible>

      {/* Journey Duration */}
      <FilterCollapsible title="Journey Duration"></FilterCollapsible>

      {/* Airports */}
      <FilterCollapsible title="Airports">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Dubai</span>
            <span className="tw:text-[13px] tw:text-secondary">DXB</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Dubai Bus Station</span>
            <span className="tw:text-[13px] tw:text-secondary">XNB</span>
          </div>
        </label>
      </FilterCollapsible>

      {/* Airlines */}
      <FilterCollapsible title="Airlines">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Aegean Airlines</span>
            <span className="tw:text-[13px] tw:text-secondary">from $554</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Air Algerie</span>
            <span className="tw:text-[13px] tw:text-secondary">from $917</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Air Astana</span>
            <span className="tw:text-[13px] tw:text-secondary">from $419</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Air China</span>
            <span className="tw:text-[13px] tw:text-secondary">
              from $1,288
            </span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Air France</span>
            <span className="tw:text-[13px] tw:text-secondary">from $519</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">airBaltic</span>
            <span className="tw:text-[13px] tw:text-secondary">from $453</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Azerbaijan Airlines</span>
            <span className="tw:text-[13px] tw:text-secondary">from $129</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">British Airways</span>
            <span className="tw:text-[13px] tw:text-secondary">from $999</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Centrum Air</span>
            <span className="tw:text-[13px] tw:text-secondary">from $370</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">EgyptAir</span>
            <span className="tw:text-[13px] tw:text-secondary">from $327</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Emirates</span>
            <span className="tw:text-[13px] tw:text-secondary">from $622</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">Ethiopian Airlines</span>
            <span className="tw:text-[13px] tw:text-secondary">from $538</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">flyadeal</span>
            <span className="tw:text-[13px] tw:text-secondary">from $203</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">flydubai</span>
            <span className="tw:text-[13px] tw:text-secondary">from $241</span>
          </div>
        </label>
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <div className="tw:flex tw:flex-col">
            <span className="tw:text-sm">FLYONE</span>
            <span className="tw:text-[13px] tw:text-secondary">from $303</span>
          </div>
        </label>
      </FilterCollapsible>

      {/* Flight Emissions */}
      <FilterCollapsible title="Flight Emissions">
        <label className="tw:!flex tw:!mb-0 tw:gap-2.5">
          <Checkbox />
          <span className="tw:text-sm">
            Only show flights with verified emissions
          </span>
        </label>
      </FilterCollapsible>
    </div>
  );
};

export default SearchFilterSidebar;
