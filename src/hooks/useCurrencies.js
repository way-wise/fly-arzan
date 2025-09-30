import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useCurrencies = () => {
  const axios = useAxios();

  const { isLoading, error, data } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => axios.get(`/geo-currency/currencies`).then((res) => res.data),
    gcTime: Infinity, // Cache forever
    staleTime: Infinity, // Never refetch
  });

  return {
    isLoading,
    error,
    currencies: data || {},
  };
};
