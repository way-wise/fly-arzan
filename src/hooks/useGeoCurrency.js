import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useGeoCurrency = () => {
  const axios = useAxios();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["geoCurrency"],
    queryFn: () => axios.get(`/geo-currency`).then((res) => res.data),
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
