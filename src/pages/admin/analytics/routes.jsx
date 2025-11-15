import { useState } from "react";
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

// Mock data tailored for route analytics (replace with real API later)
const topRoutes = [
  { origin: "ALA", destination: "IST", searches: 9560, clickouts: 3420, conversion: 35.8, avgPrice: 289 },
  { origin: "ALA", destination: "DXB", searches: 8123, clickouts: 2851, conversion: 35.1, avgPrice: 356 },
  { origin: "ALA", destination: "SAW", searches: 6892, clickouts: 1823, conversion: 26.4, avgPrice: 244 },
  { origin: "TSE", destination: "IST", searches: 5621, clickouts: 1456, conversion: 25.9, avgPrice: 267 },
  { origin: "ALA", destination: "KUL", searches: 5234, clickouts: 1398, conversion: 26.7, avgPrice: 412 },
  { origin: "ALA", destination: "FRA", searches: 4892, clickouts: 1234, conversion: 25.2, avgPrice: 389 },
  { origin: "ALA", destination: "LHR", searches: 4523, clickouts: 1198, conversion: 26.5, avgPrice: 356 },
  { origin: "TSE", destination: "DXB", searches: 4234, clickouts: 1123, conversion: 26.5, avgPrice: 298 },
];

const routesByRegion = [
  { region: "Central Asia", searches: 18543, color: "#60a5fa" },
  { region: "Middle East", searches: 14234, color: "#22c55e" },
  { region: "Europe", searches: 9892, color: "#f97316" },
  { region: "Southeast Asia", searches: 7456, color: "#a855f7" },
];

const cabinDistribution = [
  { name: "Economy", value: 67, color: "#60a5fa" },
  { name: "Premium Econ", value: 18, color: "#22c55e" },
  { name: "Business", value: 12, color: "#facc15" },
  { name: "First", value: 3, color: "#a855f7" },
];

const trendingRoutes = [
  { route: "ALA → IST", growth: 45.2, searches: 9560 },
  { route: "ALA → DXB", growth: 38.7, searches: 8123 },
  { route: "TSE → IST", growth: 32.4, searches: 5621 },
  { route: "ALA → KUL", growth: 28.9, searches: 5234 },
];

const kpi = {
  totalSearches: 48237,
  uniqueRoutes: 2847,
  avgConversion: 26.3,
  topDestination: "IST",
  topDestinationSearches: 8543,
};

export default function SearchRoutes() {
  const [range, setRange] = useState("7d");
  const [query, setQuery] = useState("");

  const filteredRoutes = topRoutes.filter(
    (r) =>
      r.origin.toLowerCase().includes(query.toLowerCase()) ||
      r.destination.toLowerCase().includes(query.toLowerCase())
  );

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
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
            Routes Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            See which routes are most popular and convert best across your audience.
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
              border: "1px solid #262626",
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
          />
        </Stack>
      </Box>

      {/* KPI row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(59,130,246,0.35)",
            }}
          >
            <CardContent sx={{ p: 2.25 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    Total route searches
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpi.totalSearches.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} alignItems="center">
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(147,51,234,0.35)",
            }}
          >
            <CardContent sx={{ p: 2.25 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    Unique routes
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpi.uniqueRoutes.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#a855f7", mt: 0.5 }}>
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(34,197,94,0.35)",
            }}
          >
            <CardContent sx={{ p: 2.25 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    Avg conversion
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpi.avgConversion}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#4ade80", mt: 0.5 }}>
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(248,250,252,0.16)",
            }}
          >
            <CardContent sx={{ p: 2.25 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    Top destination
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpi.topDestination}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9ca3af", mt: 0.5 }}>
                    {kpi.topDestinationSearches.toLocaleString()} searches
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topRoutes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis type="number" stroke="#6b7280" fontSize={11} />
                    <YAxis
                      dataKey={(d) => `${d.origin} → ${d.destination}`}
                      type="category"
                      stroke="#9ca3af"
                      fontSize={11}
                      width={110}
                    />
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

        <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
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
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={routesByRegion}
                      dataKey="searches"
                      nameKey="region"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                    >
                      {routesByRegion.map((entry, index) => (
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
      </Grid>

      {/* Bottom row: cabin distribution & table */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cabinDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {cabinDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
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
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>#</th>
                      <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Route</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Searches</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Clickouts</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Conversion</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Avg price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoutes.map((route, index) => (
                      <tr key={`${route.origin}-${route.destination}`} style={{ borderTop: "1px solid #020617" }}>
                        <td style={{ padding: "8px", fontSize: 13, color: "#9ca3af" }}>#{index + 1}</td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>
                          {route.origin} &nbsp;→&nbsp; {route.destination}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {route.searches.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {route.clickouts.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#bbf7d0", textAlign: "right" }}>
                          {route.conversion.toFixed(1)}%
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          ${route.avgPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trending routes list */}
      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(51,65,85,0.9)",
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
            {trendingRoutes.map((r, index) => (
              <Box
                key={r.route}
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
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}>
                      {r.route}
                    </Typography>
                    <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                      {r.searches.toLocaleString()} searches this period
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <TrendingUp sx={{ fontSize: 18, color: "#4ade80" }} />
                  <Typography sx={{ color: "#4ade80", fontWeight: 600, fontSize: 14 }}>
                    +{r.growth.toFixed(1)}%
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
