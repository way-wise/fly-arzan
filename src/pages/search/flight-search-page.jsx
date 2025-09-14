import { Progress } from "@/components/ui/progress";
import SearchFilterSidebar from "./search-filter-sidebar";
import FlightSearchResults from "./flight-search-results";
import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import FlexibleDatesCalendar from "@/components/ui/flexible-dates-calendar/FlexibleDatesCalendar";
import FlightSearchPageHeader from "@/components/ui/FlightSearchPageHeader";
import FlexibleDates from "@/components/ui/flexible-dates/FlexibleDates";
import { SidebarFilterProvider } from "@/providers/filter-sidebar-provider";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFlightOffers } from "@/hooks/useFlightOffers";
import { useFlexibleDates } from "@/hooks/useFlexibleDates";
import { useEffect, useState, useMemo } from "react";
import RoundWayForm from "@/components/ui/hero-search-filter/flights/round-way-form";

import OneWayFilter from "@/components/ui/one-way-filter";
import RoundTripFilter from "@/components/ui/round-trip-filter";

const FlightSearchPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [initialValues, setInitialValues] = useState(null);
  const tripType = searchParams.get("type");

  useEffect(() => {
    // Extract Query Params
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const travellersParam = searchParams.get("travellers"); // Used for form pre-population
    const departParam = searchParams.get("depart");
    const returnParam = searchParams.get("return");

    // Parse the params
    const parsedFrom = fromParam
      ? JSON.parse(decodeURIComponent(fromParam))
      : {};
    const parsedTo = toParam ? JSON.parse(decodeURIComponent(toParam)) : {};
    const parsedTravellers = travellersParam
      ? JSON.parse(decodeURIComponent(travellersParam))
      : {};

    // Construct the initialValues
    setInitialValues({
      flyingFrom: {
        city: parsedFrom.city || "",
        iataCode: parsedFrom.iataCode || "",
      },
      flyingTo: {
        city: parsedTo.city || "",
        iataCode: parsedTo.iataCode || "",
      },
      travellers: {
        cabin: parsedTravellers.cabin || "economy",
        adults: parsedTravellers.adults ?? 1,
        children: parsedTravellers.children ?? 0,
      },
      depart: departParam || "",
      return: returnParam || "",
    });
  }, [location.search, searchParams]);

  // Memoized flight offers query parameters to prevent unnecessary re-renders
  const flightOffersParams = useMemo(
    () => ({
      originLocationCode: initialValues?.flyingFrom?.iataCode,
      destinationLocationCode: initialValues?.flyingTo?.iataCode,
      departureDate: initialValues?.depart
        ? new Date(initialValues.depart)
        : null,
      returnDate:
        tripType === "round-way" && initialValues?.return
          ? new Date(initialValues.return)
          : null,
      adults: searchParams.get("adults") || 1,
      children: searchParams.get("children") || 0,
      travelClass: searchParams.get("travelClass") || "ECONOMY",
    }),
    [initialValues, tripType, searchParams]
  );

  // Flight Offers
  const { isLoading, data: flightOffersData } =
    useFlightOffers(flightOffersParams);

  const {
    selectedFlexibleDate,
    isCalendarOpen,
    selectedDate,
    flexibleDates,
    priceData,
    setIsCalendarOpen,
    handleDateSelect,
    handleFlexibleDateClick,
  } = useFlexibleDates();

  // Memoized filter component selection
  const FilterComponent = useMemo(
    () => (tripType === "round-way" ? RoundTripFilter : OneWayFilter),
    [tripType]
  );

  return (
    <>
      <SidebarFilterProvider>
        <Header />
        <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:py-6 tw:bg-[#F2FAFF]">
            <div className="container">
              {initialValues && (
                <FlightSearchPageHeader
                  initialOneWayFormValues={initialValues}
                />
              )}
              <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
                {/* One Way Form */}
                {tripType === "one-way" && initialValues && (
                  <OneWayForm initialValues={initialValues} />
                )}
                {/* Round Way Form */}
                {tripType === "round-way" && (
                  <RoundWayForm initialValues={initialValues} />
                )}
              </div>
            </div>
          </div>

          <div className="tw:bg-[#EFF3F8] tw:py-10 tw:grow">
            {/* Flexible Dates */}
            <FlexibleDates
              flexibleDates={flexibleDates}
              selectedFlexibleDate={selectedFlexibleDate}
              handleFlexibleDateClick={handleFlexibleDateClick}
              setIsCalendarOpen={setIsCalendarOpen}
            />

            {/* Progress Bar */}
            <div className="container tw:!py-[30px]">
              <Progress isLoading={isLoading} />
            </div>

            {/* Flight Search Results */}
            <div className="container">
              <div className="tw:flex tw:gap-[30px]">
                <div className="tw:w-[270px] tw:shrink-0 tw:hidden tw:lg:block">
                  <SearchFilterSidebar
                    flightOffersData={flightOffersData}
                    FilterComponent={FilterComponent}
                  />
                </div>
                <div className="tw:grow">
                  <FlightSearchResults flightOffersData={flightOffersData} />
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
