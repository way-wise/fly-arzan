import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import UnifiedFlightSegment from "@/components/ui/unified-flight-segment";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { FaqCollapsible } from "@/components/ui/faq-collapsible";
import { useEffect, useState } from "react";

const FlightDetailsPage = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read flight data from session storage
    const storedData = sessionStorage.getItem("selected-flight-details");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFlightData(parsedData);
      } catch {
        // Redirect back to search if data is invalid
        navigate("/search/flight");
        return;
      }
    } else {
      // No flight data found, redirect to search
      navigate("/search/flight");
      return;
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="tw:flex tw:items-center tw:justify-center tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
            <div className="tw:animate-spin tw:rounded-full tw:h-12 tw:w-12 tw:border-b-2 tw:border-primary"></div>
            <div className="tw:text-lg tw:text-secondary">
              Loading flight details...
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!flightData) {
    return (
      <>
        <Header />
        <div className="tw:flex tw:items-center tw:justify-center tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
          <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:text-center">
            <div className="tw:text-lg tw:text-secondary">
              No flight data found
            </div>
            <Link
              to="/search/flight"
              className="tw:bg-primary tw:text-white tw:px-6 tw:py-2 tw:rounded-full tw:no-underline hover:tw:bg-primary/90 tw:transition-colors"
            >
              Search Flights
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Helper function to get route display string
  const getRouteDisplay = () => {
    const { tripType, routeInfo, flightOffer } = flightData;

    // Use the session storage tripType, not the processed flight offer tripType
    // This ensures multi-city is correctly identified even with 2 segments
    let actualTripType = tripType; // This comes from session storage

    // Double-check: if we have segments in routeInfo, it's definitely multi-city
    if (routeInfo?.segments && routeInfo.segments.length > 0) {
      actualTripType = "multi-city";
    }
    // Special case: if we have 2 itineraries but the destinations are different, it's multi-city
    else if (
      flightOffer?.itineraries?.length === 2 &&
      tripType === "round-trip"
    ) {
      const firstItinerary = flightOffer.itineraries[0];
      const secondItinerary = flightOffer.itineraries[1];
      const firstDestination =
        firstItinerary?.flights?.[firstItinerary.flights.length - 1]?.arrival
          ?.airport;
      const secondOrigin = secondItinerary?.flights?.[0]?.departure?.airport;
      const secondDestination =
        secondItinerary?.flights?.[secondItinerary.flights.length - 1]?.arrival
          ?.airport;
      const firstOrigin = firstItinerary?.flights?.[0]?.departure?.airport;

      // If the final destination is not the same as the original origin, it's multi-city
      if (secondDestination !== firstOrigin) {
        actualTripType = "multi-city";
      }
    }

    switch (actualTripType) {
      case "one-way":
        const fromCity =
          routeInfo.from?.city || routeInfo.from?.iataCode || "Unknown";
        const toCity =
          routeInfo.to?.city || routeInfo.to?.iataCode || "Unknown";
        return `${fromCity} → ${toCity}`;

      case "round-trip":
        const rtFromCity =
          routeInfo.from?.city || routeInfo.from?.iataCode || "Unknown";
        const rtToCity =
          routeInfo.to?.city || routeInfo.to?.iataCode || "Unknown";
        return `${rtFromCity} ⇄ ${rtToCity}`;

      case "multi-city":
        if (routeInfo.segments && routeInfo.segments.length > 0) {
          return routeInfo.segments
            .map((seg) => {
              const fromCity =
                seg.from?.city || seg.from?.iataCode || "Unknown";
              const toCity = seg.to?.city || seg.to?.iataCode || "Unknown";
              return `${fromCity} → ${toCity}`;
            })
            .join(" → ");
        }
        // Fallback: try to get from flight offer data
        if (flightData.flightOffer?.itineraries) {
          return flightData.flightOffer.itineraries
            .map((itinerary, index) => {
              const firstFlight = itinerary.flights?.[0];
              const lastFlight =
                itinerary.flights?.[itinerary.flights.length - 1];
              if (firstFlight && lastFlight) {
                const fromCity =
                  firstFlight.departure?.city ||
                  firstFlight.departure?.iataCode ||
                  "Unknown";
                const toCity =
                  lastFlight.arrival?.city ||
                  lastFlight.arrival?.iataCode ||
                  "Unknown";
                return `${fromCity} → ${toCity}`;
              }
              return `Segment ${index + 1}`;
            })
            .join(" → ");
        }
        return "Multi-city Trip";

      default:
        return "Flight Details";
    }
  };

  // Helper function to get passenger summary
  const getPassengerSummary = () => {
    const { passengerInfo, routeInfo, flightOffer, tripType } = flightData;
    const total = passengerInfo.adults + passengerInfo.children;
    const travelerText = total === 1 ? "Traveler" : "Travelers";
    const cabinClass = passengerInfo.cabin
      .replace("_", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Use the SAME logic as getRouteDisplay to determine actual trip type
    let actualTripType = tripType; // This comes from session storage

    // Double-check: if we have segments in routeInfo, it's definitely multi-city
    if (routeInfo?.segments && routeInfo.segments.length > 0) {
      actualTripType = "multi-city";
    }
    // Special case: if we have 2 itineraries but the destinations are different, it's multi-city
    else if (
      flightOffer?.itineraries?.length === 2 &&
      tripType === "round-trip"
    ) {
      const firstItinerary = flightOffer.itineraries[0];
      const secondItinerary = flightOffer.itineraries[1];
      const firstDestination =
        firstItinerary?.flights?.[firstItinerary.flights.length - 1]?.arrival
          ?.airport;
      const secondOrigin = secondItinerary?.flights?.[0]?.departure?.airport;
      const secondDestination =
        secondItinerary?.flights?.[secondItinerary.flights.length - 1]?.arrival
          ?.airport;
      const firstOrigin = firstItinerary?.flights?.[0]?.departure?.airport;

      // If the final destination is not the same as the original origin, it's multi-city
      if (secondDestination !== firstOrigin) {
        actualTripType = "multi-city";
      }
    }

    return `${total} ${travelerText} • ${actualTripType.replace(
      "-",
      " "
    )} • ${cabinClass} class`;
  };

  // Generate dynamic ticket list based on actual flight data
  const getTicketList = () => {
    return [
      {
        id: 1,
        airline: "Trip.com",
        totalRating: 556,
        avgRating: 5,
        icon: "/icons/trip.png",
      },
    ];
  };

  const generateForwardLink = () => {
    const { tripType, routeInfo, passengerInfo } = flightData;

    // Common parameters
    const adults = passengerInfo?.adults || 1;
    const children = passengerInfo?.children || 0;
    const cabin = passengerInfo?.cabin?.toLowerCase() || "economy";

    // Helper functions
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
      return new Date(dateStr).toISOString().split("T")[0];
    };

    const getCabinClass = (cabin) => {
      const map = { economy: "y", premium: "w", business: "c", first: "f" };
      return map[cabin] || "y";
    };

    // Build base parameters common to all trip types
    const baseParams = {
      class: getCabinClass(cabin),
      lowpricesource: "searchform",
      quantity: adults.toString(),
      locale: "en-GB",
      curr: "GBP",
    };

    let params = new URLSearchParams();

    // Build URL parameters based on trip type
    if (tripType === "one-way" && routeInfo?.from && routeInfo?.to) {
      // One-way trip parameters
      Object.assign(baseParams, {
        dcity: routeInfo.from.airport.toUpperCase(),
        acity: routeInfo.to.airport.toUpperCase(),
        ddate: formatDate(routeInfo.departureDate),
        dairport: routeInfo.from.airport.toUpperCase(),
        aairport: routeInfo.to.airport.toUpperCase(),
        triptype: "ow",
        searchbox: "arg=t",
        nonstoponl: "y=off",
      });
      params = new URLSearchParams(baseParams);
    } else if (
      tripType === "round-trip" &&
      routeInfo?.from &&
      routeInfo?.to &&
      routeInfo?.returnDate
    ) {
      // Round-trip parameters
      Object.assign(baseParams, {
        dcity: routeInfo.from.airport.toUpperCase(),
        acity: routeInfo.to.airport.toUpperCase(),
        ddate: formatDate(routeInfo.departureDate),
        rdate: formatDate(routeInfo.returnDate),
        dairport: routeInfo.from.airport.toUpperCase(),
        aairport: routeInfo.to.airport.toUpperCase(),
        triptype: "rt",
        searchbox: "arg=t",
        nonstoponl: "y=off",
      });
      params = new URLSearchParams(baseParams);
    } else if (tripType === "multi-city" && routeInfo?.segments?.length > 0) {
      // Multi-city parameters
      params = new URLSearchParams();

      // Add each segment
      routeInfo.segments.forEach((segment, index) => {
        if (!segment.from?.airport || !segment.to?.airport) {
          throw new Error(`Invalid segment ${index}: missing airport data`);
        }
        params.append(`multdcity${index}`, segment.from.airport.toLowerCase());
        params.append(`multacity${index}`, segment.to.airport.toLowerCase());
        params.append(`dairport${index}`, segment.from.airport.toLowerCase());
        params.append(`multddate${index}`, formatDate(segment.departureDate));
      });

      // Add multi-city specific params
      Object.entries({
        ...baseParams,
        triptype: "mt",
        searchboxarg: "t",
        nonstoponly: "off",
      }).forEach(([key, value]) => params.append(key, value));
    } else {
      // Invalid or unsupported trip configuration
      console.error("Invalid flight data:", { tripType, routeInfo });
      throw new Error(`Unsupported trip configuration: ${tripType}`);
    }

    // Add children for all trip types
    if (children > 0) {
      params.append("childquantity", children.toString());
    }

    // Build final affiliate URL
    const deepLink = `https://uk.trip.com/flights/showfarefirst?${params.toString()}`;
    const affiliateBase =
      "https://tp.media/r?marker=593963&trs=413727&p=8626&u=";

    return affiliateBase + encodeURIComponent(deepLink) + "&campaign_id=121";
  };

  const ticketList = getTicketList();

  const renderStars = (avgRating) => {
    const stars = [];
    const fullStars = Math.floor(avgRating);

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <RiStarFill key={`full-${i}`} size={20} className="tw:text-[#E1574A]" />
      );
    }

    // Render empty stars to complete the 5-star rating
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <RiStarLine
          key={`empty-${i}`}
          size={20}
          className="tw:text-secondary"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <Header />
      <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px] tw:animate-in tw:fade-in tw:duration-300">
        <div className="tw:py-6 tw:bg-[#F2FAFF]">
          <div className="container tw:flex tw:flex-col tw:gap-5">
            <Link
              to="/search/flight"
              className="tw:flex tw:!text-secondary tw:gap-1 tw:!no-underline"
            >
              <ChevronLeft />
              <span>Back to Search Results</span>
            </Link>
            <h1 className="tw:!text-[32px] tw:font-semibold tw:text-[#00000B]">
              {getRouteDisplay()}
            </h1>
            <div className="tw:flex tw:items-center tw:text-[#5D586C] tw:flex-wrap">
              <span>{getPassengerSummary()}</span>
            </div>
          </div>
        </div>

        <div className="tw:bg-[#EFF3F8] tw:py-10 tw:grow">
          <div className="container">
            <div className="tw:flex tw:flex-col tw:lg:flex-row tw:gap-[30px]">
              {/* List */}
              <div className="tw:flex tw:flex-col tw:gap-6 tw:grow tw:order-2 tw:lg:order-1">
                <h2 className="tw:!text-2xl tw:font-semibold tw:text-center tw:sm:text-left">
                  Book your tickets
                </h2>

                {/* FAQ */}
                <FaqCollapsible title="How can I find the best flight deals?">
                  <p>
                    For the best flight deals, book in advance and be flexible
                    with your travel dates and destinations. Use our flexible
                    search tools to compare prices across different airlines and
                    find deals by searching for an entire month rather than
                    specific days.
                  </p>
                </FaqCollapsible>

                {/* Tags */}
                <div className="tw:flex tw:items-center tw:flex-wrap tw:justify-center tw:sm:justify-start tw:gap-2">
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Extra Services
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Saver
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Standard
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Premium
                  </button>
                </div>

                {/* Ticket List */}
                <div className="tw:flex tw:flex-col tw:gap-6">
                  {ticketList.map((data) => (
                    <div
                      key={data.id}
                      className="tw:flex tw:flex-col tw:gap-4 tw:sm:gap-0 tw:sm:flex-row tw:items-center tw:justify-between tw:px-5 tw:py-4 tw:bg-white tw:shadow tw:rounded-md"
                    >
                      <div className="tw:flex tw:gap-4">
                        <img
                          src={data.icon}
                          className="tw:h-[70px] tw:rounded"
                        />
                        <div className="tw:w-full tw:flex tw:flex-col tw:gap-[11px]">
                          <h4 className="tw:text-xl">{data.airline}</h4>
                          <div className="tw:flex tw:items-center tw:gap-2">
                            {renderStars(data.avgRating)}
                            <span className="tw:border tw:border-muted tw:px-1.5 tw:rounded-md tw:bg-[#F2F2F2] tw:text-sm">
                              {data.totalRating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="tw:w-full tw:justify-between tw:sm:w-fit tw:px-6 tw:py-5 tw:bg-[#F2FAFF] tw:flex tw:items-center tw:rounded-xl tw:gap-3">
                        {/* <div className="tw:flex tw:flex-col tw:items-center tw:gap-1">
                          <span className="tw:font-medium tw:text-xl tw:text-primary">
                            {data.price}
                          </span>
                          <span className="tw:text-sm tw:text-secondary">
                            {data.totalPrice}
                          </span>
                        </div> */}
                        <a
                          href={generateForwardLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw:!bg-[#50ADD8] tw:!no-underline tw:!text-white tw:!rounded-full tw:!px-[30px] tw:py-2 tw:text-sm hover:tw:!bg-[#4A9BC4] tw:!transition-colors tw:duration-200"
                        >
                          Select
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="tw:w-full tw:lg:w-[468px] tw:order-1 tw:lg:order-2 tw:shrink-0">
                <div className="tw:flex tw:items-end tw:justify-between tw:gap-2 tw:mb-6 tw:text-[#5D586C]">
                  <div className="tw:flex tw:flex-col tw:gap-2">
                    <h4 className="tw:text-xl tw:font-medium">
                      Flight Details
                    </h4>
                  </div>
                  <span className="tw:text-sm tw:text-secondary">
                    All times are local
                  </span>
                </div>
                <div className="tw:bg-white tw:p-6 tw:rounded-xl tw:shadow">
                  {/* Dynamic Flight Segments */}
                  {flightData.flightOffer.itineraries?.length > 0 ? (
                    flightData.flightOffer.itineraries.map((segment, index) => (
                      <UnifiedFlightSegment
                        key={index}
                        segment={segment}
                        tripType={flightData.tripType}
                        segmentIndex={index}
                        totalSegments={
                          flightData.flightOffer.itineraries.length
                        }
                        segmentLabel={
                          flightData.tripType === "multi-city" &&
                          flightData.routeInfo.segments
                            ? `${flightData.routeInfo.segments[index]?.from?.city} → ${flightData.routeInfo.segments[index]?.to?.city}`
                            : undefined
                        }
                      />
                    ))
                  ) : (
                    <div className="tw:text-center tw:py-8 tw:text-secondary">
                      No flight segments found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightDetailsPage;
