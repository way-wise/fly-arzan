import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  TextField,
} from "@mui/material";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import TrendingUp from "@mui/icons-material/TrendingUp";
import Public from "@mui/icons-material/Public";
import RouteIcon from "@mui/icons-material/Route";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import {
  useTopRoutes,
  useRegionsBreakdown,
  useAdminBreakdown,
  useRoutesTrending,
} from "@/hooks/useAdminReports";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper to compute date range from toggle
const getRange = (range) => {
  const now = new Date();
  const endDate = now.toISOString();
  const start = new Date(now);
  if (range === "24h") start.setDate(now.getDate() - 1);
  else if (range === "7d") start.setDate(now.getDate() - 7);
  else if (range === "30d") start.setDate(now.getDate() - 30);
  const startDate = start.toISOString();
  return { startDate, endDate };
};

// (mock blocks removed; now fed by live queries)

export default function SearchRoutes() {
  const [range, setRange] = useState("7d");
  const [query, setQuery] = useState("");

  const { startDate, endDate } = useMemo(() => getRange(range), [range]);
  const { data: routesData, isLoading: routesLoading } = useTopRoutes({
    startDate,
    endDate,
    limit: 10,
  });
  const { data: regionsData, isLoading: regionsLoading } = useRegionsBreakdown({
    startDate,
    endDate,
    group: "country",
    top: 6,
  });
  const { data: cabinData, isLoading: cabinLoading } = useAdminBreakdown({
    type: "travelClass",
    startDate,
    endDate,
  });
  const { data: trendingData, isLoading: trendingLoading } = useRoutesTrending({
    limit: 10,
  });

  const filteredRoutes = (routesData?.data ?? []).filter(
    (r) =>
      (r.origin ?? "").toLowerCase().includes(query.toLowerCase()) ||
      (r.destination ?? "").toLowerCase().includes(query.toLowerCase())
  );

  const { totalSearches, uniqueRoutes, avgConv, topDest, topDestSearches } =
    useMemo(() => {
      const rows = routesData?.data ?? [];
      const totalSearches = rows.reduce((a, r) => a + (r.searches ?? 0), 0);
      const totalClickouts = rows.reduce((a, r) => a + (r.clickouts ?? 0), 0);
      const uniqueRoutes = rows.length;
      const avgConv = totalSearches
        ? Math.round((totalClickouts / totalSearches) * 100 * 10) / 10
        : 0; // weighted by searches
      const destMap = new Map();
      for (const r of rows) {
        const d = r.destination ?? "—";
        destMap.set(d, (destMap.get(d) || 0) + (r.searches ?? 0));
      }
      let topDest = "—";
      let topDestSearches = 0;
      for (const [d, s] of destMap.entries()) {
        if (s > topDestSearches) {
          topDest = d;
          topDestSearches = s;
        }
      }
      return { totalSearches, uniqueRoutes, avgConv, topDest, topDestSearches };
    }, [routesData]);

  const handleExport = () => {
    try {
      const url = new URL(`${API_BASE_URL}/api/admin/reports/top-routes`);
      url.searchParams.set("format", "csv");
      url.searchParams.set("startDate", startDate);
      url.searchParams.set("endDate", endDate);
      url.searchParams.set("limit", String(50));
      window.open(url.toString(), "_blank");
    } catch {
      return;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
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
            Routes Analytics
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter, sans-serif" }}
          >
            See which routes are most popular and convert best across your
            audience.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ToggleButtonGroup
            size="small"
            value={range}
            exclusive
            onChange={(_, value) => value && setRange(value)}
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
            <ToggleButton value="24h">24h</ToggleButton>
            <ToggleButton value="7d">7d</ToggleButton>
            <ToggleButton value="30d">30d</ToggleButton>
          </ToggleButtonGroup>
          <Chip
            size="small"
            label="Export CSV"
            sx={{
              height: 32,
              bgcolor: "#2563eb",
              color: "#e5e7eb",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 13,
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
            onClick={handleExport}
          />
        </Stack>
      </Box>

      {/* KPI row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#71717A",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Total route searches
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {totalSearches.toLocaleString()}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 0.5 }}
                    alignItems="center"
                  >
                    <TrendingUp sx={{ fontSize: 15, color: "#4ade80" }} />
                    <Typography variant="caption" sx={{ color: "#4ade80" }}>
                      vs previous period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: "rgba(37,99,235,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RouteIcon sx={{ fontSize: 18, color: "#93c5fd" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
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
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#71717A",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Unique routes
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {uniqueRoutes.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#a855f7", mt: 0.5 }}
                  >
                    Active route pairs in this period
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: "rgba(88,28,135,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FlightTakeoff sx={{ fontSize: 18, color: "#e9d5ff" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#71717A",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Avg conversion
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {avgConv}%
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#4ade80", mt: 0.5 }}
                  >
                    Clickouts per search across all routes
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(75, 85, 99, 0.05) 0%, rgba(75, 85, 99, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#71717A",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Top destination
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {topDest}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#9ca3af", mt: 0.5 }}
                  >
                    {topDestSearches.toLocaleString()} searches
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: "rgba(30,64,175,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Public sx={{ fontSize: 18, color: "#bfdbfe" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts row */}
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
                  Top routes by searches & clickouts
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Compare demand and outbound traffic for key routes.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 280 }}>
                {routesLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (routesData?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={(routesData?.data ?? []).map((r) => ({
                        route: `${r.origin ?? ""} → ${r.destination ?? ""}`,
                        searches: r.searches ?? 0,
                        clickouts: r.clickouts ?? 0,
                      }))}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis type="number" stroke="#6b7280" fontSize={11} />
                      <YAxis
                        dataKey={(d) => d.route}
                        type="category"
                        stroke="#9ca3af"
                        fontSize={11}
                        width={110}
                      />
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
                        radius={[0, 8, 8, 0]}
                        name="Searches"
                      />
                      <Bar
                        dataKey="clickouts"
                        fill="#4ade80"
                        radius={[0, 8, 8, 0]}
                        name="Clickouts"
                      />
                    </BarChart>
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
                  Searches by region
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Where users are flying to and from.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                {regionsLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (regionsData?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      {(() => {
                        const labelKey =
                          regionsData?.group === "country"
                            ? "country"
                            : "region";
                        return (
                          <Pie
                            data={(regionsData?.data ?? []).map((r) => ({
                              ...r,
                              color: "#60a5fa",
                            }))}
                            dataKey="searches"
                            nameKey={labelKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label={(entry) => {
                              const name = entry[labelKey];
                              const pct =
                                typeof entry.percent === "number"
                                  ? (entry.percent * 100).toFixed(0)
                                  : "0";
                              return `${name} ${pct}%`;
                            }}
                          >
                            {(regionsData?.data ?? []).map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  [
                                    "#60a5fa",
                                    "#22c55e",
                                    "#f97316",
                                    "#a855f7",
                                    "#facc15",
                                    "#06b6d4",
                                  ][index % 6]
                                }
                              />
                            ))}
                          </Pie>
                        );
                      })()}
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom row: cabin distribution & table */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
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
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Cabin distribution
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Share of searches by travel class.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 240 }}>
                {cabinLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : (cabinData?.data ?? []).length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 1 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={(cabinData?.data ?? []).map((c, i) => ({
                        name: c.name ?? "Unknown",
                        value: c.value ?? 0,
                        color: ["#60a5fa", "#22c55e", "#facc15", "#a855f7"][
                          i % 4
                        ],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020617",
                          border: "1px solid #1f2937",
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {(cabinData?.data ?? []).map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              ["#60a5fa", "#22c55e", "#facc15", "#a855f7"][
                                index % 4
                              ]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              background:
                "linear-gradient(135deg, rgba(251, 113, 133, 0.05) 0%, rgba(251, 113, 133, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Top routes table
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Detailed view of route volume, clickouts, and conversion.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ mb: 1.5 }}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Filter by origin or destination (e.g., ALA, IST)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: {
                      bgcolor: "rgba(15,23,42,0.9)",
                      borderRadius: 999,
                      fontSize: 13,
                    },
                  }}
                />
              </Box>
              <Box sx={{ overflowX: "auto" }}>
                {routesLoading ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ py: 4 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
                  </Stack>
                ) : filteredRoutes.length === 0 ? (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ py: 4 }}
                  >
                    <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
                  </Stack>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          #
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          Route
                        </th>
                        <th
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          Searches
                        </th>
                        <th
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          Clickouts
                        </th>
                        <th
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          Conversion
                        </th>
                        <th
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            color: "#9ca3af",
                            fontSize: 12,
                          }}
                        >
                          Avg price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoutes.map((route, index) => (
                        <tr
                          key={`${route.origin}-${route.destination}-${index}`}
                          style={{ borderTop: "1px solid #020617" }}
                        >
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#9ca3af",
                            }}
                          >
                            #{index + 1}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                            }}
                          >
                            {route.origin} &nbsp;→&nbsp; {route.destination}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {(route.searches ?? 0).toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {(route.clickouts ?? 0).toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#bbf7d0",
                              textAlign: "right",
                            }}
                          >
                            {(route.conversion ?? 0).toFixed?.(1) ??
                              route.conversion ??
                              0}
                            %
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {route.avgPrice != null
                              ? `$${route.avgPrice}`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trending routes list */}
      <Card
        sx={{
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
              Fastest growing routes
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Routes with the strongest week-over-week growth.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={1.5}>
            {trendingLoading ? (
              <Stack alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                <Typography sx={{ color: "#9ca3af" }}>Loading…</Typography>
              </Stack>
            ) : (trendingData?.data ?? []).length === 0 ? (
              <Stack alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                <Typography sx={{ color: "#9ca3af" }}>No data</Typography>
              </Stack>
            ) : (
              (trendingData?.data ?? []).map((r, index) => (
                <Box
                  key={`${r.route}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(15,23,42,1)",
                    border: "1px solid rgba(31,41,55,0.9)",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        bgcolor: "rgba(37,99,235,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#e5e7eb",
                      }}
                    >
                      #{index + 1}
                    </Box>
                    <Box>
                      <Typography
                        sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}
                      >
                        {r.route}
                      </Typography>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                        {r.searches.toLocaleString()} searches this period
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <TrendingUp sx={{ fontSize: 18, color: "#4ade80" }} />
                    <Typography
                      sx={{ color: "#4ade80", fontWeight: 600, fontSize: 14 }}
                    >
                      +{r.growth.toFixed(1)}%
                    </Typography>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
