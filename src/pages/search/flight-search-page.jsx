import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import SearchFilterSidebar from "./search-filter-sidebar";
import FlightSearchResults from "./flight-search-results";

const FlightSearchPage = () => {
  const [selectedFlexibleDate, setSelectedFlexibleDate] = useState(1);
  const flexibleDates = [
    {
      id: 1,
      date: "31 Aug",
      price: "$122",
    },
    {
      id: 2,
      date: "1 Sep",
      price: "$173",
    },
    {
      id: 3,
      date: "2 Sep",
      price: "$126",
    },
    {
      id: 4,
      date: "3 Sep",
      price: "$129",
    },
    {
      id: 5,
      date: "4 Sep",
      price: "$122",
    },
    {
      id: 6,
      date: "5 Sep",
      price: "$141",
    },
    {
      id: 7,
      date: "6 Sep",
      price: "$141",
    },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:min-h-screen">
      <div className="tw:py-6 tw:bg-[#F2FAFF]">
        <div className="tw:container">
          <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
            Istanbul (IST) - Dubai (DXB) - 2 Travelers, Economy
          </h1>
          <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
            <OneWayForm />
          </div>
        </div>
      </div>

      <div className="tw:bg-[#EFF3F8] tw:py-10 tw:grow">
        {/* Flexible Dates */}
        <div className="tw:container tw:flex tw:items-center tw:gap-[10px]">
          <div className="tw:flex tw:items-center tw:snap-x tw:overflow-x-auto tw:scrollbar-hide tw:shadow tw:grow tw:divide-x tw:divide-muted tw:bg-white tw:rounded-xl">
            {flexibleDates.map((date) => (
              <label
                key={date.id}
                className={cn(
                  "tw:snap-center tw:basis-[100px] tw:shrink-0 tw:!flex tw:flex-col tw:justify-center tw:gap-1 tw:!py-[24px] tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:h-[93px] tw:first:rounded-l-xl tw:last:rounded-r-xl",
                  selectedFlexibleDate === date.id && "tw:bg-primary"
                )}
                onClick={() => setSelectedFlexibleDate(date.id)}
              >
                <span
                  className={cn(
                    "tw:text-[14px] tw:font-medium tw:text-secondary",
                    selectedFlexibleDate === date.id && "tw:text-white"
                  )}
                >
                  {date.date}
                </span>
                <span
                  className={cn(
                    "tw:text-[20px] tw:font-semibold tw:text-primary",
                    selectedFlexibleDate === date.id && "tw:text-white"
                  )}
                >
                  {date.price}
                </span>
              </label>
            ))}
          </div>
          <div className="tw:rounded-xl tw:hidden tw:bg-white tw:shadow tw:md:flex tw:flex-col tw:items-center tw:gap-2 tw:!py-[24px] tw:!px-[20px] tw:h-[93px] tw:shrink-0">
            <CalendarDays size={20} className="tw:text-secondary tw:shrink-0" />
            <p className="tw:text-[14px] tw:font-medium">Flexible Dates</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="tw:container tw:py-[30px]">
          <Progress isLoading={true} />
        </div>

        {/* Flight Search Results */}
        <div className="tw:container">
          <div className="tw:flex tw:gap-[30px]">
            <div className="tw:w-[270px] tw:shrink-0">
              <SearchFilterSidebar />
            </div>
            <div className="tw:grow">
              <FlightSearchResults />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
