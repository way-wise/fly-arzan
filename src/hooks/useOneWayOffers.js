import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useOneWayOffers = (queries) => {
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

  // Remove undefined/null params
  Object.keys(searchParams).forEach(
    (key) =>
      (searchParams[key] === undefined || searchParams[key] === null) &&
      delete searchParams[key]
  );

  const searchQueries = new URLSearchParams(searchParams);

  const { isLoading, error, data } = useQuery({
    queryKey: ["one-way-offers", queries],

    queryFn: () =>
      axios
        .get(`/flight-offers/one-way?${searchQueries.toString()}`)
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
