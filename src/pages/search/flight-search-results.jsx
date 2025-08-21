import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FlightSearchResults = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      {/* List Header */}
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:text-[15px] tw:font-medium">
          113 results sorted by Best
        </h4>
        <div className="tw:flex tw:items-center tw:gap-2 tw:relative">
          <span className="tw:whitespace-nowrap">Sort By</span>
          <Select>
            <SelectTrigger className="tw:px-4 tw:py-2 tw:min-w-[183px]">
              <SelectValue placeholder="Best" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best">Best</SelectItem>
              <SelectItem value="cheapest">Cheapest</SelectItem>
              <SelectItem value="fastest">Fastest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;
