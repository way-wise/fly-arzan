import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import { CalendarDays } from "lucide-react";

const FlightSearchPage = () => {
  const flexibleDates = [
    {
      date: "31 Aug",
      price: "$122",
    },
    {
      date: "1 Sep",
      price: "$173",
    },
    {
      date: "2 Sep",
      price: "$126",
    },
    {
      date: "3 Sep",
      price: "$129",
    },
    {
      date: "4 Sep",
      price: "$122",
    },
    {
      date: "5 Sep",
      price: "$141",
    },
    {
      date: "6 Sep",
      price: "$141",
    },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:min-h-screen">
      <div className="tw:py-6 tw:bg-[#F2FAFF]">
        <div className="tw:container">
          <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
            Istanbul (IST) - Dubai (DXB) - 2 Travellers, Economy
          </h1>
          <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
            <OneWayForm />
          </div>
        </div>
      </div>

      {/* Flexible Dates */}
      <div className="tw:py-10 tw:bg-[#EFF3F8] tw:grow">
        <div className="tw:container tw:flex tw:items-center tw:gap-[10px]">
          <div className="tw:rounded-xl tw:flex tw:items-center tw:shadow tw:grow tw:divide-x tw:divide-muted tw:bg-white">
            {flexibleDates.map((date, index) => (
              <label
                key={index}
                className="tw:!flex tw:flex-col tw:justify-center tw:gap-1 tw:!py-[24px] tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:h-[93px]"
              >
                <span className="tw:text-[14px] tw:font-medium tw:text-secondary">
                  {date.date}
                </span>
                <span className="tw:text-[20px] tw:font-semibold tw:text-primary">
                  {date.price}
                </span>
              </label>
            ))}
          </div>
          <div className="tw:rounded-xl tw:bg-white tw:shadow tw:flex tw:flex-col tw:items-center tw:gap-2 tw:!py-[24px] tw:!px-[20px] tw:h-[93px] tw:shrink-0">
            <CalendarDays size={20} className="tw:text-secondary tw:shrink-0" />
            <p className="tw:text-[14px] tw:font-medium">Flexible Dates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
