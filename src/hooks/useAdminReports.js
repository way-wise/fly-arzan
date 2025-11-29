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
    queryFn: async () => {
      // Fetch both metrics and engagement summary for complete data
      const [metricsJson, summaryJson] = await Promise.all([
        fetcher("/admin/reports/metrics", { startDate, endDate }),
        fetcher("/admin/reports/engagement/summary", {
          range: startDate ? "custom" : "7d",
          startDate,
          endDate,
        }).catch(() => null),
      ]);

      // Calculate percentage change
      const pctChange = (curr, prev) => {
        if (!prev) return curr ? 100 : 0;
        return Math.round(((curr - prev) / prev) * 100);
      };

      const last = metricsJson.last24h ?? {};
      const prev = metricsJson.prev24h ?? {};

      // Transform to the structure the dashboard expects
      return {
        totalSearches: {
          value: summaryJson?.current?.searches ?? last.totalSearches ?? 0,
          change: summaryJson?.deltas?.searches
            ? Math.round(summaryJson.deltas.searches)
            : pctChange(last.totalSearches, prev.totalSearches),
        },
        clickoutRate: {
          value: summaryJson?.current?.ctr
            ? Math.round(summaryJson.current.ctr * 10) / 10
            : Math.round((last.clickOutRate ?? 0) * 100 * 10) / 10,
          change: summaryJson?.deltas?.ctr
            ? Math.round(summaryJson.deltas.ctr)
            : pctChange(last.clickOutRate, prev.clickOutRate),
        },
        uniqueVisitors: {
          value: summaryJson?.current?.sessions ?? 0,
          change: summaryJson?.deltas?.sessions
            ? Math.round(summaryJson.deltas.sessions)
            : 0,
        },
        apiHealth: {
          value: 100, // Will be updated from monitoring hook
          change: 0,
        },
        // Keep raw data for other uses
        raw: metricsJson,
      };
    },
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

// Search logs hooks
export const useSearchLogs = ({
  page = 1,
  limit = 50,
  startDate,
  endDate,
  origin,
  destination,
  tripType,
  travelClass,
  deviceType,
  browser,
  os,
  country,
} = {}) => {
  return useQuery({
    queryKey: [
      "admin",
      "search-logs",
      { page, limit, startDate, endDate, origin, destination, tripType, travelClass, deviceType, browser, os, country },
    ],
    queryFn: async () => {
      const json = await fetcher("/admin/logs/search-logs", {
        page,
        limit,
        startDate,
        endDate,
        origin,
        destination,
        tripType,
        travelClass,
        deviceType,
        browser,
        os,
        country,
      });
      return json;
    },
  });
};

export const useSearchLogsFilterOptions = () => {
  return useQuery({
    queryKey: ["admin", "search-logs-filter-options"],
    queryFn: () => fetcher("/admin/logs/filter-options"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const getSearchLogsExportUrl = (params = {}) => {
  const url = new URL(`${API_BASE_URL}/api/admin/logs/search-logs/export`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
};
