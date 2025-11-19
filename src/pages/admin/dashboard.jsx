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
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FlightTakeoff,
  TrendingUp,
  Public,
  QueryStats as QueryStatsIcon,
  Timeline as TimelineIcon,
  Route as RouteIcon,
  Speed,
  TravelExplore,
  Download,
  CheckCircle,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Mock data
const kpiData = {
  totalSearches: { value: 48237, change: 12.4 },
  clickoutRate: { value: 34.2, change: 5.1 },
  uniqueVisitors: { value: 18740, change: 7.8 },
  apiHealth: { value: 99.8, change: 0.2 },
};

const searchTimeseries = [
  { label: "00:00", searches: 820, clickouts: 260 },
  { label: "04:00", searches: 640, clickouts: 190 },
  { label: "08:00", searches: 2310, clickouts: 810 },
  { label: "12:00", searches: 3180, clickouts: 1120 },
  { label: "16:00", searches: 2890, clickouts: 970 },
  { label: "20:00", searches: 2140, clickouts: 720 },
  { label: "23:59", searches: 1650, clickouts: 550 },
];

const topRoutes = [
  { route: "ALA → IST", searches: 9560, clickouts: 3420, conversion: 35.8 },
  { route: "ALA → DXB", searches: 8123, clickouts: 2851, conversion: 35.1 },
  { route: "ALA → SAW", searches: 6890, clickouts: 2075, conversion: 30.1 },
  { route: "ALA → KUL", searches: 5321, clickouts: 1423, conversion: 26.7 },
  { route: "TSE → IST", searches: 4210, clickouts: 1267, conversion: 30.1 },
];

const deviceShare = [
  { name: "Desktop", value: 58, color: "#60a5fa" },
  { name: "Mobile", value: 34, color: "#22c55e" },
  { name: "Tablet", value: 8, color: "#f97316" },
];

const geoDistribution = [
  { country: "Kazakhstan", code: "KZ", visitors: 12450, percentage: 40 },
  { country: "Turkey", code: "TR", visitors: 7421, percentage: 24 },
  { country: "UAE", code: "AE", visitors: 5320, percentage: 17 },
  { country: "Russia", code: "RU", visitors: 3895, percentage: 13 },
  { country: "Germany", code: "DE", visitors: 2144, percentage: 6 },
];

const apiServices = [
  { name: "Backend API", status: "operational", latency: 145, uptime: 99.98 },
  { name: "Amadeus API", status: "operational", latency: 234, uptime: 99.95 },
  { name: "Database", status: "operational", latency: 12, uptime: 99.99 },
  { name: "Redis Cache", status: "operational", latency: 3, uptime: 99.97 },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7days");

  const handleExport = () => {
    console.log("Exporting dashboard data");
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
            sx={{ fontWeight: 600, color: "#FFFFFF", fontFamily: "Inter" }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}
          >
            Real-time analytics, user behavior, and system health monitoring
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <FormControl size="small">
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{
                bgcolor: "rgba(59, 130, 246, 0.1)",
                color: "#3B82F6",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: 2,
                fontFamily: "Inter",
                fontSize: "0.875rem",
                minWidth: 140,
                "& .MuiOutline-notchedOutline": { border: "none" },
                "& .MuiSelect-icon": { color: "#3B82F6" },
              }}
            >
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{
              borderColor: "rgba(59, 130, 246, 0.3)",
              color: "#3B82F6",
              fontFamily: "Inter",
              textTransform: "none",
              "&:hover": {
                borderColor: "#3B82F6",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            Export
          </Button>
        </Stack>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
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
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                    }}
                  >
                    Total Searches
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter",
                    }}
                  >
                    {kpiData.totalSearches.value.toLocaleString()}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <TrendingUp sx={{ fontSize: 16, color: "#4ade80" }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#10B981",
                        fontFamily: "Inter",
                        fontSize: "0.75rem",
                      }}
                    >
                      +{kpiData.totalSearches.change}% from last period
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
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
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
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                    }}
                  >
                    Clickout Rate
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter",
                    }}
                  >
                    {kpiData.clickoutRate.value}%
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <TrendingUp sx={{ fontSize: 16, color: "#4ade80" }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#10B981",
                        fontFamily: "Inter",
                        fontSize: "0.75rem",
                      }}
                    >
                      +{kpiData.clickoutRate.change}% from last period
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
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
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
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                    }}
                  >
                    Unique Visitors
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter",
                    }}
                  >
                    {kpiData.uniqueVisitors.value.toLocaleString()}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <TrendingUp sx={{ fontSize: 16, color: "#38bdf8" }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#38bdf8",
                        fontFamily: "Inter",
                        fontSize: "0.75rem",
                      }}
                    >
                      +{kpiData.uniqueVisitors.change}% from last period
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
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
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
                      fontFamily: "Inter",
                      fontSize: "0.75rem",
                    }}
                  >
                    API Health
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      mt: 0.5,
                      fontFamily: "Inter",
                    }}
                  >
                    {kpiData.apiHealth.value}%
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <CheckCircle sx={{ fontSize: 16, color: "#4ade80" }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#10B981",
                        fontFamily: "Inter",
                        fontSize: "0.75rem",
                      }}
                    >
                      All systems operational
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
                  <Speed sx={{ fontSize: 22, color: "#6ee7b7" }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                  >
                    Search Activity
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#71717A", fontFamily: "Inter" }}
                  >
                    Searches and clickouts over time
                  </Typography>
                </Box>
                <TimelineIcon sx={{ fontSize: 20, color: "#93c5fd" }} />
              </Stack>
              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={searchTimeseries}>
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
                          stopColor="#0f172a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorClickouts"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22c55e"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0f172a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="label" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #1f2937",
                        fontFamily: "Inter",
                      }}
                    />
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

        <Grid item xs={12} md={5}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                  >
                    Device Distribution
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#71717A", fontFamily: "Inter" }}
                  >
                    User devices breakdown
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 20, color: "#facc15" }} />
              </Stack>
              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceShare}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {deviceShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #1f2937",
                        fontFamily: "Inter",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Routes Table */}
      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}
              >
                Top Search Routes
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#71717A", fontFamily: "Inter" }}
              >
                Most searched flight routes with conversion rates
              </Typography>
            </Box>
            <RouteIcon sx={{ fontSize: 20, color: "#f97316" }} />
          </Stack>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#9ca3af",
                    }}
                  >
                    Route
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#9ca3af",
                    }}
                  >
                    Searches
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#9ca3af",
                    }}
                  >
                    Clickouts
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#9ca3af",
                    }}
                  >
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody>
                {topRoutes.map((route, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "#e5e7eb",
                      }}
                    >
                      {route.route}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {route.searches.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {route.clickouts.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Chip
                        label={`${route.conversion}%`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(34, 197, 94, 0.1)",
                          color: "#22c55e",
                          fontFamily: "Inter",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                  >
                    Geographic Distribution
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#71717A", fontFamily: "Inter" }}
                  >
                    Visitors by country
                  </Typography>
                </Box>
                <TravelExplore sx={{ fontSize: 20, color: "#22c55e" }} />
              </Stack>
              <Stack spacing={1.5}>
                {geoDistribution.map((geo, index) => (
                  <Box key={index}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#e5e7eb",
                          fontFamily: "Inter",
                          fontSize: "0.875rem",
                        }}
                      >
                        {geo.country}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#9ca3af", fontFamily: "Inter" }}
                      >
                        {geo.visitors.toLocaleString()}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={geo.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 999,
                        bgcolor: "rgba(15,23,42,1)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          bgcolor: "#60a5fa",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              bgcolor: "#1A1D23",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                  >
                    API Services Status
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#71717A", fontFamily: "Inter" }}
                  >
                    Real-time service health monitoring
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 20, color: "#38bdf8" }} />
              </Stack>
              <Stack spacing={1.5}>
                {apiServices.map((service, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      bgcolor: "rgba(15,23,42,0.5)",
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#e5e7eb",
                          fontFamily: "Inter",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#9ca3af", fontFamily: "Inter" }}
                      >
                        {service.latency}ms · {service.uptime}% uptime
                      </Typography>
                    </Box>
                    <Chip
                      label={service.status}
                      size="small"
                      sx={{
                        bgcolor: "rgba(34, 197, 94, 0.1)",
                        color: "#22c55e",
                        fontFamily: "Inter",
                        fontSize: "0.75rem",
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
