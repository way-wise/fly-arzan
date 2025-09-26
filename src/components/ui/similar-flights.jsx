import { useState, useEffect } from "react";
import {
  getSimilarFlights,
  switchSelectedFlight,
} from "../../utils/similarFlightsUtils";
import { generateForwardLink } from "../../utils/forwardLinkUtils";
import OneWayFlightCard from "./one-way-flight-card";
import RoundTripFlightCard from "./round-trip-flight-card";

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
      const updatedFlightDetails = {
        ...selectedFlightDetails,
        flightOffer: newSelectedFlight,
        routeInfo: updatedRouteInfo,
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
        // For multi-city, use round-trip card as fallback
        return (
          <FlightCardWrapper key={key} originalCard={RoundTripFlightCard} />
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
