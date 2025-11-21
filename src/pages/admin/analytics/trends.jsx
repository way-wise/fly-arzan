import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DownloadIcon from "@mui/icons-material/Download";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { useTrendSearches, useTrendPrices } from "@/hooks/useAdminReports";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Mock blocks removed; user growth not yet backed by backend

export default function TrendCharts() {
  const [timeRange, setTimeRange] = useState("12m");

  const months = useMemo(
    () => (timeRange === "6m" ? 6 : timeRange === "24m" ? 24 : 12),
    [timeRange]
  );
  const { data: searchesTrend, isLoading: searchesLoading } = useTrendSearches({
    months,
  });
  const { data: priceTrend, isLoading: priceLoading } = useTrendPrices({
    months,
  });

  const conversionSeries = useMemo(() => {
    const rows = searchesTrend?.data ?? [];
    return rows.map((r) => ({
      month: r.month,
      conversionRate: r.searches
        ? Math.round((r.clickouts / r.searches) * 100 * 10) / 10
        : 0,
    }));
  }, [searchesTrend]);

  const metrics = useMemo(() => {
    const s = searchesTrend?.data ?? [];
    const p = priceTrend?.data ?? [];
    const last = s.length - 1;
    const prev = s.length - 2;
    const lastSearches = last >= 0 ? s[last].searches : 0;
    const prevSearches = prev >= 0 ? s[prev].searches : 0;
    const lastClickouts = last >= 0 ? s[last].clickouts : 0;
    const prevClickouts = prev >= 0 ? s[prev].clickouts : 0;
    const latestAvgPrice = p.length ? p[p.length - 1].avgPrice : 0;
    const latestConv = lastSearches
      ? Math.round((lastClickouts / lastSearches) * 100 * 10) / 10
      : 0;
    const pct = (curr, pr) =>
      !pr ? (curr ? 100 : 0) : Math.round(((curr - pr) / pr) * 1000) / 10;
    const searchGrowth = pct(lastSearches, prevSearches);
    const clickoutGrowth = pct(lastClickouts, prevClickouts);
    return [
      {
        title: "Search Growth",
        value: `${searchGrowth >= 0 ? "+" : ""}${searchGrowth}%`,
        trend: searchGrowth >= 0 ? "up" : "down",
        description: "vs previous month",
      },
      {
        title: "Avg Ticket Price",
        value: latestAvgPrice ? `$${latestAvgPrice}` : "$0",
        trend: "up",
        description: "latest month",
      },
      {
        title: "Conversion Rate",
        value: `${latestConv}%`,
        trend: "up",
        description: "latest month",
      },
      {
        title: "Clickout Growth",
        value: `${clickoutGrowth >= 0 ? "+" : ""}${clickoutGrowth}%`,
        trend: clickoutGrowth >= 0 ? "up" : "down",
        description: "vs previous month",
      },
    ];
  }, [searchesTrend, priceTrend]);

  const insights = useMemo(() => {
    const s = searchesTrend?.data ?? [];
    const p = priceTrend?.data ?? [];
    // Peak season by searches
    let peakMonth = "—";
    let peakSearches = 0;
    for (const row of s) {
      if ((row.searches ?? 0) > peakSearches) {
        peakSearches = row.searches ?? 0;
        peakMonth = row.month ?? "—";
      }
    }
    // Price volatility
    const prices = p
      .map((r) => r.avgPrice ?? 0)
      .filter((v) => typeof v === "number");
    const minP = prices.length ? Math.min(...prices) : 0;
    const maxP = prices.length ? Math.max(...prices) : 0;
    const volPct =
      minP > 0 ? Math.round(((maxP - minP) / minP) * 1000) / 10 : 0;
    // Conversion improvement
    const firstConv = conversionSeries.length
      ? conversionSeries[0].conversionRate ?? 0
      : 0;
    const lastConv = conversionSeries.length
      ? conversionSeries[conversionSeries.length - 1].conversionRate ?? 0
      : 0;
    const convDiff = Math.round((lastConv - firstConv) * 10) / 10; // percentage points
    // Clickouts momentum
    const firstClick = s.length ? s[0].clickouts ?? 0 : 0;
    const lastClick = s.length ? s[s.length - 1].clickouts ?? 0 : 0;
    const clickGrowth = firstClick
      ? Math.round(((lastClick - firstClick) / firstClick) * 1000) / 10
      : lastClick
      ? 100
      : 0;
    return {
      peakMonth,
      peakSearches,
      minP,
      maxP,
      volPct,
      firstConv,
      lastConv,
      convDiff,
      firstClick,
      lastClick,
      clickGrowth,
    };
  }, [searchesTrend, priceTrend, conversionSeries]);

  const handleExportSearches = () => {
    try {
      const url = new URL(`${API_BASE_URL}/api/admin/reports/trends/searches`);
      url.searchParams.set("months", String(months));
      url.searchParams.set("format", "csv");
      window.open(url.toString(), "_blank");
    } catch {
      return;
    }
  };

  const handleExportPrices = () => {
    try {
      const url = new URL(`${API_BASE_URL}/api/admin/reports/trends/prices`);
      url.searchParams.set("months", String(months));
      url.searchParams.set("format", "csv");
      window.open(url.toString(), "_blank");
    } catch {
      return;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Trend charts
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter, sans-serif" }}
          >
            Long-term evolution of searches, prices, users and conversion.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ToggleButtonGroup
            size="small"
            value={timeRange}
            exclusive
            onChange={(_, value) => value && setTimeRange(value)}
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(60, 66, 72, 0.3)",
              borderRadius: 2,
              p: 0.25,
              "& .MuiToggleButton-root": {
                border: "none",
                color: "#9ca3af",
                textTransform: "none",
                fontSize: 13,
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                transition: "all 0.2s ease",
                "&.Mui-selected": {
                  bgcolor: "#2563eb",
                  color: "#fff",
                  "&:hover": { bgcolor: "#1d4ed8" },
                },
              },
            }}
          >
            <ToggleButton value="6m">6m</ToggleButton>
            <ToggleButton value="12m">12m</ToggleButton>
            <ToggleButton value="24m">24m</ToggleButton>
          </ToggleButtonGroup>
          <Stack direction="row" spacing={1}>
            <Chip
              size="small"
              label={
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <DownloadIcon sx={{ fontSize: 16 }} />
                  <span>Export Searches</span>
                </Stack>
              }
              onClick={handleExportSearches}
              sx={{
                height: 32,
                bgcolor: "#2563eb",
                color: "#e5e7eb",
                borderRadius: 999,
                cursor: "pointer",
                fontSize: 13,
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            />
            <Chip
              size="small"
              label={
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <DownloadIcon sx={{ fontSize: 16 }} />
                  <span>Export Prices</span>
                </Stack>
              }
              onClick={handleExportPrices}
              sx={{
                height: 32,
                bgcolor: "#0ea5e9",
                color: "#e5e7eb",
                borderRadius: 999,
                cursor: "pointer",
                fontSize: 13,
                "&:hover": { bgcolor: "#0284c7" },
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2.5}>
        {(metrics.length ? metrics : [{}, {}, {}, {}]).map((metric, index) => (
          <Grid item xs={12} md={3} key={metric.title} sx={{ minWidth: 0 }}>
            <Card
              sx={{
                borderRadius: 2,
                bgcolor: "#1A1D23",
                backgroundImage: `linear-gradient(135deg, rgba(${
                  index === 0
                    ? "59, 130, 246"
                    : index === 1
                    ? "245, 158, 11"
                    : index === 2
                    ? "16, 185, 129"
                    : "168, 85, 247"
                }, 0.05) 0%, rgba(${
                  index === 0
                    ? "59, 130, 246"
                    : index === 1
                    ? "245, 158, 11"
                    : index === 2
                    ? "16, 185, 129"
                    : "168, 85, 247"
                }, 0.02) 100%)`,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#71717A",
                    fontFamily: "Inter",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {metric.title || "—"}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      fontFamily: "Inter",
                    }}
                  >
                    {metric.value || "—"}
                  </Typography>
                  {metric.trend === "up" ? (
                    <TrendingUpIcon sx={{ fontSize: 18, color: "#10B981" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 18, color: "#F97316" }} />
                  )}
                </Stack>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#71717A",
                    mt: 0.5,
                    fontFamily: "Inter",
                  }}
                >
                  {metric.description || ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Search activity trends
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Monthly searches, clickouts and bookings.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 320, minWidth: 0, width: "100%" }}>
                {searchesLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (searchesTrend?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={searchesTrend.data}>
                      <defs>
                        <linearGradient
                          id="colorSearches"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="95%"
                            stopColor="#020617"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="searches"
                        stroke="#60a5fa"
                        fill="url(#colorSearches)"
                        strokeWidth={2}
                        name="Searches"
                      />
                      <Line
                        type="monotone"
                        dataKey="clickouts"
                        stroke="#4ade80"
                        strokeWidth={2}
                        name="Clickouts"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Price trends
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Average, minimum and maximum ticket prices.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260, minWidth: 0, width: "100%" }}>
                {priceLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (priceTrend?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceTrend.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="avgPrice"
                        stroke="#60a5fa"
                        strokeWidth={3}
                        name="Avg price"
                      />
                      <Line
                        type="monotone"
                        dataKey="minPrice"
                        stroke="#4ade80"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Min price"
                      />
                      <Line
                        type="monotone"
                        dataKey="maxPrice"
                        stroke="#f97316"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Max price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              backgroundImage:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Monthly volume breakdown
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Searches vs clickouts by month.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                {searchesLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (searchesTrend?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={searchesTrend.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="searches"
                        fill="#60a5fa"
                        radius={[4, 4, 0, 0]}
                        name="Searches"
                      />
                      <Bar
                        dataKey="clickouts"
                        fill="#22c55e"
                        radius={[4, 4, 0, 0]}
                        name="Clickouts"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              backgroundImage:
                "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Conversion rate
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Monthly conversion rate performance.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                {searchesLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : conversionSeries.length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={conversionSeries}>
                      <defs>
                        <linearGradient
                          id="colorConversion"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#a855f7"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="95%"
                            stopColor="#020617"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="conversionRate"
                        stroke="#a855f7"
                        fill="url(#colorConversion)"
                        strokeWidth={3}
                        name="Conversion rate (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          background:
            "linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.02) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <TimelineIcon sx={{ fontSize: 20, color: "#60a5fa" }} />
              <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                Key insights
              </Typography>
            </Stack>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#0B0F16",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                    mb: 0.5,
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Peak season
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#71717A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {insights.peakMonth} shows the highest search volume with{" "}
                  {insights.peakSearches.toLocaleString()} searches.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#0B0F16",
                  background:
                    "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                    mb: 0.5,
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Price volatility
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#71717A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Average price ranged from ${insights.minP} to ${insights.maxP}{" "}
                  (≈ {insights.volPct}% swing).
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#0B0F16",
                  background:
                    "linear-gradient(135deg, rgba(251, 113, 133, 0.08) 0%, rgba(251, 113, 133, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                    mb: 0.5,
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Clickouts momentum
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#71717A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Clickouts changed from {insights.firstClick.toLocaleString()}{" "}
                  to {insights.lastClick.toLocaleString()} (
                  {insights.clickGrowth >= 0 ? "+" : ""}
                  {insights.clickGrowth}%).
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#0B0F16",
                  background:
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                    mb: 0.5,
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Conversion improvement
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#71717A",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Conversion rate changed from {insights.firstConv}% to{" "}
                  {insights.lastConv}% (
                  {(insights.convDiff >= 0 ? "+" : "") + insights.convDiff} pp).
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
