import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useSidebarFilter } from "@/providers/filter-sidebar-provider";
import { useState } from "react";
import {
  RiPlaneLine,
  RiVerifiedBadgeFill,
  RiFlashlightFill,
  RiPercentFill,
  RiFilterFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const FlightSearchResults = () => {
  const navigate = useNavigate();
  const { openMobile, setOpenMobile } = useSidebarFilter();
  const [selectedTimeCost, setSelectedTimeCost] = useState(1);
  const timeCostFilters = [
    {
      id: 1,
      title: "Best",
      duration: "4h 30m",
      price: "$241",
      icon: <RiVerifiedBadgeFill size={24} />,
    },
    {
      id: 2,
      title: "Cheapest",
      duration: "12h 05m",
      price: "$129",
      icon: <RiPercentFill size={24} />,
    },
    {
      id: 3,
      title: "Fastest",
      duration: "4h 25m",
      price: "$622",
      icon: <RiFlashlightFill size={24} />,
    },
  ];

  const flightResults = [
    {
      id: 1,
      price: 410,
      totalPrice: 482,
      logo: "/images/airlines/flyDubai.png",
      flights: [
        {
          airline: "flydubai",
          airlineCode: "FDB",
          flightNumber: "1980",
          departure: {
            time: "18:35",
            airport: "IST",
          },
          arrival: {
            time: "00:05",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
        {
          airline: "flydubai",
          airlineCode: "FDB",
          flightNumber: "1980",
          departure: {
            time: "21:15",
            airport: "DXB",
          },
          arrival: {
            time: "01:10",
            airport: "IST",
          },
          duration: "4h 55m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 2,
      price: 241,
      totalPrice: 482,
      logo: "/images/airlines/flyDubai.png",
      flights: [
        {
          airline: "flydubai",
          airlineCode: "FDB",
          flightNumber: "1984",
          departure: {
            time: "02:10",
            airport: "IST",
          },
          arrival: {
            time: "07:40",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 3,
      price: 129,
      totalPrice: 482,
      logo: "/images/airlines/azal.png",
      flights: [
        {
          airline: "AZAL",
          airlineCode: "AHY",
          flightNumber: "771",
          departure: {
            time: "22:50",
            airport: "IST",
          },
          arrival: {
            time: "11:55",
            airport: "DBX",
          },
          duration: "12h 05m",
          stops: "1 Stop",
        },
      ],
    },
    {
      id: 4,
      price: 130,
      totalPrice: 244,
      logo: "/images/airlines/azal.png",
      flights: [
        {
          airline: "AZAL",
          airlineCode: "AHY",
          flightNumber: "776",
          departure: {
            time: "14:35",
            airport: "IST",
          },
          arrival: {
            time: "11:55",
            airport: "DBX",
          },
          duration: "20h 20m",
          stops: "1 Stop",
        },
      ],
    },
    {
      id: 5,
      price: 130,
      totalPrice: 244,
      logo: "/images/airlines/azal.png",
      flights: [
        {
          airline: "AZAL",
          airlineCode: "AHY",
          flightNumber: "776",
          departure: {
            time: "12:00",
            airport: "IST",
          },
          arrival: {
            time: "11:55",
            airport: "DBX",
          },
          duration: "22h 55m",
          stops: "1 Stop, GYD",
        },
      ],
    },
    {
      id: 6,
      price: 622,
      totalPrice: 1244,
      logo: "/images/airlines/emirates.png",
      flights: [
        {
          airline: "Emirates",
          airlineCode: "UAE",
          flightNumber: "2300",
          departure: {
            time: "16:25",
            airport: "IST",
          },
          arrival: {
            time: "21:50",
            airport: "DBX",
          },
          duration: "4h 25m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 7,
      price: 622,
      totalPrice: 1244,
      logo: "/images/airlines/emirates.png",
      flights: [
        {
          airline: "Emirates",
          airlineCode: "UAE",
          flightNumber: "2150",
          departure: {
            time: "18:35",
            airport: "IST",
          },
          arrival: {
            time: "00:05",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 8,
      price: 622,
      totalPrice: 1244,
      logo: "/images/airlines/emirates.png",
      flights: [
        {
          airline: "Emirates",
          airlineCode: "UAE",
          flightNumber: "764",
          departure: {
            time: "19:25",
            airport: "IST",
          },
          arrival: {
            time: "00:55",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 9,
      price: 266,
      totalPrice: 532,
      logo: "/images/airlines/mea.png",
      flights: [
        {
          airline: "MEA",
          airlineCode: "MEA",
          flightNumber: "1376",
          departure: {
            time: "11:20",
            airport: "IST",
          },
          arrival: {
            time: "20:40",
            airport: "DBX",
          },
          duration: "8h 20m",
          stops: "1 Stop, BEY",
        },
      ],
    },
    {
      id: 10,
      price: 610,
      totalPrice: 1482,
      logo: "/images/airlines/turkish.png",
      flights: [
        {
          airline: "Turkish Airlines",
          airlineCode: "TK",
          flightNumber: "1976",
          departure: {
            time: "21:00",
            airport: "IST",
          },
          arrival: {
            time: "02:30",
            airport: "DXB",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 11,
      price: 610,
      totalPrice: 1482,
      logo: "/images/airlines/turkish.png",
      flights: [
        {
          airline: "Turkish Airlines",
          airlineCode: "TK",
          flightNumber: "1989",
          departure: {
            time: "18:50",
            airport: "IST",
          },
          arrival: {
            time: "00:20",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 12,
      price: 410,
      totalPrice: 819,
      logo: "/images/airlines/emirates.png",
      flights: [
        {
          airline: "Emirates",
          airlineCode: "UAE",
          flightNumber: "1980",
          departure: {
            time: "02:10",
            airport: "IST",
          },
          arrival: {
            time: "7:40",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 13,
      price: 610,
      totalPrice: 1220,
      logo: "/images/airlines/qatar.png",
      flights: [
        {
          airline: "Qatar Airways",
          airlineCode: "QTR",
          flightNumber: "310",
          departure: {
            time: "13:45",
            airport: "IST",
          },
          arrival: {
            time: "12:20",
            airport: "DBX",
          },
          duration: "4h 35m",
          stops: "Direct",
        },
      ],
    },
    {
      id: 14,
      price: 610,
      totalPrice: 1220,
      logo: "/images/airlines/qatar.png",
      flights: [
        {
          airline: "Qatar Airways",
          airlineCode: "QTR",
          flightNumber: "210",
          departure: {
            time: "00:25",
            airport: "IST",
          },
          arrival: {
            time: "05:55",
            airport: "DBX",
          },
          duration: "4h 30m",
          stops: "Direct",
        },
      ],
    },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      {/* List Header */}
      <h4 className="tw:lg:hidden tw:text-[15px] tw:font-medium tw:!mb-2 tw:text-center">
        113 results sorted by Best
      </h4>
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:hidden tw:lg:block tw:text-[15px] tw:font-medium">
          113 results sorted by Best
        </h4>
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="tw:flex tw:lg:hidden tw:items-center tw:justify-between tw:gap-2 tw:py-2 tw:px-3 tw:!rounded-md tw:border tw:border-muted tw:bg-white tw:text-[15px] tw:font-semibold tw:shadow-xs tw:transition tw:outline-none focus-visible:tw:border-primary focus-visible:tw:ring-0 disabled:tw:cursor-not-allowed disabled:tw:opacity-50 tw:focus-visible:!outline-hidden"
        >
          <RiFilterFill size={24} />
          <span>Filter</span>
        </button>
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
      <div className="tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:shadow tw:grow tw:md:divide-x tw:md:divide-y-0 tw:divide-y tw:divide-muted tw:bg-white tw:rounded-md">
        {timeCostFilters.map((data) => (
          <label
            key={data.id}
            className={cn(
              "tw:snap-center tw:w-full tw:md:basis-[100px] tw:shrink-0 tw:!flex tw:items-center tw:justify-between tw:gap-1 tw:!py-3 tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:text-white tw:md:h-[57px] tw:first:rounded-t-md tw:md:first:rounded-t-none tw:last:rounded-b-md tw:md:last:rounded-b-none tw:md:first:rounded-l-md tw:md:last:rounded-r-md",
              selectedTimeCost === data.id && "tw:bg-primary"
            )}
            onClick={() => setSelectedTimeCost(data.id)}
          >
            <div
              className={cn(
                "tw:flex tw:items-center tw:gap-2 tw:[&_svg]:fill-white",
                selectedTimeCost !== data.id &&
                  "tw:text-secondary tw:[&_svg]:fill-secondary"
              )}
            >
              {data.icon}
              <div className="tw:text-left tw:text-sm">
                <p>{data.title}</p>
                <p className="tw:font-medium">{data.duration}</p>
              </div>
            </div>
            <span
              className={cn(
                "tw:text-[20px] tw:font-semibold",
                selectedTimeCost !== data.id && "tw:text-primary"
              )}
            >
              {data.price}
            </span>
          </label>
        ))}
      </div>

      {/* Available Flight List */}
      <div className="tw:grid tw:grid-cols-1 tw:gap-[30px]">
        {flightResults.map((itinerary) => (
          <div
            key={itinerary.id}
            className="tw:rounded-xl tw:bg-white tw:shadow tw:p-4 tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:justify-between"
          >
            {/* Flight Details Section */}
            <div className="tw:flex tw:flex-col tw:justify-between tw:grow tw:gap-4 tw:px-[30px] tw:mb-8 tw:md:mb-0">
              {itinerary.flights.map((flight, index) => (
                <div
                  key={index}
                  className="tw:flex tw:items-center tw:justify-between tw:flex-col tw:gap-4 tw:md:gap-0 tw:md:flex-row"
                >
                  {/* Airline Logo, Code */}
                  <div className="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-0.5 tw:text-center">
                    <img
                      src={itinerary.logo}
                      alt={flight.airline}
                      className="tw:w-[120px] tw:object-contain"
                    />
                    <span className="tw:text-sm tw:text-secondary">
                      {flight.airline}
                    </span>
                    <span className="tw:text-sm tw:text-secondary">{`${flight.airlineCode} - ${flight.flightNumber}`}</span>
                  </div>

                  {/* Time, Stop, Airline */}
                  <div className="tw:flex tw:items-center tw:gap-6 tw:grow tw:justify-center">
                    {/* Depart */}
                    <div className="tw:flex tw:flex-col tw:gap-1 tw:text-right">
                      <span className="tw:font-semibold tw:text-[20px]">
                        {flight.departure.time}
                      </span>
                      <span className="tw:text-sm tw:text-[#5D586C]">
                        {flight.departure.airport}
                      </span>
                    </div>
                    {/* Duration & Stop */}
                    <div className="tw:flex tw:items-center tw:gap-2">
                      <div className="tw:flex tw:flex-col tw:text-center tw:gap-1">
                        <span className="tw:text-sm tw:font-semibold">
                          {flight.duration}
                        </span>
                        <span className="tw:h-px tw:w-[82px] tw:bg-secondary" />
                        <span className="tw:text-sm tw:text-primary">
                          {flight.stops}
                        </span>
                      </div>
                      <RiPlaneLine
                        size={24}
                        className="tw:text-secondary tw:rotate-90"
                      />
                    </div>
                    {/* Arrival */}
                    <div className="tw:flex tw:flex-col tw:gap-1 tw:text-left">
                      <span className="tw:font-semibold tw:text-[20px]">
                        {flight.arrival.time}
                      </span>
                      <span className="tw:text-sm tw:text-[#5D586C]">
                        {flight.arrival.airport}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Select Button */}
            <div className="tw:w-full tw:md:w-fit tw:py-4 tw:px-6 tw:bg-[#F2FAFF] tw:rounded-xl tw:flex tw:flex-col tw:items-center tw:gap-3 tw:md:ml-4">
              <button
                onClick={() => navigate("/flight/details")}
                className="tw:w-full tw:md:w-fit tw:bg-primary tw:py-2 tw:px-[30px] tw:flex tw:flex-col tw:!text-white tw:!rounded-full"
              >
                <span className="tw:text-sm">Select</span>
                <span className="tw:text-xl tw:font-medium">
                  ${itinerary.price}
                </span>
              </button>
              <span className="tw:text-sm tw:text-[#939393]">
                ${itinerary.totalPrice} Total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;
