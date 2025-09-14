import { format, parseISO } from "date-fns";

// Helper to convert "HH:mm" to minutes from midnight
export const timeToMinutes = (timeStr) => {
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  } catch {
    return 0;
  }
};

// Helper function to format duration from minutes to "Xh Ym" format
export const formatDurationFromMinutes = (minutes) => {
  if (isNaN(minutes) || minutes <= 0) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
};

// Helper function to format time from ISO date string
export const formatTimeFromISO = (dateTime) => {
  try {
    return format(parseISO(dateTime), "HH:mm");
  } catch {
    return "00:00";
  }
};

// Helper function to format date from ISO date string
export const formatDateFromISO = (dateTime) => {
  try {
    return format(parseISO(dateTime), "eee, dd MMM");
  } catch {
    return "";
  }
};

// Helper function to calculate total price
export const calculateTotalPrice = (priceData) => {
  const base = parseFloat(priceData?.base) || 0;
  const total = parseFloat(priceData?.grandTotal) || base;
  return {
    price: base,
    totalPrice: total,
    currency: priceData?.currency || "USD",
  };
};

// Helper function to get airline logo URL based on carrier code
export const getAirlineLogoUrl = (carrierCode) => {
  if (!carrierCode) {
    return null;
  }
  // Construct the path using the carrier code.
  return `/logos/${carrierCode.toUpperCase()}.png`;
};

// Helper to parse duration from ISO format (PT4H25M) or minutes
export const parseDuration = (duration) => {
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

// Optimized function to extract baggage information
export const extractBaggageInfo = (offer) => {
  const fareDetails = offer.travelerPricings?.[0]?.fareDetailsBySegment || [];

  return {
    hasCheckedBaggage: fareDetails.some(
      (segment) => segment.includedCheckedBags
    ),
    hasCabinBaggage: fareDetails.some((segment) => segment.includedCabinBags),
    checkedBagDetails: fareDetails
      .filter((segment) => segment.includedCheckedBags)
      .map((segment) => ({
        weight: segment.includedCheckedBags.weight,
        weightUnit: segment.includedCheckedBags.weightUnit,
        quantity: segment.includedCheckedBags.quantity,
      })),
    cabinBagDetails: fareDetails
      .filter((segment) => segment.includedCabinBags)
      .map((segment) => ({
        weight: segment.includedCabinBags.weight,
        weightUnit: segment.includedCabinBags.weightUnit,
        quantity: segment.includedCabinBags.quantity,
      })),
  };
};

// Optimized function to extract operating carriers
export const extractOperatingCarriers = (offer) => {
  const operatingCarriers = new Set();

  offer.itineraries.forEach((itinerary) => {
    itinerary.segments.forEach((segment) => {
      const operatingCarrier =
        segment.operating?.carrierCode || segment.carrierCode;
      operatingCarriers.add(operatingCarrier);
    });
  });

  return Array.from(operatingCarriers);
};

// Memoized flight processing function
export const processFlightOffer = (offer, index, dictionaries) => {
  const { price: priceData } = offer;
  const { price, totalPrice, currency } = calculateTotalPrice(priceData);
  const isRoundTrip = offer.itineraries.length === 2;

  const processedItineraries = offer.itineraries.map((itinerary) => {
    const flights =
      itinerary.segments
        ?.map((segment) => {
          const carrierCode =
            segment.operating?.carrierCode || segment.carrierCode;
          const airlineName =
            dictionaries?.carriers?.[carrierCode] || "Unknown Airline";
          const durationMinutes = parseDuration(segment.duration);

          return {
            airline: airlineName,
            airlineCode: carrierCode,
            flightNumber: `${carrierCode}${segment.number}`,
            departure: {
              time: formatTimeFromISO(segment.departure?.at),
              airport: segment.departure?.iataCode || "N/A",
              at: segment.departure?.at,
            },
            arrival: {
              time: formatTimeFromISO(segment.arrival?.at),
              airport: segment.arrival?.iataCode || "N/A",
              at: segment.arrival?.at,
            },
            duration: formatDurationFromMinutes(durationMinutes),
            durationMinutes,
            stops:
              segment.numberOfStops === 0
                ? "Direct"
                : `${segment.numberOfStops} Stop${
                    segment.numberOfStops > 1 ? "s" : ""
                  }`,
          };
        })
        .filter(Boolean) || [];

    return {
      flights,
      totalDurationMinutes: flights.reduce(
        (acc, flight) => acc + flight.durationMinutes,
        0
      ),
    };
  });

  if (processedItineraries.some((it) => it.flights.length === 0)) {
    return null;
  }

  const baggageInfo = extractBaggageInfo(offer);
  const carrierCodes = extractOperatingCarriers(offer);
  const firstAirlineCode = processedItineraries[0]?.flights[0]?.airlineCode;

  return {
    id: `${index + 1}-${offer.id || Date.now()}`,
    price: Math.round(price),
    totalPrice: Math.round(totalPrice * 100) / 100,
    currency,
    logo: firstAirlineCode,
    airlineCode: firstAirlineCode,
    carrierCodes,
    itineraries: processedItineraries,
    hasCheckedBaggage: baggageInfo.hasCheckedBaggage,
    hasCabinBaggage: baggageInfo.hasCabinBaggage,
    baggageDetails: {
      checked: baggageInfo.checkedBagDetails,
      cabin: baggageInfo.cabinBagDetails,
    },
    totalDurationMinutes: processedItineraries.reduce(
      (acc, it) => acc + it.totalDurationMinutes,
      0
    ),
    tripType: isRoundTrip ? "round-trip" : "one-way",
  };
};
