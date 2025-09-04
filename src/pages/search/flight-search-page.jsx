import { Progress } from "@/components/ui/progress";
import SearchFilterSidebar from "./search-filter-sidebar";
import FlightSearchResults from "./flight-search-results";
import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import { SidebarFilterProvider } from "@/providers/filter-sidebar-provider";
import FlexibleDatesCalendar from "@/components/ui/flexible-dates-calendar/FlexibleDatesCalendar";
import { useLocation } from "react-router-dom";
import FlightSearchPageHeader from "@/components/ui/FlightSearchPageHeader";
import { useOneWayOffers } from "@/hooks/useOneWayOffers";
import { useFlexibleDates } from "@/hooks/useFlexibleDates";
import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import FlexibleDates from "@/components/ui/flexible-dates/FlexibleDates";

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

  // Flight One Way Offers
  const { isLoading, data: flightOffersData } = useOneWayOffers({
    originLocationCode: initialOneWayFormValues.flyingFrom.iata,
    destinationLocationCode: initialOneWayFormValues.flyingTo.iata,
    departureDate: new Date(initialOneWayFormValues.depart),
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
              <FlightSearchPageHeader initialOneWayFormValues={initialOneWayFormValues} />
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
           
