import { useMutation } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useMulticityFlightOffers = () => {
  const axios = useAxios();

  const mutation = useMutation({
    mutationFn: (multicityData) =>
      axios.post("/flight-offers", multicityData).then((res) => res.data),
    onSuccess: (data) => {
      // Handle success - could add toast notification or other side effects
      console.log("Multi-city flight search successful:", data);
    },
    onError: (error) => {
      // Handle error - could add error handling logic
      console.error("Multi-city flight search failed:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
