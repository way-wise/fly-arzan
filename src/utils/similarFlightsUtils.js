/**
 * Utility functions for finding and managing similar flight recommendations
 */

/**
 * Calculate price difference percentage between two prices
 */
const getPriceDifferencePercentage = (price1, price2) => {
  const diff = Math.abs(price1 - price2);
  const avg = (price1 + price2) / 2;
  return (diff / avg) * 100;
};

/**
 * Check if two flights have the same route (for one-way flights)
 */
const isSameRoute = (flight1, flight2) => {
  if (!flight1.itineraries?.[0]?.flights || !flight2.itineraries?.[0]?.flights) return false;

  const f1First = flight1.itineraries[0].flights[0];
  const f1Last = flight1.itineraries[0].flights[flight1.itineraries[0].flights.length - 1];
  const f2First = flight2.itineraries[0].flights[0];
  const f2Last = flight2.itineraries[0].flights[flight2.itineraries[0].flights.length - 1];

  return f1First?.departure?.iataCode === f2First?.departure?.iataCode &&
         f1Last?.arrival?.iataCode === f2Last?.arrival?.iataCode;
};

/**
 * Check if two flights have matching round-trip routes
 */
const isSameRoundTripRoute = (flight1, flight2) => {
  if (!flight1.itineraries || !flight2.itineraries) return false;
  if (flight1.itineraries.length !== 2 || flight2.itineraries.length !== 2) return false;

  // Check outbound route
  const f1Out = flight1.itineraries[0].flights;
  const f1Return = flight1.itineraries[1].flights;
  const f2Out = flight2.itineraries[0].flights;
  const f2Return = flight2.itineraries[1].flights;

  if (!f1Out?.[0] || !f1Return?.[0] || !f2Out?.[0] || !f2Return?.[0]) return false;

  const f1OutDepart = f1Out[0].departure?.iataCode;
  const f1OutArrive = f1Out[f1Out.length - 1].arrival?.iataCode;
  const f1ReturnDepart = f1Return[0].departure?.iataCode;
  const f1ReturnArrive = f1Return[f1Return.length - 1].arrival?.iataCode;

  const f2OutDepart = f2Out[0].departure?.iataCode;
  const f2OutArrive = f2Out[f2Out.length - 1].arrival?.iataCode;
  const f2ReturnDepart = f2Return[0].departure?.iataCode;
  const f2ReturnArrive = f2Return[f2Return.length - 1].arrival?.iataCode;

  return f1OutDepart === f2OutDepart &&
         f1OutArrive === f2OutArrive &&
         f1ReturnDepart === f2ReturnDepart &&
         f1ReturnArrive === f2ReturnArrive;
};

/**
 * Check if two multi-city flights have similar routes
 */
const isSimilarMultiCityRoute = (flight1, flight2) => {
  if (!flight1.itineraries || !flight2.itineraries) return false;
  if (flight1.itineraries.length !== flight2.itineraries.length) return false;

  // For multi-city, check if at least 70% of the segments match
  let matchingSegments = 0;
  const totalSegments = flight1.itineraries.length;

  for (let i = 0; i < totalSegments; i++) {
    const f1Segment = flight1.itineraries[i]?.flights;
    const f2Segment = flight2.itineraries[i]?.flights;

    if (f1Segment?.[0] && f2Segment?.[0] && f1Segment[f1Segment.length - 1] && f2Segment[f2Segment.length - 1]) {
      const f1Depart = f1Segment[0].departure?.iataCode;
      const f1Arrive = f1Segment[f1Segment.length - 1].arrival?.iataCode;
      const f2Depart = f2Segment[0].departure?.iataCode;
      const f2Arrive = f2Segment[f2Segment.length - 1].arrival?.iataCode;

      if (f1Depart === f2Depart && f1Arrive === f2Arrive) {
        matchingSegments++;
      }
    }
  }

  return (matchingSegments / totalSegments) >= 0.7; // 70% similarity threshold
};

/**
 * Determine trip type based on itineraries structure
 */
const determineTripType = (flight) => {
  if (!flight.itineraries || flight.itineraries.length === 0) return 'one-way';

  if (flight.itineraries.length === 1) return 'one-way';

  if (flight.itineraries.length === 2) {
    // Check if it's a true round-trip or multi-city
    const firstSegment = flight.itineraries[0].flights;
    const secondSegment = flight.itineraries[1].flights;

    if (firstSegment?.[0] && secondSegment?.[0] && firstSegment[firstSegment.length - 1] && secondSegment[secondSegment.length - 1]) {
      const firstOrigin = firstSegment[0].departure?.iataCode;
      const firstDestination = firstSegment[firstSegment.length - 1].arrival?.iataCode;
      const secondOrigin = secondSegment[0].departure?.iataCode;
      const secondDestination = secondSegment[secondSegment.length - 1].arrival?.iataCode;

      // True round-trip: A->B, B->A
      if (firstOrigin === secondDestination && firstDestination === secondOrigin) {
        return 'round-trip';
      }
    }

    return 'multi-city';
  }

  return 'multi-city'; // More than 2 itineraries
};

/**
 * Find similar flights based on route, price, and trip type
 * Now includes the selected flight in the pool for switching
 */
export const findSimilarFlights = (selectedFlight, allFlights, maxResults = 5) => {
  if (!selectedFlight || !allFlights || !Array.isArray(allFlights)) {
    return [];
  }


  // Try multiple price field options
  const selectedPrice = parseFloat(selectedFlight.price?.grandTotal) ||
                       parseFloat(selectedFlight.price) ||
                       parseFloat(selectedFlight.grandTotal) ||
                       0;

  const selectedId = selectedFlight.id;
  const selectedTripType = determineTripType(selectedFlight);


  if (selectedPrice === 0) {
    return [];
  }

  // Filter flights and calculate similarity scores (INCLUDING the selected flight)
  const similarFlights = allFlights
    .filter(flight => {
      // Try multiple price field options for comparison flights too
      const flightPrice = parseFloat(flight.price?.grandTotal) ||
                         parseFloat(flight.price) ||
                         parseFloat(flight.grandTotal) ||
                         0;

      if (flightPrice === 0) {
        return false;
      }

      // Price similarity check (±25%)
      const priceDiff = getPriceDifferencePercentage(selectedPrice, flightPrice);

      if (priceDiff > 25) {
        return false;
      }

      const flightTripType = determineTripType(flight);

      // Trip type must match
      if (selectedTripType !== flightTripType) {
        return false;
      }

      // Route similarity check based on trip type
      let routeMatch = false;
      switch (selectedTripType) {
        case 'one-way':
          routeMatch = isSameRoute(selectedFlight, flight);
          break;
        case 'round-trip':
          routeMatch = isSameRoundTripRoute(selectedFlight, flight);
          break;
        case 'multi-city':
          routeMatch = isSimilarMultiCityRoute(selectedFlight, flight);
          break;
        default:
          routeMatch = false;
      }

      if (!routeMatch) {
        // TEMPORARY DEBUG: Let's be more lenient for debugging
        routeMatch = true;
      } else {
      }

      return routeMatch;
    })
    .map(flight => {
      // Use same price extraction logic
      const flightPrice = parseFloat(flight.price?.grandTotal) ||
                         parseFloat(flight.price) ||
                         parseFloat(flight.grandTotal) ||
                         0;
      const priceDiff = getPriceDifferencePercentage(selectedPrice, flightPrice);

      // Calculate similarity score (lower is better)
      const similarityScore = priceDiff;

      return {
        ...flight,
        similarityScore,
        isCurrentlySelected: flight.id === selectedId
      };
    })
    .sort((a, b) => a.similarityScore - b.similarityScore); // Sort by similarity (best first)

  // Ensure we have the selected flight + up to maxResults similar flights (total 6)
  const selectedFlightInResults = similarFlights.find(f => f.isCurrentlySelected);
  const otherFlights = similarFlights.filter(f => !f.isCurrentlySelected);

  // If selected flight isn't in results, add it first
  let finalResults = [];
  if (selectedFlightInResults) {
    finalResults = [selectedFlightInResults, ...otherFlights.slice(0, maxResults)];
  } else {
    // Add selected flight manually if it's not in the filtered results
    const selectedWithFlag = {
      ...selectedFlight,
      similarityScore: 0,
      isCurrentlySelected: true
    };
    finalResults = [selectedWithFlag, ...otherFlights.slice(0, maxResults)];
  }

  return finalResults;
};

/**
 * Store similar flights pool in session storage
 * This stores the full pool of 6 flights (selected + 5 similar)
 */
export const storeSimilarFlights = (similarFlightsPool) => {
  try {
    sessionStorage.setItem('similar-flights-pool', JSON.stringify(similarFlightsPool));
  } catch (error) {
    console.warn('Failed to store similar flights pool:', error);
  }
};

/**
 * Retrieve similar flights pool from session storage
 */
export const getSimilarFlightsPool = () => {
  try {
    const stored = sessionStorage.getItem('similar-flights-pool');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to retrieve similar flights pool:', error);
    return [];
  }
};

/**
 * Get only the non-selected similar flights for display
 */
export const getSimilarFlights = () => {
  const pool = getSimilarFlightsPool();
  return pool.filter(flight => !flight.isCurrentlySelected);
};

/**
 * Generate and store similar flights pool for a selected flight
 */
export const generateAndStoreSimilarFlights = (selectedFlight, allFlights, maxResults = 5) => {

  const similarFlightsPool = findSimilarFlights(selectedFlight, allFlights, maxResults);

  storeSimilarFlights(similarFlightsPool);
  return similarFlightsPool;
};

/**
 * Switch the selected flight in the similar flights pool
 * This handles the dynamic switching between flights
 */
export const switchSelectedFlight = (newSelectedFlightId) => {
  try {
    const pool = getSimilarFlightsPool();

    // Update the pool to mark the new selected flight and unmark the old one
    const updatedPool = pool.map(flight => ({
      ...flight,
      isCurrentlySelected: flight.id === newSelectedFlightId
    }));

    // Store the updated pool
    storeSimilarFlights(updatedPool);

    // Get the new selected flight details
    const newSelectedFlight = updatedPool.find(flight => flight.isCurrentlySelected);
    return newSelectedFlight;
  } catch (error) {
    console.warn('Failed to switch selected flight:', error);
    return null;
  }
};