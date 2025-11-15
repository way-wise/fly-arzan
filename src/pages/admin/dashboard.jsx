import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  FlightTakeoff,
  TrendingUp,
  Public,
  QueryStats as QueryStatsIcon,
  Timeline as TimelineIcon,
  Route as RouteIcon,
  Speed,
  People,
  TravelExplore,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

// ===== Mock data tailored for flight analytics & monitoring =====
const kpiData = {
  totalSearches: { value: 48237, change: 12.4 },
  clickoutRate: { value: 34.2, change: 5.1 },
  uniqueVisitors: { value: 18740, change: 7.8 },
  healthyServices: { value: 5, total: 6 },
};

const searchTimeseries = [
  { label: "00:00", searches: 820, clickouts: 260 },
  { label: "04:00", searches: 640, clickouts: 190 },
  { label: "08:00", searches: 2310, clickouts: 810 },
  { label: "12:00", searches: 3180, clickouts: 1120 },
  { label: "16:00", searches: 2890, clickouts: 970 },
  { label: "20:00", searches: 2140, clickouts: 720 },
];

const routePerformance = [
  { route: "ALA → IST", searches: 9560, clickouts: 3420 },
  { route: "ALA → DXB", searches: 8123, clickouts: 2851 },
  { route: "ALA → SAW", searches: 6890, clickouts: 2075 },
  { route: "ALA → KUL", searches: 5321, clickouts: 1423 },
  { route: "TSE → IST", searches: 4210, clickouts: 1267 },
];

const deviceShare = [
  { name: "Desktop", value: 58, color: "#60a5fa" },
  { name: "Mobile", value: 34, color: "#22c55e" },
  { name: "Tablet", value: 8, color: "#f97316" },
];

const geoDistribution = [
  { country: "KZ", label: "Kazakhstan", visitors: 12450 },
  { country: "TR", label: "Turkey", visitors: 7421 },
  { country: "AE", label: "UAE", visitors: 5320 },
  { country: "RU", label: "Russia", visitors: 3895 },
  { country: "DE", label: "Germany", visitors: 2144 },
];

const apiLatency = [
  { service: "Backend", p95: 180 },
  { service: "Amadeus", p95: 340 },
  { service: "Geo IP", p95: 120 },
];

export default function Dashboard() {
  const [range] = useState("Last 7 days");

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
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#FFFFFF", fontFamily: "Inter" }}>
            Flight Analytics Overview
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}>
            High-level snapshot of user behavior, route performance, and API health.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            size="small"
            label={range}
            sx={{
              bgcolor: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: 2,
              fontFamily: "Inter",
              fontSize: "0.75rem"
            }}
          />
          <Chip
            size="small"
            label="Realtime preview"
            sx={{
              bgcolor: "rgba(16, 185, 129, 0.1)",
              color: "#10B981",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: 2,
              fontFamily: "Inter",
              fontSize: "0.75rem"
            }}
          />
        </Stack>
      </Box>

      {/* KPI row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter", fontSize: "0.75rem" }}>
                    Total Searches
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.5, fontFamily: "Inter" }}>
                    {kpiData.totalSearches.value.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                    <TrendingUp sx={{ fontSize: 16, color: "#4ade80" }} />
                    <Typography variant="caption" sx={{ color: "#10B981", fontFamily: "Inter", fontSize: "0.75rem" }}>
                      +{kpiData.totalSearches.change}% vs last period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "rgba(59, 130, 246, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FlightTakeoff sx={{ fontSize: 22, color: "#60a5fa" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter", fontSize: "0.75rem" }}>
                    Clickout Rate
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.5, fontFamily: "Inter" }}>
                    {kpiData.clickoutRate.value}%
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                    <TrendingUp sx={{ fontSize: 16, color: "#4ade80" }} />
                    <Typography variant="caption" sx={{ color: "#10B981", fontFamily: "Inter", fontSize: "0.75rem" }}>
                      +{kpiData.clickoutRate.change}% vs last period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "rgba(22,163,74,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <QueryStatsIcon sx={{ fontSize: 22, color: "#6ee7b7" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter", fontSize: "0.75rem" }}>
                    Unique Visitors (IP)
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.5, fontFamily: "Inter" }}>
                    {kpiData.uniqueVisitors.value.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                    <TrendingUp sx={{ fontSize: 16, color: "#38bdf8" }} />
                    <Typography variant="caption" sx={{ color: "#38bdf8" }}>
                      +{kpiData.uniqueVisitors.change}% vs last period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "rgba(59,130,246,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Public sx={{ fontSize: 22, color: "#93c5fd" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter", fontSize: "0.75rem" }}>
                    API Health
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.5, fontFamily: "Inter" }}>
                    {kpiData.healthyServices.value}/{kpiData.healthyServices.total}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter", fontSize: "0.75rem" }}>
                    Core services operational
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 80, mt: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(kpiData.healthyServices.value / kpiData.healthyServices.total) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 999,
                      bgcolor: "rgba(15,23,42,1)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 999,
                        bgcolor: "#4ade80",
                      },
                    }}
                  />
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
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                    Searches vs Clickouts
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                    Activity over the selected time window
                  </Typography>
                </Box>
                <TimelineIcon sx={{ fontSize: 20, color: "#93c5fd" }} />
              </Stack>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={searchTimeseries}>
                    <defs>
                      <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorClickouts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="label" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="searches"
                      stroke="#60a5fa"
                      fill="url(#colorSearches)"
                      name="Searches"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="clickouts"
                      stroke="#4ade80"
                      fill="url(#colorClickouts)"
                      name="Clickouts"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                    Top Routes by Searches
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                    With clickout volume overlay
                  </Typography>
                </Box>
                <RouteIcon sx={{ fontSize: 20, color: "#f97316" }} />
              </Stack>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={routePerformance} layout="vertical" stackOffset="none">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis type="number" stroke="#6b7280" fontSize={11} />
                    <YAxis dataKey="route" type="category" stroke="#9ca3af" fontSize={11} width={90} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                    <Legend />
                    <Bar dataKey="searches" fill="#60a5fa" radius={[0, 8, 8, 0]} name="Searches" />
                    <Bar dataKey="clickouts" fill="#4ade80" radius={[0, 8, 8, 0]} name="Clickouts" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom analytics row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                    Device Mix
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                    Desktop vs mobile vs tablet
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 20, color: "#facc15" }} />
              </Stack>
              <Box sx={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceShare}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {deviceShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                    Visitors by Country
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                    Top geo sources by unique IP
                  </Typography>
                </Box>
                <TravelExplore sx={{ fontSize: 20, color: "#22c55e" }} />
              </Stack>
              <Stack spacing={1.25}>
                {geoDistribution.map((row) => (
                  <Box key={row.country} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: 1,
                        bgcolor: "rgba(15,23,42,1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#e5e7eb",
                      }}
                    >
                      {row.country}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                        {row.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        {row.visitors.toLocaleString()} visitors
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                    API Latency (p95)
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                    Key integration response times
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 20, color: "#38bdf8" }} />
              </Stack>
              <Stack spacing={1.5}>
                {apiLatency.map((row) => (
                  <Box key={row.service}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                        {row.service}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        {row.p95} ms
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(row.p95 / 5, 100)}
                      sx={{
                        mt: 0.5,
                        height: 6,
                        borderRadius: 999,
                        bgcolor: "rgba(15,23,42,1)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          bgcolor:
                            row.service === "Amadeus" ? "#f97316" : row.service === "Backend" ? "#4ade80" : "#38bdf8",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer strip */}
      <Box sx={{ mt: 1 }}>
        <Divider sx={{ borderColor: "rgba(15,23,42,0.9)" }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mt: 1.5, color: "#6b7280" }}
          spacing={1}
        >
          <Typography variant="caption">
            Data is illustrative only – wire this dashboard to your new analytics and monitoring APIs.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <People sx={{ fontSize: 14 }} />
            <Typography variant="caption">Admin workspace · Flight & user intelligence</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
