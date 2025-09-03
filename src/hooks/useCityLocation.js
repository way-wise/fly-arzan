import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useCityLocation = (keyword) => {
  const axios = useAxios();

  const { isLoading, error, data } = useQuery({
    queryKey: ["locations", keyword],

    queryFn: () =>
      axios.get(`/locations?keyword=${keyword}`).then((res) => res.data),
    enabled: !!keyword,
  });

  return {
    isLoading,
    error,
    data,
  };
};
