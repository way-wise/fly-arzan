import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  LinearProgress,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import PublicIcon from "@mui/icons-material/Public";
import LoopIcon from "@mui/icons-material/Loop";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock Data
const mockServices = [
  {
    name: "Backend API",
    status: "operational",
    uptime: 99.98,
    responseTime: 145,
    lastCheck: "30 seconds ago",
    endpoint: "https://api.flyarzan.com",
  },
  {
    name: "Amadeus API",
    status: "operational",
    uptime: 99.95,
    responseTime: 234,
    lastCheck: "1 minute ago",
    endpoint: "https://api.amadeus.com",
  },
  {
    name: "Database",
    status: "operational",
    uptime: 99.99,
    responseTime: 12,
    lastCheck: "15 seconds ago",
    endpoint: "PostgreSQL Primary",
  },
  {
    name: "Redis Cache",
    status: "operational",
    uptime: 99.97,
    responseTime: 3,
    lastCheck: "20 seconds ago",
    endpoint: "Redis Cluster",
  },
  {
    name: "Email Service",
    status: "degraded",
    uptime: 98.45,
    responseTime: 567,
    lastCheck: "2 minutes ago",
    endpoint: "SendGrid API",
  },
  {
    name: "Payment Gateway",
    status: "operational",
    uptime: 99.92,
    responseTime: 289,
    lastCheck: "45 seconds ago",
    endpoint: "Stripe API",
  },
];

const mockResponseTimes = [
  { time: "00:00", backend: 145, amadeus: 234, database: 12 },
  { time: "04:00", backend: 152, amadeus: 245, database: 14 },
  { time: "08:00", backend: 167, amadeus: 289, database: 15 },
  { time: "12:00", backend: 189, amadeus: 312, database: 18 },
  { time: "16:00", backend: 178, amadeus: 298, database: 16 },
  { time: "20:00", backend: 156, amadeus: 267, database: 13 },
  { time: "23:59", backend: 145, amadeus: 234, database: 12 },
];

const mockUptimeHistory = [
  { date: "Mon", uptime: 99.98 },
  { date: "Tue", uptime: 99.97 },
  { date: "Wed", uptime: 99.99 },
  { date: "Thu", uptime: 99.96 },
  { date: "Fri", uptime: 99.98 },
  { date: "Sat", uptime: 99.99 },
  { date: "Sun", uptime: 99.98 },
];

const mockIncidents = [
  {
    id: 1,
    title: "Email Service Degradation",
    severity: "warning",
    status: "investigating",
    startTime: "2 hours ago",
    description: "Increased latency in email delivery",
  },
  {
    id: 2,
    title: "Amadeus API Rate Limit",
    severity: "info",
    status: "resolved",
    startTime: "Yesterday",
    description: "Temporary rate limiting resolved",
  },
];

export default function APIHealth() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircleIcon sx={{ fontSize: 20, color: "#4ade80" }} />;
      case "degraded":
        return <WarningAmberIcon sx={{ fontSize: 20, color: "#facc15" }} />;
      case "down":
        return <ErrorIcon sx={{ fontSize: 20, color: "#f97316" }} />;
      default:
        return <SpeedIcon sx={{ fontSize: 20, color: "#9ca3af" }} />;
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "operational":
        return { bg: "#1a2e1f", color: "#bbf7d0" };
      case "degraded":
        return { bg: "#2b2413", color: "#fde68a" };
      case "down":
        return { bg: "#3b1612", color: "#fecaca" };
      default:
        return { bg: "#1f2933", color: "#e5e7eb" };
    }
  };

  const operationalCount = mockServices.filter((s) => s.status === "operational").length;
  const totalServices = mockServices.length;

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
            API health
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            Real-time status of backend, Amadeus and infrastructure services.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              borderRadius: 2,
              border: "1px solid #30363d",
              color: "#e5e7eb",
              width: 40,
              height: 40,
            }}
          >
            <LoopIcon
              sx={{
                fontSize: 20,
                animation: refreshing ? "spin 1s linear infinite" : "none",
              }}
            />
          </IconButton>
        </Stack>
      </Box>

      {/* Overall status & KPIs */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: "#151515",
              border: "1px solid #262626",
            }}
          >
            <CardHeader
              title={
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize: 24, color: "#4ade80" }} />
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                    All systems operational
                  </Typography>
                </Stack>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.25 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Box>
                  <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>Healthy services</Typography>
                  <Typography sx={{ color: "#e5e7eb", fontSize: 26, fontWeight: 700, mt: 0.5 }}>
                    {operationalCount}/{totalServices}
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12, mt: 0.5 }}>
                    Backend, Amadeus, DB, cache and integrations
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>Overall uptime (7d)</Typography>
                  <Typography sx={{ color: "#4ade80", fontSize: 26, fontWeight: 700, mt: 0.5 }}>
                    99.98%
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12, mt: 0.5 }}>
                    SLA target: 99.95%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{ minWidth: 0 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "#151515",
                  border: "1px solid #262626",
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Avg response time</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 20, fontWeight: 600, mt: 0.5 }}>
                        178 ms
                      </Typography>
                      <Typography sx={{ color: "#4ade80", fontSize: 11, mt: 0.5 }}>
                        -12 ms vs yesterday
                      </Typography>
                    </Box>
                    <SpeedIcon sx={{ fontSize: 20, color: "#60a5fa" }} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "#151515",
                  border: "1px solid #262626",
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Active incidents</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 20, fontWeight: 600, mt: 0.5 }}>
                        1
                      </Typography>
                      <Typography sx={{ color: "#facc15", fontSize: 11, mt: 0.5 }}>
                        Under investigation
                      </Typography>
                    </Box>
                    <WarningAmberIcon sx={{ fontSize: 20, color: "#f97316" }} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "#151515",
                  border: "1px solid #262626",
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Error rate</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 20, fontWeight: 600, mt: 0.5 }}>
                        0.02%
                      </Typography>
                      <Typography sx={{ color: "#4ade80", fontSize: 11, mt: 0.5 }}>
                        -0.01% vs yesterday
                      </Typography>
                    </Box>
                    <ErrorIcon sx={{ fontSize: 20, color: "#f97316" }} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Charts row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              bgcolor: "#151515",
              border: "1px solid #262626",
            }}
          >
            <CardHeader
              title={
                <Stack direction="row" spacing={1} alignItems="center">
                  <TimelineIcon sx={{ fontSize: 20, color: "#60a5fa" }} />
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                    Response times (24h)
                  </Typography>
                </Stack>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Average latency for backend, Amadeus and database.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockResponseTimes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#202020" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", border: "1px solid #262626" }} />
                    <Line type="monotone" dataKey="backend" stroke="#60a5fa" strokeWidth={2} name="Backend" />
                    <Line type="monotone" dataKey="amadeus" stroke="#4ade80" strokeWidth={2} name="Amadeus" />
                    <Line type="monotone" dataKey="database" stroke="#a855f7" strokeWidth={2} name="Database" />
                  </LineChart>
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
              bgcolor: "#151515",
              border: "1px solid #262626",
            }}
          >
            <CardHeader
              title={
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 20, color: "#4ade80" }} />
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                    Uptime history (7d)
                  </Typography>
                </Stack>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Daily uptime percentage for core services.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockUptimeHistory}>
                    <defs>
                      <linearGradient id="uptimeFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#202020" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} domain={[99.9, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", border: "1px solid #262626" }} />
                    <Area
                      type="monotone"
                      dataKey="uptime"
                      stroke="#4ade80"
                      fill="url(#uptimeFill)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Services status list */}
      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "#151515",
          border: "1px solid #262626",
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <DnsIcon sx={{ fontSize: 20, color: "#60a5fa" }} />
              <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>Services status</Typography>
            </Stack>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Health and latency for each monitored dependency.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={1.5}>
            {mockServices.map((service) => {
              const chip = getStatusChipColor(service.status);
              return (
                <Box
                  key={service.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "#101010",
                    border: "1px solid #262626",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
                    {getStatusIcon(service.status)}
                    <Box>
                      <Typography sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}>
                        {service.name}
                      </Typography>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>{service.endpoint}</Typography>
                    </Box>
                    <Chip
                      label={service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      size="small"
                      sx={{
                        bgcolor: chip.bg,
                        color: chip.color,
                        borderRadius: 999,
                        fontSize: 11,
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    sx={{ minWidth: 260, justifyContent: "flex-end" }}
                  >
                    <Box sx={{ textAlign: "right" }}>
                      <Typography sx={{ color: "#9ca3af", fontSize: 11 }}>Uptime</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 14, fontWeight: 500 }}>
                        {service.uptime}%
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography sx={{ color: "#9ca3af", fontSize: 11 }}>Response</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 14, fontWeight: 500 }}>
                        {service.responseTime} ms
                      </Typography>
                    </Box>
                    <Box sx={{ minWidth: 160 }}>
                      <Typography sx={{ color: "#9ca3af", fontSize: 11, mb: 0.25 }}>Last check</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: 14, color: "#9ca3af" }} />
                        <Typography sx={{ color: "#e5e7eb", fontSize: 12 }}>{service.lastCheck}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {/* Recent incidents */}
      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "#151515",
          border: "1px solid #262626",
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <WarningAmberIcon sx={{ fontSize: 20, color: "#facc15" }} />
              <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>Recent incidents</Typography>
            </Stack>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Latest issues impacting availability or latency.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          {mockIncidents.length === 0 ? (
            <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>
              No recent incidents.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {mockIncidents.map((incident) => (
                <Box
                  key={incident.id}
                  sx={{
                    p: 1.75,
                    borderRadius: 2,
                    bgcolor: "#101010",
                    border: "1px solid #262626",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <Box>
                      <Typography sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}>
                        {incident.title}
                      </Typography>
                      <Typography sx={{ color: "#9ca3af", fontSize: 13, mt: 0.5 }}>
                        {incident.description}
                      </Typography>
                      <Typography sx={{ color: "#6b7280", fontSize: 11, mt: 0.75 }}>
                        Started {incident.startTime}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={incident.severity}
                        size="small"
                        sx={{
                          bgcolor:
                            incident.severity === "warning" ? "#2b2413" : "rgba(59,130,246,0.15)",
                          color: "#e5e7eb",
                          borderRadius: 999,
                          fontSize: 11,
                        }}
                      />
                      <Chip
                        label={incident.status}
                        size="small"
                        sx={{
                          bgcolor:
                            incident.status === "investigating" ? "#3b1f0a" : "#1a2e1f",
                          color: "#e5e7eb",
                          borderRadius: 999,
                          fontSize: 11,
                        }}
                      />
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
