import { Progress } from "@/components/ui/progress";
import SearchFilterSidebar from "./search-filter-sidebar";
import FlightSearchResults from "./flight-search-results";
import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import RoundWayForm from "@/components/ui/hero-search-filter/flights/round-way-form";
import MultiCityForm from "@/components/ui/hero-search-filter/flights/multi-city-form";
import FlexibleDatesCalendar from "@/components/ui/flexible-dates-calendar/FlexibleDatesCalendar";
import FlightSearchPageHeader from "@/components/ui/FlightSearchPageHeader";
import MultiCityFlightSearchPageHeader from "@/components/ui/MultiCityFlightSearchPageHeader";
import FlexibleDates from "@/components/ui/flexible-dates/FlexibleDates";
import { SidebarFilterProvider } from "@/providers/filter-sidebar-provider";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useFlightOffers } from "@/hooks/useFlightOffers";
import { useMulticityFlightOffers } from "@/hooks/useMulticityFlightOffers";
import { useFlexibleDates } from "@/hooks/useFlexibleDates";
import { useEffect, useState, useMemo } from "react";
import { parseDateFromURL, formatDateForURL } from "@/lib/flight-utils";
import { useSessionStorage } from "usehooks-ts";

import OneWayFilter from "@/components/ui/one-way-filter";
import RoundTripFilter from "@/components/ui/round-trip-filter";

const FlightSearchPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [initialValues, setInitialValues] = useState(null);
  const [multicityValues, setMulticityValues] = useState(null);
  const [multicityResults, setMulticityResults] = useState(null);

  // Session storage for multi-city form data
  const [sessionData] = useSessionStorage("multicity-form-data", null);

  // Get trip type from URL params, location state, or session storage
  const urlTripType = searchParams.get("type");
  const stateTripType = location.state?.type || location.state?.searchType;
  const sessionTripType = sessionData?.type;
  const tripType = urlTripType || stateTripType || sessionTripType || "one-way";

  // Reset initialization flag when trip type changes
  useEffect(() => {
    setHasInitialized(false);
  }, [tripType]);

  // Initialize one-way/round-way form data from URL params
  useEffect(() => {
    if (tripType === "one-way" || tripType === "round-way") {
      // Extract Query Params
      const fromParam = searchParams.get("from");
      const toParam = searchParams.get("to");
      const travellersParam = searchParams.get("travellers");
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

      // Construct the initialValues with timezone-safe dates
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
        depart: departParam ? parseDateFromURL(departParam) : null,
        return: returnParam ? parseDateFromURL(returnParam) : null,
      });
    }
  }, [location.search, searchParams, tripType]);

  // Initialize multi-city form data from sessionStorage
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (tripType === "multicity" && sessionData && !hasInitialized) {
      try {
        console.log("Loading multi-city session data:", sessionData);
        // Extract form data without the type field
        const { type, ...formData } = sessionData;

        // Convert to the format expected by MultiCityFlightSearchPageHeader
        if (formData.segments && formData.travellers) {
          const travelClass = formData.travellers.cabin === "premium_economy"
            ? "PREMIUM_ECONOMY"
            : formData.travellers.cabin.toUpperCase();

          const convertedData = {
            // Convert segments to originDestinations format for header display
            originDestinations: formData.segments.map((segment, index) => ({
              id: (index + 1).toString(),
              originLocationCode: segment.from.iataCode,
              destinationLocationCode: segment.to.iataCode,
              departureDateTimeRange: {
                date: formatDateForURL(segment.depart),
              },
              originCity: segment.from.city,
              destinationCity: segment.to.city,
            })),
            // Convert travellers to travelers format for header display
            travelers: [
              ...Array(formData.travellers.adults).fill(null).map((_, i) => ({
                id: (i + 1).toString(),
                travelerType: "ADULT"
              })),
              ...Array(formData.travellers.children).fill(null).map((_, i) => ({
                id: (formData.travellers.adults + i + 1).toString(),
                travelerType: "CHILD"
              }))
            ],
            searchCriteria: {
              flightFilters: {
                cabinRestrictions: [{
                  cabin: travelClass
                }]
              }
            },
            // Keep original form data for form re-population, ensuring dates are Date objects
            originalFormData: {
              ...formData,
              segments: formData.segments.map(segment => ({
                ...segment,
                depart: segment.depart ? new Date(segment.depart) : ""
              }))
            }
          };
          setMulticityValues(convertedData);
          console.log("Multi-city form values converted:", convertedData);

          // Trigger automatic search like one-way and round-way forms do
          const apiSearchData = {
            currencyCode: "USD",
            originDestinations: convertedData.originDestinations.map(od => ({
              ...od,
              departureDateTimeRange: {
                ...od.departureDateTimeRange,
                time: "10:00:00"
              }
            })),
            travelers: convertedData.travelers,
            sources: ["GDS"],
            searchCriteria: {
              maxFlightOffers: 25,
              flightFilters: {
                cabinRestrictions: [{
                  cabin: travelClass,
                  coverage: "MOST_SEGMENTS",
                  originDestinationIds: convertedData.originDestinations.map(od => od.id),
                }],
              },
            },
          };

          console.log("Auto-triggering multi-city search with:", apiSearchData);
          searchMulticityFlights(apiSearchData, {
            onSuccess: (data) => {
              console.log("Auto multi-city search successful:", data);
              setMulticityResults(data);
            },
            onError: (error) => {
              console.error("Auto multi-city search error:", error);
            },
          });

          setHasInitialized(true);
        } else {
          setMulticityValues(formData);
          setHasInitialized(true);
        }
      } catch (error) {
        console.warn("Failed to parse multi-city form data:", error);
      }
    }
  }, [tripType, sessionData, hasInitialized]);

  // Memoized flight offers query parameters to prevent unnecessary re-renders
  const flightOffersParams = useMemo(
    () => ({
      originLocationCode: initialValues?.flyingFrom?.iataCode,
      destinationLocationCode: initialValues?.flyingTo?.iataCode,
      departureDate:
        initialValues?.depart instanceof Date ? initialValues.depart : null,
      returnDate:
        tripType === "round-way" && initialValues?.return instanceof Date
          ? initialValues.return
          : null,
      adults: searchParams.get("adults") || 1,
      children: searchParams.get("children") || 0,
      travelClass: searchParams.get("travelClass") || "ECONOMY",
    }),
    [initialValues, tripType, searchParams]
  );

  // Flight Offers (for one-way and round-way)
  const { isLoading, data: flightOffersData } =
    useFlightOffers(flightOffersParams);

  // Multi-city Flight Offers
  const {
    mutate: searchMulticityFlights,
    isPending: isMulticityLoading,
    data: multicityData,
  } = useMulticityFlightOffers();

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
  const FilterComponent = useMemo(() => {
    if (tripType === "round-way") return RoundTripFilter;
    if (tripType === "multicity") return OneWayFilter; // Use OneWayFilter for multicity for now
    return OneWayFilter;
  }, [tripType]);

  return (
    <>
      <SidebarFilterProvider>
        <Header />
        <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:py-6 tw:bg-[#F2FAFF]">
            <div className="container">
              {/* Header */}
              {tripType === "multicity" && multicityValues && (
                <MultiCityFlightSearchPageHeader
                  multicityFormValues={multicityValues}
                />
              )}
              {(tripType === "one-way" || tripType === "round-way") &&
                initialValues && (
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
                {/* Multi City Form */}
                {tripType === "multicity" && (
                  <MultiCityForm
                    initialValues={multicityValues?.originalFormData || multicityValues}
                    onSearch={(searchData) => {
                      console.log("Multi-city search triggered with data:", searchData);
                      searchMulticityFlights(searchData, {
                        onSuccess: (data) => {
                          console.log("Multi-city search successful:", data);
                          // Store results in state for FlightSearchResults component
                          setMulticityResults(data);
                        },
                        onError: (error) => {
                          console.error("Multi-city search error:", error);
                          toast.error(
                            "Failed to search flights. Please try again."
                          );
                        },
                      });
                    }}
                  />
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
              <Progress isLoading={isLoading || isMulticityLoading} />
            </div>

            {/* Flight Search Results */}
            <div className="container">
              <div className="tw:flex tw:gap-[30px]">
                <div className="tw:w-[270px] tw:shrink-0 tw:hidden tw:lg:block">
                  <SearchFilterSidebar
                    flightOffersData={
                      tripType === "multicity"
                        ? multicityResults
                        : flightOffersData
                    }
                    FilterComponent={FilterComponent}
                  />
                </div>
                <div className="tw:grow">
                  <FlightSearchResults
                    flightOffersData={
                      tripType === "multicity"
                        ? multicityResults
                        : flightOffersData
                    }
                  />
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
