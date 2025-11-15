import { useState } from "react";
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

// Mock Data
const mockSearchTrends = [
  { month: "Jan", searches: 12450, clickouts: 3234, bookings: 892 },
  { month: "Feb", searches: 14230, clickouts: 3892, bookings: 1045 },
  { month: "Mar", searches: 16780, clickouts: 4523, bookings: 1234 },
  { month: "Apr", searches: 15340, clickouts: 4123, bookings: 1123 },
  { month: "May", searches: 18920, clickouts: 5234, bookings: 1456 },
  { month: "Jun", searches: 21450, clickouts: 6123, bookings: 1723 },
  { month: "Jul", searches: 24560, clickouts: 7234, bookings: 2034 },
  { month: "Aug", searches: 23120, clickouts: 6892, bookings: 1923 },
  { month: "Sep", searches: 19870, clickouts: 5678, bookings: 1598 },
  { month: "Oct", searches: 17230, clickouts: 4923, bookings: 1389 },
  { month: "Nov", searches: 15890, clickouts: 4456, bookings: 1256 },
  { month: "Dec", searches: 18450, clickouts: 5234, bookings: 1478 },
];

const mockPriceTrends = [
  { month: "Jan", avgPrice: 289, minPrice: 156, maxPrice: 892 },
  { month: "Feb", avgPrice: 312, minPrice: 178, maxPrice: 945 },
  { month: "Mar", avgPrice: 345, minPrice: 189, maxPrice: 1023 },
  { month: "Apr", avgPrice: 298, minPrice: 167, maxPrice: 923 },
  { month: "May", avgPrice: 378, minPrice: 198, maxPrice: 1123 },
  { month: "Jun", avgPrice: 423, minPrice: 234, maxPrice: 1289 },
  { month: "Jul", avgPrice: 489, minPrice: 267, maxPrice: 1456 },
  { month: "Aug", avgPrice: 456, minPrice: 245, maxPrice: 1389 },
  { month: "Sep", avgPrice: 389, minPrice: 212, maxPrice: 1156 },
  { month: "Oct", avgPrice: 334, minPrice: 189, maxPrice: 1023 },
  { month: "Nov", avgPrice: 312, minPrice: 178, maxPrice: 967 },
  { month: "Dec", avgPrice: 398, minPrice: 223, maxPrice: 1198 },
];

const mockUserGrowth = [
  { month: "Jan", newUsers: 2340, returningUsers: 8920 },
  { month: "Feb", newUsers: 2789, returningUsers: 10230 },
  { month: "Mar", newUsers: 3234, returningUsers: 12450 },
  { month: "Apr", newUsers: 2923, returningUsers: 11340 },
  { month: "May", newUsers: 3678, returningUsers: 14230 },
  { month: "Jun", newUsers: 4234, returningUsers: 16780 },
  { month: "Jul", newUsers: 4892, returningUsers: 19230 },
  { month: "Aug", newUsers: 4567, returningUsers: 18120 },
  { month: "Sep", newUsers: 3892, returningUsers: 15340 },
  { month: "Oct", newUsers: 3456, returningUsers: 13670 },
  { month: "Nov", newUsers: 3123, returningUsers: 12450 },
  { month: "Dec", newUsers: 3678, returningUsers: 14120 },
];

const mockConversionTrends = [
  { month: "Jan", conversionRate: 7.2 },
  { month: "Feb", conversionRate: 7.3 },
  { month: "Mar", conversionRate: 7.4 },
  { month: "Apr", conversionRate: 7.3 },
  { month: "May", conversionRate: 7.7 },
  { month: "Jun", conversionRate: 8.0 },
  { month: "Jul", conversionRate: 8.3 },
  { month: "Aug", conversionRate: 8.3 },
  { month: "Sep", conversionRate: 8.0 },
  { month: "Oct", conversionRate: 8.1 },
  { month: "Nov", conversionRate: 7.9 },
  { month: "Dec", conversionRate: 8.0 },
];

const mockMetrics = [
  { title: "Search Growth", value: "+24.5%", trend: "up", description: "vs last year" },
  { title: "Avg Ticket Price", value: "$367", trend: "up", description: "+$23 vs last month" },
  { title: "Conversion Rate", value: "8.0%", trend: "up", description: "+0.8% vs last month" },
  { title: "User Retention", value: "76.4%", trend: "up", description: "+3.2% vs last month" },
];

export default function TrendCharts() {
  const [timeRange, setTimeRange] = useState("12m");

  const handleExport = () => {
    console.log("Exporting trend data");
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
            Trend charts
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
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
            <ToggleButton value="6m">6m</ToggleButton>
            <ToggleButton value="12m">12m</ToggleButton>
            <ToggleButton value="24m">24m</ToggleButton>
          </ToggleButtonGroup>
          <Chip
            size="small"
            label={
              <Stack direction="row" spacing={0.5} alignItems="center">
                <DownloadIcon sx={{ fontSize: 16 }} />
                <span>Export CSV</span>
              </Stack>
            }
            onClick={handleExport}
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

      <Grid container spacing={2.5}>
        {mockMetrics.map((metric, index) => (
          <Grid item xs={12} md={3} key={metric.title} sx={{ minWidth: 0 }}>
            <Card
              sx={{
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(51,65,85,0.9)",
              }}
            >
              <CardHeader
                title={
                  <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                    {metric.title}
                  </Typography>
                }
                sx={{ px: 2.25, pt: 2.25, pb: 0.5 }}
              />
              <CardContent sx={{ px: 2.25, pb: 2.25 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontSize: 22, fontWeight: 600, color: "#e5e7eb" }}>
                    {metric.value}
                  </Typography>
                  {metric.trend === "up" ? (
                    <TrendingUpIcon sx={{ fontSize: 18, color: "#4ade80" }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 18, color: "#f97316" }} />
                  )}
                </Stack>
                <Typography sx={{ fontSize: 11, color: "#9ca3af", mt: 0.5 }}>
                  {metric.description}
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
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
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockSearchTrends}>
                    <defs>
                      <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#020617" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
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
                    <Bar dataKey="bookings" fill="#a855f7" radius={[4, 4, 0, 0]} name="Bookings" />
                  </ComposedChart>
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
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPriceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  User growth
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  New vs returning users over time.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                    <Legend />
                    <Bar dataKey="newUsers" fill="#60a5fa" radius={[4, 4, 0, 0]} name="New users" />
                    <Bar dataKey="returningUsers" fill="#22c55e" radius={[4, 4, 0, 0]} name="Returning users" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
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
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockConversionTrends}>
                    <defs>
                      <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#020617" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} domain={[6, 9]} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "rgba(15,23,42,1)",
          border: "1px solid rgba(51,65,85,0.9)",
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
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(31,41,55,0.9)",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#e5e7eb", mb: 0.5, fontSize: 14 }}>
                  Peak season
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  July shows the highest search volume with 24,560 searches — peak travel season.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(31,41,55,0.9)",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#e5e7eb", mb: 0.5, fontSize: 14 }}>
                  Price volatility
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  Summer months (Jun–Aug) show ~35% higher average prices compared to winter.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(31,41,55,0.9)",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#e5e7eb", mb: 0.5, fontSize: 14 }}>
                  User retention
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  Returning users consistently outnumber new users by ~4:1, indicating strong loyalty.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(31,41,55,0.9)",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#e5e7eb", mb: 0.5, fontSize: 14 }}>
                  Conversion improvement
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  Conversion rate improved from 7.2% to 8.0% over the year (~11% uplift).
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
