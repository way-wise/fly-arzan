import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  People,
  Timeline,
  Mouse,
  AccessTime,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Mock data tailored for search engagement (replace with real analytics API later)
const engagementSeries = [
  { date: "Mon", searches: 4200, sessions: 1240, avgDuration: 245, bounceRate: 32 },
  { date: "Tue", searches: 4860, sessions: 1380, avgDuration: 268, bounceRate: 29 },
  { date: "Wed", searches: 5312, sessions: 1520, avgDuration: 290, bounceRate: 26 },
  { date: "Thu", searches: 4988, sessions: 1450, avgDuration: 275, bounceRate: 28 },
  { date: "Fri", searches: 6230, sessions: 1680, avgDuration: 310, bounceRate: 24 },
  { date: "Sat", searches: 5780, sessions: 1590, avgDuration: 295, bounceRate: 25 },
  { date: "Sun", searches: 6024, sessions: 1720, avgDuration: 320, bounceRate: 22 },
];

const funnelData = [
  { stage: "Search initiated", count: 48237 },
  { stage: "Search results viewed", count: 41780 },
  { stage: "Details opened", count: 23890 },
  { stage: "Clickouts", count: 16490 },
];

const deviceStats = [
  { device: "Desktop", searches: 28560, sessions: 18920, avgTime: "5:32" },
  { device: "Mobile", searches: 16240, sessions: 12340, avgTime: "3:45" },
  { device: "Tablet", searches: 3437, sessions: 3210, avgTime: "4:12" },
];

const routeBehavior = [
  { route: "ALA → IST", searches: 9560, clickouts: 3420, clickRate: 35.8 },
  { route: "ALA → DXB", searches: 8123, clickouts: 2851, clickRate: 35.1 },
  { route: "TSE → IST", searches: 5310, clickouts: 1670, clickRate: 31.4 },
  { route: "ALA → SAW", searches: 4892, clickouts: 1422, clickRate: 29.1 },
];

const kpis = {
  sessions: { value: 10580, change: 12.5 },
  avgDuration: { value: "4:32", change: 8.2 },
  ctr: { value: 34.2, change: 5.1 },
  bounceRate: { value: 26.8, change: -3.4 },
};

export default function EngagementMetrics() {
  const [range, setRange] = useState("7d");

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
            Search Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            Understand how users search for flights and interact with results.
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
                    Total sessions
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpis.sessions.value.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} alignItems="center">
                    <Timeline sx={{ fontSize: 15, color: "#4ade80" }} />
                    <Typography variant="caption" sx={{ color: "#4ade80" }}>
                      +{kpis.sessions.change}% vs last period
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
                  <People sx={{ fontSize: 18, color: "#93c5fd" }} />
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
                    Avg session duration
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpis.avgDuration.value}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} alignItems="center">
                    <AccessTime sx={{ fontSize: 15, color: "#c4b5fd" }} />
                    <Typography variant="caption" sx={{ color: "#a855f7" }}>
                      +{kpis.avgDuration.change}% vs last period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: "rgba(91,33,182,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccessTime sx={{ fontSize: 18, color: "#e9d5ff" }} />
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
                    Click-through rate
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpis.ctr.value}%
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} alignItems="center">
                    <Mouse sx={{ fontSize: 15, color: "#4ade80" }} />
                    <Typography variant="caption" sx={{ color: "#4ade80" }}>
                      +{kpis.ctr.change}% vs last period
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: "rgba(22,163,74,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Mouse sx={{ fontSize: 18, color: "#bbf7d0" }} />
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
                    Bounce rate
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e5e7eb", fontWeight: 700, mt: 0.5 }}>
                    {kpis.bounceRate.value}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#a3e635", mt: 0.5 }}>
                    {kpis.bounceRate.change}% vs last period (lower is better)
                  </Typography>
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
                  Searches & sessions over time
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  How many searches and sessions you get throughout the week.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementSeries}>
                    <defs>
                      <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#020617" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#020617" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
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
                      dataKey="sessions"
                      stroke="#4ade80"
                      fill="url(#colorSessions)"
                      name="Sessions"
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
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Search funnel
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  High-level drop-off between search and clickout.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis type="number" stroke="#6b7280" fontSize={11} />
                    <YAxis dataKey="stage" type="category" stroke="#9ca3af" fontSize={11} width={140} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #1f2937" }} />
                    <Bar dataKey="count" fill="#60a5fa" radius={[0, 10, 10, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Behavior & device tables */}
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
                  Route-level behavior
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Search volume and clickout rate for key routes.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Route</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Searches</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Clickouts</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Click rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeBehavior.map((row) => (
                      <tr key={row.route} style={{ borderTop: "1px solid #020617" }}>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>{row.route}</td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {row.searches.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {row.clickouts.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#bbf7d0", textAlign: "right" }}>
                          {row.clickRate.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  Device engagement
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  How different device types interact with search.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Device</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Searches</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Sessions</th>
                      <th style={{ textAlign: "right", padding: "8px", color: "#9ca3af", fontSize: 12 }}>Avg time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceStats.map((row) => (
                      <tr key={row.device} style={{ borderTop: "1px solid #020617" }}>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>{row.device}</td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {row.searches.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb", textAlign: "right" }}>
                          {row.sessions.toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", fontSize: 13, color: "#9ca3af", textAlign: "right" }}>
                          {row.avgTime}
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
    </Box>
  );
}
