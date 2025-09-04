import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useOneWayOffers = (queries) => {
  const axios = useAxios();

  // Build Query
  const searchQueries = new URLSearchParams({
    originLocationCode: queries.originLocationCode,
    destinationLocationCode: queries.destinationLocationCode,
    departureDate: queries.departureDate.toISOString().split("T")[0],
    adults: queries.adults,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["one-way-offers", queries],

    queryFn: () =>
      axios
        .get(`/flight-offers/one-way?${searchQueries.toString()}`)
        .then((res) => res.data),
  });

  return {
    isLoading,
    error,
    data,
  };
};
