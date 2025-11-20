import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetcher = async (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}/api${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export const useAdminMetrics = ({ startDate, endDate } = {}) => {
  return useQuery({
    queryKey: ["admin", "metrics", { startDate, endDate }],
    queryFn: () => fetcher("/admin/reports/metrics", { startDate, endDate }),
  });
};

export const useAdminTimeseries = ({
  metric = "searches",
  interval = "daily",
  startDate,
  endDate,
} = {}) => {
  return useQuery({
    queryKey: ["admin", "timeseries", { metric, interval, startDate, endDate }],
    queryFn: () =>
      fetcher("/admin/reports/metrics/timeseries", {
        metric,
        interval,
        startDate,
        endDate,
      }),
  });
};

export const useAdminBreakdown = ({ type, startDate, endDate } = {}) => {
  return useQuery({
    queryKey: ["admin", "breakdown", { type, startDate, endDate }],
    queryFn: () =>
      fetcher("/admin/reports/metrics/breakdown", { type, startDate, endDate }),
    enabled: Boolean(type),
  });
};

export const useTopRoutes = ({
  startDate,
  endDate,
  limit = 10,
  sortBy = "searches",
} = {}) => {
  return useQuery({
    queryKey: ["admin", "top-routes", { startDate, endDate, limit, sortBy }],
    queryFn: () =>
      fetcher("/admin/reports/top-routes", {
        startDate,
        endDate,
        limit,
        sortBy,
      }),
  });
};
