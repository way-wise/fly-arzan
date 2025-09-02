import axios from "axios";
import { toast } from "sonner";

// Create Axios instance (proxied `/api` to backend via Next.js config)
const axiosInstance = axios.create({
  baseURL: "/api",
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;

      if (status === 401) {
        toast.error("Unauthorized");
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Client-side only — hooks are not allowed in server components.
 * Returns a pre-configured Axios instance for making authenticated API requests.
 * @returns Axios instance
 */
export const useAxios = () => axiosInstance;
