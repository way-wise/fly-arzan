import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useFlightOffers = (queries) => {
  const axios = useAxios();

  // Build Query
  const searchParams = {
    originLocationCode: queries.originLocationCode,
    destinationLocationCode: queries.destinationLocationCode,
    departureDate: queries.departureDate?.toISOString().split("T")[0],
    adults: queries.adults,
    children: queries.children,
    travelClass: queries.travelClass,
  };

  // Conditionally add returnDate if it exists
  if (queries.returnDate) {
    searchParams.returnDate = queries.returnDate.toISOString().split("T")[0];
  }

  // Remove undefined/null params
  Object.keys(searchParams).forEach(
    (key) =>
      (searchParams[key] === undefined ||
        searchParams[key] === null ||
        searchParams[key] === "") &&
      delete searchParams[key]
  );

  const searchQueries = new URLSearchParams(searchParams);

  const { isLoading, error, data } = useQuery({
    queryKey: ["flight-offers", queries],

    queryFn: () =>
      axios
        .get(`/flight-offers?${searchQueries.toString()}`)
        .then((res) => res.data),
    enabled:
      !!queries.originLocationCode &&
      !!queries.destinationLocationCode &&
      queries.departureDate instanceof Date &&
      !isNaN(queries.departureDate) &&
      (queries.adults || 0) > 0,
  });

  return {
    isLoading,
    error,
    data,
  };
};
