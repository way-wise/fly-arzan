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
import { useSearchParams } from "react-router-dom";
import { useOneWayOffers } from "@/hooks/useOneWayOffers";
import { useFlexibleDates } from "@/hooks/useFlexibleDates";

const FlightSearchPage = () => {
  const [searchParams] = useSearchParams();

  // Extract Query Params
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const travellersParam = searchParams.get("travellers");
  const departParam = searchParams.get("depart");

  // Parse the params
  const parsedFrom = fromParam ? JSON.parse(decodeURIComponent(fromParam)) : {};
  const parsedTo = toParam ? JSON.parse(decodeURIComponent(toParam)) : {};
  const parsedTravellers = travellersParam
    ? JSON.parse(decodeURIComponent(travellersParam))
    : {};

  // Construct the initialValues
  const initialOneWayFormValues = {
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
  };

  // Flight One Way Offers
  const { isLoading, data: flightOffersData } = useOneWayOffers({
    originLocationCode: initialOneWayFormValues.flyingFrom.iataCode,
    destinationLocationCode: initialOneWayFormValues.flyingTo.iataCode,
    departureDate: initialOneWayFormValues.depart
      ? new Date(initialOneWayFormValues.depart)
      : null,
    adults: initialOneWayFormValues.travellers.adults,
  });

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

  return (
    <>
      <SidebarFilterProvider>
        <Header />
        <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:py-6 tw:bg-[#F2FAFF]">
            <div className="container">
              <FlightSearchPageHeader
                initialOneWayFormValues={initialOneWayFormValues}
              />
              <FlightSearchPageHeader
                initialOneWayFormValues={initialOneWayFormValues}
              />
              <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
                {/* One Way Form */}
                {searchParams.get("type") === "one-way" && (
                  <OneWayForm initialValues={initialOneWayFormValues} />
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
                  <SearchFilterSidebar />
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
