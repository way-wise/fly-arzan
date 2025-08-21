import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BadgeCheck, Percent, Zap } from "lucide-react";
import { useState } from "react";

const FlightSearchResults = () => {
  const [selectedTimeCost, setSelectedTimeCost] = useState(1);
  const timeCostFilters = [
    {
      id: 1,
      title: "Best",
      duration: "4h 30m",
      price: "$241",
      icon: <BadgeCheck size={24} />,
    },
    {
      id: 2,
      title: "Cheapest",
      duration: "12h 05m",
      price: "$129",
      icon: <Percent />,
    },
    {
      id: 3,
      title: "Fastest",
      duration: "4h 25m",
      price: "$622",
      icon: <Zap />,
    },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      {/* List Header */}
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:text-[15px] tw:font-medium">
          113 results sorted by Best
        </h4>
        <div className="tw:flex tw:items-center tw:gap-2 tw:relative">
          <span className="tw:whitespace-nowrap tw:font-medium">Sort By</span>
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

      {/* Time Cost Filter */}
      <div className="tw:flex tw:items-center tw:snap-x tw:overflow-x-auto tw:scrollbar-hide tw:shadow tw:grow tw:divide-x tw:divide-muted tw:bg-white tw:rounded-md">
        {timeCostFilters.map((data) => (
          <label
            key={data.id}
            className={cn(
              "tw:snap-center tw:basis-[100px] tw:shrink-0 tw:!flex tw:items-center tw:justify-between tw:gap-1 tw:!py-3 tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:h-[57px] tw:first:rounded-l-md tw:last:rounded-r-md",
              selectedTimeCost === data.id && "tw:bg-primary tw:text-white"
            )}
            onClick={() => setSelectedTimeCost(data.id)}
          >
            <div className="tw:flex tw:items-center tw:gap-2">
              {data.icon}
              <div className="tw:text-left tw:text-sm">
                <p>{data.title}</p>
                <p className="tw:font-medium">{data.duration}</p>
              </div>
            </div>
            <span
              className={cn(
                "tw:text-[20px] tw:font-semibold",
                selectedTimeCost === data.id && "tw:text-white"
              )}
            >
              {data.price}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;
