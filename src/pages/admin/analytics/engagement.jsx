import { useMemo, useState } from "react";
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
import { People, Timeline, Mouse, AccessTime } from "@mui/icons-material";
import {
  ResponsiveContainer,
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

import {
  useEngagementSeries,
  useTopRoutes,
  useAdminBreakdown,
} from "@/hooks/useAdminReports";
import { useEngagementSummary } from "@/hooks/useAdminReports";

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

// Funnel will be built from live totals (Searches vs Clickouts) for now
const buildFunnel = (summary) => {
  const s = summary?.current?.searches ?? 0;
  const c = summary?.current?.clickouts ?? 0;
  return [
    { stage: "Searches", count: s },
    { stage: "Clickouts", count: c },
  ];
};

// (device and route mock tables removed; now fed by live queries)

// KPI placeholders for fields we don't instrument yet
const formatPct = (n) =>
  typeof n === "number" ? `${(Math.round(n * 10) / 10).toFixed(1)}` : "0.0";

export default function EngagementMetrics() {
  const [range, setRange] = useState("7d");

  const { startDate, endDate } = useMemo(() => getRange(range), [range]);

  // Live data hooks
  const { data: engagement } = useEngagementSeries({ range });
  const { data: topRoutes } = useTopRoutes({ startDate, endDate, limit: 10 });
  const { data: deviceBreakdown } = useAdminBreakdown({ type: "device" });
  const { data: summary } = useEngagementSummary({ range });

  const sessionsValue = summary?.current?.sessions ?? 0;
  const sessionsDelta = summary?.deltas?.sessions ?? 0;
  const ctrValue = summary?.current?.ctr
    ? Math.round(summary.current.ctr * 10) / 10
    : 0;
  const ctrDelta = summary?.deltas?.ctr
    ? Math.round(summary.deltas.ctr * 10) / 10
    : 0;
  const funnelData = buildFunnel(summary);
  const avgDurationText = "—";
  const avgDurationDelta = 0;
  const bounceRateValue = 0;
  const bounceRateDelta = 0;

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
            Search Analytics
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter, sans-serif" }}
          >
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
                    Total sessions
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
                    {sessionsValue.toLocaleString()}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 0.5 }}
                    alignItems="center"
                  >
                    <Timeline sx={{ fontSize: 15, color: "#4ade80" }} />
                    <Typography
                      variant="caption"
                      sx={{ color: sessionsDelta >= 0 ? "#4ade80" : "#ef4444" }}
                    >
                      {sessionsDelta >= 0 ? "+" : ""}
                      {formatPct(sessionsDelta)}% vs last period
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
                    Avg session duration
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
                    {avgDurationText}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 0.5 }}
                    alignItems="center"
                  >
                    <AccessTime sx={{ fontSize: 15, color: "#c4b5fd" }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: avgDurationDelta >= 0 ? "#a855f7" : "#ef4444",
                      }}
                    >
                      {avgDurationDelta >= 0 ? "+" : ""}
                      {formatPct(avgDurationDelta)}% vs last period
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
                    Click-through rate
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
                    {ctrValue}%
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 0.5 }}
                    alignItems="center"
                  >
                    <Mouse sx={{ fontSize: 15, color: "#4ade80" }} />
                    <Typography
                      variant="caption"
                      sx={{ color: ctrDelta >= 0 ? "#4ade80" : "#ef4444" }}
                    >
                      {ctrDelta >= 0 ? "+" : ""}
                      {formatPct(ctrDelta)}% vs last period
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
                    Bounce rate
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
                    {bounceRateValue}%
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#a3e635", mt: 0.5 }}
                  >
                    {bounceRateDelta >= 0 ? "+" : ""}
                    {formatPct(bounceRateDelta)}% vs last period (lower is
                    better)
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
                  <AreaChart
                    data={(engagement?.data ?? []).map((b) => ({
                      label: b.label,
                      searches: b.searches ?? 0,
                      sessions: b.sessions ?? 0,
                    }))}
                  >
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
                      <linearGradient
                        id="colorSessions"
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
                          stopColor="#020617"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                    <XAxis dataKey="label" stroke="#6b7280" fontSize={11} />
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
                    <YAxis
                      dataKey="stage"
                      type="category"
                      stroke="#9ca3af"
                      fontSize={11}
                      width={140}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #1f2937",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#60a5fa"
                      radius={[0, 10, 10, 0]}
                    />
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
                        Click rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(topRoutes?.data ?? []).map((r) => {
                      const routeLabel = `${r.origin ?? ""} → ${
                        r.destination ?? ""
                      }`;
                      const searches = r.searches ?? 0;
                      const clickouts = r.clickouts ?? 0;
                      const clickRate =
                        r.conversion ??
                        (searches
                          ? Math.round((clickouts / searches) * 1000) / 10
                          : 0);
                      return (
                        <tr
                          key={routeLabel}
                          style={{ borderTop: "1px solid #020617" }}
                        >
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                            }}
                          >
                            {routeLabel}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {searches.toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {clickouts.toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              fontSize: 13,
                              color: "#bbf7d0",
                              textAlign: "right",
                            }}
                          >
                            {clickRate.toFixed?.(1) ?? clickRate}%
                          </td>
                        </tr>
                      );
                    })}
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
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px",
                          color: "#9ca3af",
                          fontSize: 12,
                        }}
                      >
                        Device
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
                        Sessions
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "8px",
                          color: "#9ca3af",
                          fontSize: 12,
                        }}
                      >
                        Avg time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(deviceBreakdown?.data ?? []).map((row) => (
                      <tr
                        key={row.name}
                        style={{ borderTop: "1px solid #020617" }}
                      >
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#e5e7eb",
                          }}
                        >
                          {row.name ?? "Unknown"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#e5e7eb",
                            textAlign: "right",
                          }}
                        >
                          {(row.value ?? 0).toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#e5e7eb",
                            textAlign: "right",
                          }}
                        >
                          —
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            fontSize: 13,
                            color: "#9ca3af",
                            textAlign: "right",
                          }}
                        >
                          —
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
