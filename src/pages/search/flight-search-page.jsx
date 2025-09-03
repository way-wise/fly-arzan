import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import SearchFilterSidebar from "./search-filter-sidebar";
import FlightSearchResults from "./flight-search-results";
import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import { SidebarFilterProvider } from "@/providers/filter-sidebar-provider";
import FlexibleDatesCalendar from "@/components/ui/flexible-dates-calendar/FlexibleDatesCalendar";
import {
  generatePriceDataForRange,
  getFlexibleDatesAroundDate,
} from "@/components/ui/flexible-dates-calendar/calendarUtils";
import { useLocation } from "react-router-dom";

const FlightSearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // One Way Form Initial Values from URL params (If one way selected)
  const initialOneWayFormValues = {
    flyingFrom: params.get("from")
      ? JSON.parse(decodeURIComponent(params.get("from")))
      : undefined,
    flyingTo: params.get("to")
      ? JSON.parse(decodeURIComponent(params.get("to")))
      : undefined,
    travellers: params.get("travellers")
      ? JSON.parse(decodeURIComponent(params.get("travellers")))
      : undefined,
    depart: params.get("depart") || undefined,
  };

  const [selectedFlexibleDate, setSelectedFlexibleDate] = useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [flexibleDates, setFlexibleDates] = useState([]);

  // Generate price data for the calendar (90 days range - 30 before, today, 59 after)
  const priceData = useMemo(() => {
    return generatePriceDataForRange(new Date(), 90);
  }, []);

  // Update flexible dates when selected date changes
  useEffect(() => {
    const dates = getFlexibleDatesAroundDate(selectedDate, priceData, 3);
    setFlexibleDates(dates);
    // Select the middle date (which is the selected date)
    if (dates.length > 0) {
      const middleIndex = Math.floor(dates.length / 2);
      setSelectedFlexibleDate(dates[middleIndex].id);
    }
  }, [selectedDate, priceData]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    // Update the flexible dates list based on the new selection
    const dates = getFlexibleDatesAroundDate(date, priceData, 3);
    setFlexibleDates(dates);
    // Select the middle date (which is the newly selected date)
    if (dates.length > 0) {
      const middleIndex = Math.floor(dates.length / 2);
      setSelectedFlexibleDate(dates[middleIndex].id);
    }
  };

  const handleFlexibleDateClick = (dateId) => {
    setSelectedFlexibleDate(dateId);
    const selectedFlexible = flexibleDates.find((d) => d.id === dateId);
    if (selectedFlexible) {
      setSelectedDate(selectedFlexible.fullDate);
    }
  };

  return (
    <>
      <SidebarFilterProvider>
        <Header />
        <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:py-6 tw:bg-[#F2FAFF]">
            <div className="container">
              <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
                {/* One Way Selected Values */}
                <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
                  {`${initialOneWayFormValues.flyingFrom.name} (${
                    initialOneWayFormValues.flyingFrom.iata
                  }) - ${initialOneWayFormValues.flyingTo.name} (${
                    initialOneWayFormValues.flyingTo.iata
                  }) - ${
                    initialOneWayFormValues.travellers.adults +
                    initialOneWayFormValues.travellers.children
                  } Traveller${
                    initialOneWayFormValues.travellers.adults +
                      initialOneWayFormValues.travellers.children !==
                    1
                      ? "s"
                      : ""
                  }, ${
                    initialOneWayFormValues.travellers.cabin
                      .charAt(0)
                      .toUpperCase() +
                    initialOneWayFormValues.travellers.cabin
                      .slice(1)
                      .toUpperCase()
                      .split("_")
                      .join(" ")
                  }`}
                </h1>
              </h1>
              <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
                {/* One Way Form */}
                {params.get("type") === "one-way" && (
                  <OneWayForm initialValues={initialOneWayFormValues} />
                )}
              </div>
            </div>
          </div>

          <div className="tw:bg-[#EFF3F8] tw:py-10 tw:grow">
            {/* Flexible Dates */}
            <div className="container tw:flex tw:items-center tw:gap-[10px]">
              <div className="tw:flex tw:items-center tw:snap-x tw:overflow-x-auto tw:scrollbar-hide tw:shadow tw:grow tw:divide-x tw:divide-muted tw:bg-white tw:rounded-xl">
                {flexibleDates.map((date) => (
                  <label
                    key={date.id}
                    className={cn(
                      "tw:snap-center tw:basis-[100px] tw:shrink-0 tw:!flex tw:flex-col tw:justify-center tw:gap-1 tw:!py-[24px] tw:!px-[20px] tw:!mb-0 tw:cursor-pointer tw:grow tw:text-center tw:h-[93px] tw:first:rounded-l-xl tw:last:rounded-r-xl tw:relative",
                      selectedFlexibleDate === date.id && "tw:bg-primary",
                      date.isCheapest &&
                        selectedFlexibleDate !== date.id &&
                        "tw:bg-green-50",
                      date.isRecommended &&
                        selectedFlexibleDate !== date.id &&
                        "tw:bg-blue-50"
                    )}
                    onClick={() => handleFlexibleDateClick(date.id)}
                  >
                    {/* Indicator for cheapest/recommended */}
                    {(date.isCheapest || date.isRecommended) && (
                      <div className="tw:absolute tw:top-2 tw:right-2">
                        <div
                          className={cn(
                            "tw:w-2 tw:h-2 tw:rounded-full",
                            date.isCheapest && "tw:bg-green-500",
                            date.isRecommended && "tw:bg-blue-500"
                          )}
                        />
                      </div>
                    )}
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
                        "tw:text-[20px] tw:font-semibold",
                        selectedFlexibleDate === date.id && "tw:text-white",
                        selectedFlexibleDate !== date.id &&
                          date.isCheapest &&
                          "tw:text-green-600",
                        selectedFlexibleDate !== date.id &&
                          date.isRecommended &&
                          "tw:text-blue-600",
                        selectedFlexibleDate !== date.id &&
                          !date.isCheapest &&
                          !date.isRecommended &&
                          "tw:text-primary"
                      )}
                    >
                      {date.price}
                    </span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="tw:!rounded-xl tw:hidden tw:bg-white tw:shadow tw:md:flex tw:flex-col tw:items-center tw:gap-2 tw:!py-[24px] tw:!px-[20px] tw:h-[93px] tw:shrink-0 tw:hover:shadow-lg tw:transition-shadow tw:cursor-pointer"
              >
                <CalendarDays
                  size={20}
                  className="tw:text-secondary tw:shrink-0"
                />
                <span className="tw:text-[14px] tw:font-medium">
                  Flexible Dates
                </span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="container tw:!py-[30px]">
              <Progress isLoading={true} />
            </div>

            {/* Flight Search Results */}
            <div className="container">
              <div className="tw:flex tw:gap-[30px]">
                <div className="tw:w-[270px] tw:shrink-0 tw:hidden tw:lg:block">
                  <SearchFilterSidebar />
                </div>
                <div className="tw:grow">
                  <FlightSearchResults />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </SidebarFilterProvider>

      {/* Flexible Dates Calendar Modal */}
      <FlexibleDatesCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        priceData={priceData}
      />
    </>
  );
};

export default FlightSearchPage;
