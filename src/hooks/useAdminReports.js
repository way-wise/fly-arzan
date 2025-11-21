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
    queryFn: async () => {
      const json = await fetcher("/admin/reports/metrics/timeseries", {
        metric,
        interval,
        startDate,
        endDate,
      });
      // Backend returns { series: [...] }
      return { data: json.series ?? [] };
    },
  });
};

export const useAdminBreakdown = ({ type, startDate, endDate } = {}) => {
  return useQuery({
    queryKey: ["admin", "breakdown", { type, startDate, endDate }],
    queryFn: async () => {
      const json = await fetcher("/admin/reports/metrics/breakdown", {
        type,
        startDate,
        endDate,
      });
      // Backend returns { breakdown: [{ key, count }]} or for geo we may map to { name, value }
      const items = json.breakdown ?? [];
      // Normalize shape to { name, value }
      return {
        data: items.map((i) => ({
          name: i.name ?? i.key ?? "Unknown",
          value: i.value ?? i.count ?? 0,
        })),
      };
    },
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
    queryFn: async () => {
      const rows = await fetcher("/admin/reports/top-routes", {
        startDate,
        endDate,
        limit,
        sortBy,
      });
      // Backend returns an array; wrap as { data }
      return { data: Array.isArray(rows) ? rows : [] };
    },
  });
};

export const useRoutesTrending = ({ limit = 10 } = {}) => {
  return useQuery({
    queryKey: ["admin", "routes-trending", { limit }],
    queryFn: async () => {
      const rows = await fetcher("/admin/reports/routes/trending", { limit });
      return { data: Array.isArray(rows) ? rows : [] };
    },
  });
};

export const useRegionsBreakdown = ({
  startDate,
  endDate,
  group = "region",
  top = 6,
} = {}) => {
  return useQuery({
    queryKey: ["admin", "regions", { startDate, endDate, group, top }],
    queryFn: async () => {
      const rows = await fetcher("/admin/reports/geo/regions", {
        startDate,
        endDate,
        group,
        top,
      });
      return { data: Array.isArray(rows) ? rows : [], group };
    },
  });
};

export const useEngagementSeries = ({ range = "7d" } = {}) => {
  return useQuery({
    queryKey: ["admin", "engagement-series", { range }],
    queryFn: async () => {
      const json = await fetcher("/admin/reports/engagement/series", { range });
      return { data: json?.buckets ?? [] };
    },
  });
};

export const useTrendSearches = ({ months = 12 } = {}) => {
  return useQuery({
    queryKey: ["admin", "trends-searches", { months }],
    queryFn: async () => {
      const rows = await fetcher("/admin/reports/trends/searches", { months });
      return { data: Array.isArray(rows) ? rows : [] };
    },
  });
};

export const useTrendPrices = ({ months = 12 } = {}) => {
  return useQuery({
    queryKey: ["admin", "trends-prices", { months }],
    queryFn: async () => {
      const rows = await fetcher("/admin/reports/trends/prices", { months });
      return { data: Array.isArray(rows) ? rows : [] };
    },
  });
};

export const useEngagementSummary = ({ range = "7d" } = {}) => {
  return useQuery({
    queryKey: ["admin", "engagement-summary", { range }],
    queryFn: async () => {
      const json = await fetcher("/admin/reports/engagement/summary", {
        range,
      });
      return json;
    },
  });
};
