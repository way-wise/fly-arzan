import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const timedFetch = async (path) => {
  const url = `${API_BASE_URL}/api${path}`;
  const t0 = performance.now();
  const res = await fetch(url, { credentials: "include" });
  const t1 = performance.now();
  const ms = Math.max(0, Math.round(t1 - t0));
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = await res.json();
  return { json, ms };
};

export const useMonitoringHealth = (options = {}) => {
  return useQuery({
    queryKey: ["monitoring", "health"],
    queryFn: () => timedFetch("/admin/monitoring/health"),
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useMonitoringQuota = (options = {}) => {
  return useQuery({
    queryKey: ["monitoring", "quota"],
    queryFn: () => timedFetch("/admin/monitoring/quota"),
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useMonitoringAlerts = (options = {}) => {
  return useQuery({
    queryKey: ["monitoring", "alerts"],
    queryFn: () => timedFetch("/admin/monitoring/alerts"),
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
    ...options,
  });
};
