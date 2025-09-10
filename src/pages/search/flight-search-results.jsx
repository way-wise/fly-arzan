import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiVerifiedBadgeFill,
  RiPercentFill,
  RiFlashlightFill,
  RiFilterFill,
  RiPlaneLine,
} from "react-icons/ri";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useSidebarFilter } from "@/providers/filter-sidebar-provider";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to format duration from minutes to "Xh Ym" format
const formatDurationFromMinutes = (minutes) => {
  if (isNaN(minutes) || minutes <= 0) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
};

// Helper function to format time from ISO date string
const formatTimeFromISO = (dateTime) => {
  try {
    return format(parseISO(dateTime), "HH:mm");
  } catch (error) {
    console.error("Error formatting time:", error);
    return "00:00";
  }
};

// Helper function to calculate total price
const calculateTotalPrice = (priceData) => {
  const base = parseFloat(priceData?.base) || 0;
  const total = parseFloat(priceData?.grandTotal) || base;
  return {
    price: base,
    totalPrice: total,
    currency: priceData?.currency || "USD",
  };
};

// Helper function to get airline logo URL based on carrier code
const getAirlineLogoUrl = (carrierCode) => {
  if (!carrierCode) {
    return null;
  }
  // Construct the path using the carrier code.
  return `/logos/${carrierCode.toUpperCase()}.png`;
};

// Helper to parse duration from ISO format (PT4H25M) or minutes
const parseDuration = (duration) => {
  if (typeof duration === "number") return duration;
  if (typeof duration === "string") {
    if (duration.startsWith("PT")) {
      // ISO 8601 format like "PT4H25M"
      const hoursMatch = duration.match(/(\d+)H/);
      const minutesMatch = duration.match(/(\d+)M/);
      const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
      return hours * 60 + minutes;
    }
    return parseInt(duration) || 0;
  }
  return 0;
};

const FlightSearchResults = ({ flightOffersData }) => {
  const navigate = useNavigate();
  const { openMobile, setOpenMobile } = useSidebarFilter();
  const [selectedTimeCost, setSelectedTimeCost] = useState(1);
  const [processedFlights, setProcessedFlights] = useState([]);
  const [timeCostFilters, setTimeCostFilters] = useState([]);

  useEffect(() => {
    if (flightOffersData?.data) {
      const flights = processAmadeusData(flightOffersData);
      setProcessedFlights(flights);
      generateTimeCostFilters(flights);
    }
  }, [flightOffersData]);

  const processAmadeusData = (data) => {
    if (!data?.data) return [];

    return data.data
      .map((offer, index) => {
        const { price: priceData } = offer;
        const { price, totalPrice, currency } = calculateTotalPrice(priceData);

        const itinerary = offer.itineraries?.[0];
        if (!itinerary) return null;

        const flights =
          itinerary.segments
            ?.map((segment) => {
              const carrierCode = segment.carrierCode;
              const airlineName =
                data.dictionaries?.carriers?.[carrierCode] || "Unknown Airline";
              const durationMinutes = parseDuration(segment.duration);

              return {
                airline: airlineName,
                airlineCode: carrierCode,
                flightNumber: `${carrierCode}${segment.number}`,
                departure: {
                  time: formatTimeFromISO(segment.departure?.at),
                  airport: segment.departure?.iataCode || "N/A",
                },
                arrival: {
                  time: formatTimeFromISO(segment.arrival?.at),
                  airport: segment.arrival?.iataCode || "N/A",
                },
                duration: formatDurationFromMinutes(durationMinutes),
                stops:
                  segment.numberOfStops === 0
                    ? "Direct"
                    : `${segment.numberOfStops} Stop${
                        segment.numberOfStops > 1 ? "s" : ""
                      }`,
              };
            })
            .filter(Boolean) || [];

        if (flights.length === 0) return null;

        return {
          id: `${index + 1}-${offer.id || Date.now()}`,
          price: Math.round(price),
          totalPrice: Math.round(totalPrice * 100) / 100, // Keep 2 decimal places
          currency,
          logo: flights[0].airlineCode,
          airlineCode: flights[0].airlineCode,
          flights,
        };
      })
      .filter(Boolean);
  };

  const generateTimeCostFilters = (flights) => {
    if (flights.length === 0) {
      setTimeCostFilters([
        {
          id: 1,
          title: "Best",
          duration: "4h 30m",
          price: "$241",
          icon: <RiVerifiedBadgeFill size={24} />,
          showInMobile: true,
        },
        {
          id: 2,
          title: "Cheapest",
          duration: "12h 05m",
          price: "$129",
          icon: <RiPercentFill size={24} />,
          showInMobile: true,
        },
        {
          id: 3,
          title: "Fastest",
          duration: "4h 25m",
          price: "$622",
          icon: <RiFlashlightFill size={24} />,
          showInMobile: true,
        },
      ]);
      return;
    }

    const bestOption = flights.reduce((prev, current) => {
      const prevDuration = parseInt(
        prev.flights[0]?.duration?.replace("h", "")?.replace("m", "") || 0
      );
      const currentDuration = parseInt(
        current.flights[0]?.duration?.replace("h", "")?.replace("m", "") || 0
      );
      const prevScore = prevDuration > 0 ? prev.price / prevDuration : Infinity;
      const currentScore =
        currentDuration > 0 ? current.price / currentDuration : Infinity;
      return prevScore < currentScore ? prev : current;
    });

    const cheapestOption = flights.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );

    const fastestOption = flights.reduce((prev, current) => {
      const prevDuration = parseInt(
        prev.flights[0]?.duration?.replace("h", "")?.replace("m", "") ||
          Infinity
      );
      const currentDuration = parseInt(
        current.flights[0]?.duration?.replace("h", "")?.replace("m", "") ||
          Infinity
      );
      return prevDuration < currentDuration ? prev : current;
    });

    setTimeCostFilters([
      {
        id: 1,
        title: "Best",
        duration: bestOption.flights[0]?.duration || "0h 0m",
        price: `$${bestOption.price}`,
        icon: <RiVerifiedBadgeFill size={24} />,
        showInMobile: true,
      },
      {
        id: 2,
        title: "Cheapest",
        duration: cheapestOption.flights[0]?.duration || "0h 0m",
        price: `$${cheapestOption.price}`,
        icon: <RiPercentFill size={24} />,
        showInMobile: true,
      },
      {
        id: 3,
        title: "Fastest",
        duration: fastestOption.flights[0]?.duration || "0h 0m",
        price: `$${fastestOption.price}`,
        icon: <RiFlashlightFill size={24} />,
        showInMobile: true,
      },
    ]);
  };

  if (!flightOffersData) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-6">
        <Skeleton className="tw:h-10 tw:w-full" />
        {Array.from({ length: 14 }).map((_, index) => (
          <Skeleton key={index} className="tw:h-[100px] tw:w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      {/* List Header */}
      <h4 className="tw:lg:hidden tw:text-[15px] tw:font-medium tw:!mb-2 tw:text-center">
        {processedFlights.length} results sorted by Best
      </h4>
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
        <h4 className="tw:hidden tw:lg:block tw:text-[15px] tw:font-medium">
          {processedFlights.length} results sorted by Best
        </h4>
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="tw:flex tw:lg:hidden tw:items-center tw:justify-between tw:gap-2 tw:py-2 tw:px-3 tw:!rounded-md tw:border tw:border-muted tw:bg-white tw:text-[15px] tw:font-semibold tw:shadow-xs tw:transition tw:outline-none focus-visible:tw:border-primary focus-visible:tw:ring-0 disabled:tw:cursor-not-allowed disabled:tw:opacity-50"
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
              "tw:snap-center tw:w-full tw:md:basis-[100px] tw:shrink-0 tw:items-center tw:!flex tw:justify-between tw:gap-1 tw:!py-3 tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:md:h-[57px] tw:first:rounded-t-md tw:md:first:rounded-t-none tw:last:rounded-b-md tw:md:last:rounded-b-none tw:md:first:rounded-l-md tw:md:last:rounded-r-md",
              selectedTimeCost === data.id
                ? "tw:bg-primary tw:text-white"
                : "tw:text-secondary"
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
            <span className="tw:text-[20px] tw:font-semibold">
              {data.price}
            </span>
          </label>
        ))}
      </div>

      {/* Available Flight List */}
      <div className="tw:grid tw:grid-cols-1 tw:gap-[30px]">
        {processedFlights.length > 0 ? (
          processedFlights.map((itinerary) => (
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
                      {getAirlineLogoUrl(flight.airlineCode) ? (
                        <img
                          src={getAirlineLogoUrl(flight.airlineCode)}
                          alt={flight.airline}
                          className="tw:w-[120px]"
                        />
                      ) : (
                        <div className="tw:w-[120px] tw:h-[60px] tw:flex tw:items-center tw:justify-center tw:bg-gray-100 tw:rounded">
                          <span className="tw:text-sm tw:text-gray-500">
                            {flight.airlineCode}
                          </span>
                        </div>
                      )}
                      <span className="tw:text-sm tw:text-secondary">
                        {flight.airlineCode} - {flight.flightNumber}
                      </span>
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
                  className="tw:w-full tw:md:w-fit tw:bg-primary tw:py-2 tw:px-[30px] tw:flex tw:flex-col tw:!text-white tw:!rounded-full hover:tw:bg-primary/90 tw:transition-colors"
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
          ))
        ) : (
          <div className="tw:text-center tw:py-12 tw:text-muted-foreground">
            No flights found matching your criteria.
          </div>
        )}

        {processedFlights.length > 0 && (
          <button className="tw:flex tw:!mx-auto tw:items-center tw:gap-1.5 tw:hover:bg-primary/90 tw:px-[40px] tw:h-[56px] tw:!text-white tw:font-semibold tw:!rounded-[40px] tw:bg-primary tw:transition-colors">
            <span>Explore More</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FlightSearchResults;
