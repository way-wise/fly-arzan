import { useState, useEffect } from "react";
import {
  getSimilarFlights,
  switchSelectedFlight,
} from "../../utils/similarFlightsUtils";
import { generateForwardLink } from "../../utils/forwardLinkUtils";
import OneWayFlightCard from "./one-way-flight-card";
import RoundTripFlightCard from "./round-trip-flight-card";
import { RiPlaneLine } from "react-icons/ri";
import {
  formatDurationFromMinutes,
  getAirlineLogoUrl,
  formatDateFromISO,
} from "@/lib/flight-utils";

// Helper function to generate route info from flight data
const generateRouteInfoFromFlight = (flight, tripType) => {
  if (tripType === "one-way") {
    const flights = flight.flights || [];
    return {
      from: {
        city: flights[0]?.departure?.city,
        airport: flights[0]?.departure?.airport,
        iataCode: flights[0]?.departure?.iataCode,
      },
      to: {
        city: flights[flights.length - 1]?.arrival?.city,
        airport: flights[flights.length - 1]?.arrival?.airport,
        iataCode: flights[flights.length - 1]?.arrival?.iataCode,
      },
      departureDate: flights[0]?.departure?.at,
      flights: flights.map(f => ({
        airlineCode: f.operating?.carrierCode || f.airlineCode,
        airlineName: f.operating?.airlineName || f.airlineName,
        flightNumber: f.flightNumber,
        departure: f.departure,
        arrival: f.arrival,
      })),
    };
  } else if (tripType === "round-trip") {
    const outboundFlights = flight.itineraries?.[0]?.flights || [];
    const returnFlights = flight.itineraries?.[1]?.flights || [];
    return {
      from: {
        city: outboundFlights[0]?.departure?.city,
        airport: outboundFlights[0]?.departure?.airport,
        iataCode: outboundFlights[0]?.departure?.iataCode,
      },
      to: {
        city: outboundFlights[outboundFlights.length - 1]?.arrival?.city,
        airport: outboundFlights[outboundFlights.length - 1]?.arrival?.airport,
        iataCode: outboundFlights[outboundFlights.length - 1]?.arrival?.iataCode,
      },
      departureDate: outboundFlights[0]?.departure?.at,
      returnDate: returnFlights[0]?.departure?.at,
      outboundFlights: outboundFlights.map(f => ({
        airlineCode: f.operating?.carrierCode || f.airlineCode,
        airlineName: f.operating?.airlineName || f.airlineName,
        flightNumber: f.flightNumber,
        departure: f.departure,
        arrival: f.arrival,
      })),
      returnFlights: returnFlights.map(f => ({
        airlineCode: f.operating?.carrierCode || f.airlineCode,
        airlineName: f.operating?.airlineName || f.airlineName,
        flightNumber: f.flightNumber,
        departure: f.departure,
        arrival: f.arrival,
      })),
    };
  }
  return null;
};

const SimilarFlights = () => {
  const [similarFlights, setSimilarFlights] = useState([]);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSimilarFlights = () => {
    try {
      // Get selected flight details from session storage
      const selectedDetails = sessionStorage.getItem("selected-flight-details");
      if (!selectedDetails) {
        setLoading(false);
        return;
      }

      const parsedDetails = JSON.parse(selectedDetails);
      setSelectedFlightDetails(parsedDetails);

      // Get similar flights from session storage (excludes currently selected)
      const similar = getSimilarFlights();
      setSimilarFlights(similar);
    } catch (error) {
      console.warn("Failed to load similar flights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSimilarFlights();

    // Listen for session storage changes (when user switches flights)
    const handleStorageChange = (e) => {
      if (
        e.key === "similar-flights-pool" ||
        e.key === "selected-flight-details"
      ) {
        loadSimilarFlights();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle when user switches to a similar flight
  const handleFlightSwitch = (newSelectedFlightId) => {
    // Switch in the pool
    const newSelectedFlight = switchSelectedFlight(newSelectedFlightId);

    if (newSelectedFlight) {
      // Generate updated route info based on the new selected flight
      const updatedRouteInfo = generateRouteInfoFromFlight(newSelectedFlight, selectedFlightDetails.tripType);

      // Update the selected flight details in session storage
      // Preserve original routeInfo if generation returns null
      const updatedFlightDetails = {
        ...selectedFlightDetails,
        flightOffer: newSelectedFlight,
        routeInfo: updatedRouteInfo || selectedFlightDetails.routeInfo,
      };

      // Regenerate forward URL for the new selected flight
      const newForwardUrl = generateForwardLink(updatedFlightDetails);
      updatedFlightDetails.forwardUrl = newForwardUrl;

      sessionStorage.setItem(
        "selected-flight-details",
        JSON.stringify(updatedFlightDetails)
      );

      // Update local state immediately - no reload needed!
      setSelectedFlightDetails(updatedFlightDetails);
      loadSimilarFlights();

      // Trigger storage event manually for same-tab updates
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "selected-flight-details",
          newValue: JSON.stringify(updatedFlightDetails),
          storageArea: sessionStorage,
        })
      );

      // Also dispatch a custom event for the flight details page to listen to
      window.dispatchEvent(
        new CustomEvent("flightSwitched", {
          detail: { newFlightId: newSelectedFlightId },
        })
      );
    }
  };

  // Don't show anything if loading or no similar flights
  if (loading) {
    return (
      <div className="tw:mt-6 tw:p-4 tw:bg-yellow-100 tw:rounded">
        <p className="tw:!m-0">Loading similar flights...</p>
      </div>
    );
  }

  if (!selectedFlightDetails) {
    return (
      <div className="tw:mt-6 tw:p-4 tw:bg-red-100 tw:rounded">
        <p className="tw:!m-0">No flight details found</p>
      </div>
    );
  }

  if (!similarFlights.length) {
    return (
      <div className="tw:mt-6 tw:p-4 tw:bg-white tw:rounded">
        <p className="tw:!m-0">No similar flights found</p>
      </div>
    );
  }

  const tripType = selectedFlightDetails.tripType;

  const renderSimilarFlightCard = (flight, index) => {
    const key = `similar-flight-${flight.id || index}`;

    // Create search context for the flight cards
    const searchContext = {
      searchParams: selectedFlightDetails.searchParams || {},
      adults: selectedFlightDetails.passengerInfo?.adults || 1,
      children: selectedFlightDetails.passengerInfo?.children || 0,
      travelClass: selectedFlightDetails.passengerInfo?.cabin || "Economy",
      fromCity: selectedFlightDetails.routeInfo?.from?.city,
      toCity: selectedFlightDetails.routeInfo?.to?.city,
    };

    // Transform flight data to match card expectations
    const transformFlightForCard = (flight, tripType) => {
      switch (tripType) {
        case "one-way":
          // For one-way, flatten the structure - OneWayFlightCard expects flights array directly on itinerary
          return {
            ...flight,
            flights: flight.itineraries?.[0]?.flights || [], // Extract flights from first itinerary
            totalDurationMinutes:
              flight.itineraries?.[0]?.totalDurationMinutes || 0,
            airlineCode:
              flight.itineraries?.[0]?.flights?.[0]?.airlineCode ||
              flight.airlineCode,
          };
        case "round-trip":
        case "multi-city":
        default:
          // For round-trip, keep the itineraries structure
          return flight;
      }
    };

    // Override the handleFlightSelect to do switching instead of navigation
    const FlightCardWrapper = ({ originalCard: Card }) => {
      // Create a modified search context for switching
      const switchingSearchContext = {
        ...searchContext,
        onFlightSelect: () => handleFlightSwitch(flight.id), // Override the flight selection
        isInSimilarFlights: true, // Flag to indicate this is in similar flights context
      };

      const transformedFlight = transformFlightForCard(flight, tripType);

      return (
        <Card
          key={key}
          itinerary={transformedFlight}
          searchContext={switchingSearchContext}
        />
      );
    };

    switch (tripType) {
      case "one-way":
        return <FlightCardWrapper key={key} originalCard={OneWayFlightCard} />;

      case "round-trip":
        return (
          <FlightCardWrapper key={key} originalCard={RoundTripFlightCard} />
        );

      case "multi-city":
        // For multi-city, render custom card showing all itineraries
        return (
          <div
            key={key}
            className="tw:rounded-xl tw:bg-white tw:shadow tw:p-4 tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:justify-between"
          >
            {/* Flight Details Section */}
            <div className="tw:flex tw:flex-col tw:justify-between tw:grow tw:gap-4 tw:pl-[10px] tw:mb-8 tw:md:mb-0">
              {flight.itineraries.map((segment, segmentIndex) => {
                const flights = segment.flights;
                const firstFlight = flights[0];
                const lastFlight = flights[flights.length - 1];
                const totalDurationMinutes = flights.reduce(
                  (acc, f) => acc + f.durationMinutes,
                  0
                );

                return (
                  <div key={segmentIndex}>
                    {/* FlightSegment */}
                    <div className="tw:flex tw:items-center tw:justify-between tw:flex-col tw:gap-4 tw:md:gap-0 tw:md:flex-row">
                      {/* Airline Logo, Code */}
                      <div className="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-0.5 tw:text-center">
                        {getAirlineLogoUrl(firstFlight.airlineCode) ? (
                          <img
                            src={getAirlineLogoUrl(firstFlight.airlineCode)}
                            alt={firstFlight.airline}
                            className="tw:w-[120px] tw:-mt-[35px]"
                          />
                        ) : (
                          <div className="tw:w-[120px] tw:h-[60px] tw:flex tw:items-center tw:justify-center tw:bg-gray-100 tw:rounded">
                            <span className="tw:text-sm tw:text-gray-500">
                              {firstFlight.airlineCode}
                            </span>
                          </div>
                        )}
                        <span className="tw:text-sm tw:text-secondary tw:-mt-[25px]">
                          {firstFlight.airlineCode} - {firstFlight.flightNumber}
                        </span>
                      </div>

                      {/* Time, Stop, Airline */}
                      <div className="tw:flex tw:items-center tw:gap-6 tw:grow tw:justify-center">
                        {/* Depart */}
                        <div className="tw:flex tw:flex-col tw:gap-1 tw:text-right">
                          <span className="tw:font-semibold tw:text-[20px]">
                            {firstFlight.departure.time}
                          </span>
                          <span className="tw:text-sm tw:text-[#5D586C]">
                            {firstFlight.departure.airport}
                          </span>
                          <span className="tw:text-sm tw:text-[#5D586C]">
                            {formatDateFromISO(firstFlight.departure.at)}
                          </span>
                        </div>
                        {/* Duration & Stop */}
                        <div className="tw:flex tw:items-center tw:gap-2">
                          <div className="tw:flex tw:flex-col tw:text-center tw:gap-1">
                            <span className="tw:text-sm tw:font-semibold">
                              {formatDurationFromMinutes(totalDurationMinutes)}
                            </span>
                            <span className="tw:h-px tw:w-[82px] tw:bg-secondary" />
                            <span className="tw:text-sm tw:text-primary">
                              {(() => {
                                const stops = flights.length - 1;
                                if (stops === 0) {
                                  return "Direct";
                                }
                                const stopAirports = flights
                                  .slice(0, stops)
                                  .map((f) => f.arrival.airport);
                                return (
                                  <>
                                    {`${stops} Stop${stops > 1 ? "s" : ""}`}{" "}
                                    {stopAirports.map((airport, airportIndex) => (
                                      <strong
                                        key={airportIndex}
                                        className="tw:text-[#5D586C] tw:!font-normal"
                                      >
                                        {airport}
                                        {airportIndex < stopAirports.length - 1
                                          ? ", "
                                          : ""}
                                      </strong>
                                    ))}
                                  </>
                                );
                              })()}
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
                            {lastFlight.arrival.time}
                          </span>
                          <span className="tw:text-sm tw:text-[#5D586C]">
                            {lastFlight.arrival.airport}
                          </span>
                          <span className="tw:text-sm tw:text-[#5D586C]">
                            {formatDateFromISO(lastFlight.arrival.at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Select Button */}
            <div className="tw:w-full tw:md:w-fit tw:py-4 tw:px-6 tw:bg-[#F2FAFF] tw:rounded-xl tw:flex tw:flex-col tw:items-center tw:gap-3 tw:md:ml-4">
              <button
                onClick={() => handleFlightSwitch(flight.id)}
                className="tw:w-full tw:md:w-fit tw:bg-primary tw:py-2 tw:px-[30px] tw:flex tw:flex-col tw:!text-white tw:!rounded-full hover:tw:bg-primary/90 tw:transition-colors tw:border-0 tw:cursor-pointer"
              >
                <span className="tw:text-sm">Select</span>
                <span className="tw:text-xl tw:font-medium">
                  ${flight.price}
                </span>
              </button>
            </div>
          </div>
        );

      default:
        return <FlightCardWrapper key={key} originalCard={OneWayFlightCard} />;
    }
  };

  return (
    <div>
      <div className="tw:mb-4">
        <h3 className="tw:!text-xl tw:font-semibold tw:text-[#00000B]">
          Similar Flights
        </h3>
        <p className="tw:text-base tw:text-gray-500">
          Choose other flight with similar pricing and routes
        </p>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-4">
        {similarFlights.map((flight, index) =>
          renderSimilarFlightCard(flight, index)
        )}
      </div>
    </div>
  );
};

export default SimilarFlights;
