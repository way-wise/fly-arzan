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
  TextField,
  Select,
  MenuItem,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatIcon from "@mui/icons-material/Chat";
import SmsIcon from "@mui/icons-material/Sms";
import HttpIcon from "@mui/icons-material/Http";
import SearchIcon from "@mui/icons-material/Search";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock Data
const mockAlerts = [
  {
    id: 1,
    title: "High API Response Time",
    description: "Backend API response time exceeded 500ms threshold",
    severity: "critical",
    status: "active",
    service: "Backend API",
    timestamp: "5 minutes ago",
    details: "Average response time: 678ms (threshold: 500ms)",
  },
  {
    id: 2,
    title: "Email Service Degradation",
    description: "SendGrid API experiencing increased latency",
    severity: "warning",
    status: "active",
    service: "Email Service",
    timestamp: "15 minutes ago",
    details: "Latency increased by 45% in the last hour",
  },
  {
    id: 3,
    title: "Database Connection Pool",
    description: "Connection pool utilization above 80%",
    severity: "warning",
    status: "acknowledged",
    service: "Database",
    timestamp: "1 hour ago",
    details: "Current utilization: 85% (threshold: 80%)",
  },
  {
    id: 4,
    title: "Amadeus API Rate Limit",
    description: "Approaching rate limit threshold",
    severity: "info",
    status: "resolved",
    service: "Amadeus API",
    timestamp: "3 hours ago",
    details: "95% of hourly quota used",
  },
  {
    id: 5,
    title: "Disk Space Warning",
    description: "Server disk usage above 75%",
    severity: "warning",
    status: "resolved",
    service: "Server",
    timestamp: "Yesterday",
    details: "Disk usage: 78% (threshold: 75%)",
  },
  {
    id: 6,
    title: "SSL Certificate Expiry",
    description: "SSL certificate expires in 30 days",
    severity: "info",
    status: "active",
    service: "Security",
    timestamp: "2 days ago",
    details: "Certificate expires on: 2024-02-15",
  },
];

const mockAlertStats = [
  { day: "Mon", critical: 2, warning: 5, info: 3 },
  { day: "Tue", critical: 1, warning: 7, info: 4 },
  { day: "Wed", critical: 3, warning: 4, info: 2 },
  { day: "Thu", critical: 1, warning: 6, info: 5 },
  { day: "Fri", critical: 2, warning: 3, info: 4 },
  { day: "Sat", critical: 0, warning: 2, info: 3 },
  { day: "Sun", critical: 1, warning: 4, info: 2 },
];

const mockResponseTimes = [
  { time: "00:00", responseTime: 145 },
  { time: "04:00", responseTime: 152 },
  { time: "08:00", responseTime: 234 },
  { time: "12:00", responseTime: 456 },
  { time: "16:00", responseTime: 678 },
  { time: "20:00", responseTime: 389 },
  { time: "23:59", responseTime: 234 },
];

const mockNotificationChannels = [
  { name: "Email", enabled: true, recipients: 5 },
  { name: "Slack", enabled: true, channels: 3 },
  { name: "SMS", enabled: false, recipients: 2 },
  { name: "Webhook", enabled: true, endpoints: 2 },
];

export default function Alerts() {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const severityChip = (severity) => {
    switch (severity) {
      case "critical":
        return { bg: "#3b1612", color: "#fecaca" };
      case "warning":
        return { bg: "#2b2413", color: "#fde68a" };
      default:
        return { bg: "#112031", color: "#bfdbfe" };
    }
  };

  const statusChip = (status) => {
    switch (status) {
      case "active":
        return { bg: "#3b1612", color: "#fecaca" };
      case "acknowledged":
        return { bg: "#2b2413", color: "#fde68a" };
      case "resolved":
        return { bg: "#1a2e1f", color: "#bbf7d0" };
      default:
        return { bg: "#1f2933", color: "#e5e7eb" };
    }
  };

  const activeCount = mockAlerts.filter((a) => a.status === "active").length;
  const criticalCount = mockAlerts.filter((a) => a.severity === "critical" && a.status === "active").length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header with Toggle */}
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
            System Alerts
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}>
            Monitor alert volume and quickly triage critical issues.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <ToggleButtonGroup
            size="small"
            value="all"
            exclusive
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 2,
              "& .MuiToggleButton-root": {
                border: "none",
                color: "#A1A1AA",
                textTransform: "none",
                fontSize: 13,
                fontFamily: "Inter",
                px: 2,
                py: 1,
                "&.Mui-selected": {
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                  color: "#3B82F6",
                  "&:hover": { bgcolor: "rgba(59, 130, 246, 0.15)" },
                },
              },
            }}
          >
            <ToggleButton value="all">All Alerts</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="resolved">Resolved</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              bgcolor: "#3B82F6",
              fontFamily: "Inter",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            <NotificationsActiveIcon sx={{ fontSize: 16, mr: 1 }} /> Configure
          </Button>
        </Stack>
      </Box>

      {/* Summary row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={3} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active alerts</Typography>
              <Typography sx={{ color: "#FFFFFF", fontSize: 28, fontWeight: 600, fontFamily: "Inter", mt: 1 }}>{activeCount}</Typography>
              <Typography sx={{ color: "#F97316", fontSize: 12, mt: 0.5, fontFamily: "Inter" }}>
                Requires attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter", textTransform: "uppercase", letterSpacing: "0.05em" }}>Critical</Typography>
              <Typography sx={{ color: "#FFFFFF", fontSize: 28, fontWeight: 600, fontFamily: "Inter", mt: 1 }}>{criticalCount}</Typography>
              <Typography sx={{ color: "#EF4444", fontSize: 12, mt: 0.5, fontFamily: "Inter" }}>
                Immediate action needed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter", textTransform: "uppercase", letterSpacing: "0.05em" }}>Acknowledged</Typography>
              <Typography sx={{ color: "#FFFFFF", fontSize: 28, fontWeight: 600, fontFamily: "Inter", mt: 1 }}>
                {mockAlerts.filter((a) => a.status === "acknowledged").length}
              </Typography>
              <Typography sx={{ color: "#F59E0B", fontSize: 12, mt: 0.5, fontFamily: "Inter" }}>
                Being investigated
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter", textTransform: "uppercase", letterSpacing: "0.05em" }}>Resolved today</Typography>
              <Typography sx={{ color: "#FFFFFF", fontSize: 28, fontWeight: 600, fontFamily: "Inter", mt: 1 }}>
                {mockAlerts.filter((a) => a.status === "resolved").length}
              </Typography>
              <Typography sx={{ color: "#10B981", fontSize: 12, mt: 0.5, fontFamily: "Inter" }}>
                Successfully resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardHeader
              title={
                <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                  Alert trends (7d)
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                  Volume by severity across the last week.
                </Typography>
              }
              sx={{ px: 3, pt: 3, pb: 2 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAlertStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#202020" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", border: "1px solid #262626" }} />
                    <Bar dataKey="critical" fill="#f97316" radius={[4, 4, 0, 0]} name="Critical" />
                    <Bar dataKey="warning" fill="#facc15" radius={[4, 4, 0, 0]} name="Warning" />
                    <Bar dataKey="info" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Info" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            bgcolor: "#1A1D23",
            backgroundImage: "linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(239, 68, 68, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
          }}>
            <CardHeader
              title={
                <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
                  Response time (24h)
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
                  API latency with threshold overlay.
                </Typography>
              }
              sx={{ px: 3, pt: 3, pb: 2 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Box sx={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockResponseTimes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#202020" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#0A0A0A", border: "1px solid #262626" }} />
                    <Line
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      name="Response time (ms)"
                    />
                    <Line
                      type="monotone"
                      data={mockResponseTimes.map((d) => ({ ...d, threshold: 500 }))}
                      dataKey="threshold"
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Threshold"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters + alerts list */}
      <Card sx={{ 
        borderRadius: 2, 
        bgcolor: "#1A1D23",
        backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>All alerts</Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
              Filter and search through current and historical alerts.
            </Typography>
          }
          sx={{ px: 3, pt: 3, pb: 2 }}
        />
        <CardContent sx={{ px: 3, pb: 3 }}>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems="center">
              <Box sx={{ flex: 1, width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search alerts by title or description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: 18, color: "#71717A" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: "#0B0F16",
                      borderRadius: 2,
                      fontSize: 14,
                      fontFamily: "Inter",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none"
                      }
                    },
                  }}
                />
              </Box>
              <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", md: "auto" } }}>
                <Select
                  size="small"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: 140,
                    bgcolor: "#0B0F16",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontFamily: "Inter",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    }
                  }}
                >
                  <MenuItem value="all">All severity</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                </Select>
                <Select
                  size="small"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: 140,
                    bgcolor: "#0B0F16",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontFamily: "Inter",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none"
                    }
                  }}
                >
                  <MenuItem value="all">All status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="acknowledged">Acknowledged</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </Stack>
            </Stack>
          </Stack>

          {filteredAlerts.length === 0 ? (
            <Typography sx={{ color: "#9ca3af", fontSize: 13, py: 3 }}>
              No alerts match the selected filters.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {filteredAlerts.map((alert) => {
                const sev = severityChip(alert.severity);
                const st = statusChip(alert.status);
                return (
                  <Box
                    key={alert.id}
                    sx={{
                      p: 1.75,
                      borderRadius: 2,
                      bgcolor: "#101010",
                      border: "1px solid #262626",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                          <Typography sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}>
                            {alert.title}
                          </Typography>
                          <Chip
                            label={alert.severity}
                            size="small"
                            sx={{
                              bgcolor: sev.bg,
                              color: sev.color,
                              borderRadius: 999,
                              fontSize: 11,
                            }}
                          />
                          <Chip
                            label={alert.status}
                            size="small"
                            sx={{
                              bgcolor: st.bg,
                              color: st.color,
                              borderRadius: 999,
                              fontSize: 11,
                            }}
                          />
                        </Stack>
                        <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>
                          {alert.description}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
                          <Typography sx={{ color: "#6b7280", fontSize: 11 }}>
                            {alert.service}
                          </Typography>
                          <Typography sx={{ color: "#6b7280", fontSize: 11 }}>
                            {alert.timestamp}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            color: "#6b7280",
                            fontSize: 11,
                            mt: 1,
                            bgcolor: "#0A0A0A",
                            borderRadius: 1,
                            p: 1,
                          }}
                        >
                          {alert.details}
                        </Typography>
                      </Box>
                      <Stack spacing={1}>
                        {alert.status === "active" && (
                          <>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                textTransform: "none",
                                borderColor: "#30363d",
                                color: "#e5e7eb",
                              }}
                            >
                              Acknowledge
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                textTransform: "none",
                                bgcolor: "#2563eb",
                                "&:hover": { bgcolor: "#1d4ed8" },
                              }}
                            >
                              Resolve
                            </Button>
                          </>
                        )}
                        {alert.status === "acknowledged" && (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              textTransform: "none",
                              bgcolor: "#2563eb",
                              "&:hover": { bgcolor: "#1d4ed8" },
                            }}
                          >
                            Resolve
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Notification channels */}
      <Card sx={{ 
        borderRadius: 2, 
        bgcolor: "#1A1D23",
        backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(59, 130, 246, 0.02) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
              Notification channels
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
              Configure how your team receives alerts.
            </Typography>
          }
          sx={{ px: 3, pt: 3, pb: 2 }}
        />
        <CardContent sx={{ px: 3, pb: 3 }}>
          <Grid container spacing={2.5}>
            {mockNotificationChannels.map((channel) => (
              <Grid item xs={12} md={3} key={channel.name} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    p: 1.75,
                    borderRadius: 2,
                    bgcolor: "#101010",
                    border: "1px solid #262626",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.25 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {channel.name === "Email" && (
                        <MailOutlineIcon sx={{ fontSize: 18, color: "#60a5fa" }} />
                      )}
                      {channel.name === "Slack" && (
                        <ChatIcon sx={{ fontSize: 18, color: "#a855f7" }} />
                      )}
                      {channel.name === "SMS" && <SmsIcon sx={{ fontSize: 18, color: "#4ade80" }} />}
                      {channel.name === "Webhook" && <HttpIcon sx={{ fontSize: 18, color: "#f97316" }} />}
                      <Typography sx={{ color: "#e5e7eb", fontSize: 14, fontWeight: 500 }}>
                        {channel.name}
                      </Typography>
                    </Stack>
                    <Chip
                      label={channel.enabled ? "Enabled" : "Disabled"}
                      size="small"
                      sx={{
                        bgcolor: channel.enabled ? "#1a2e1f" : "#1f2933",
                        color: channel.enabled ? "#bbf7d0" : "#e5e7eb",
                        borderRadius: 999,
                        fontSize: 11,
                      }}
                    />
                  </Stack>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                    {channel.recipients && `${channel.recipients} recipients`}
                    {channel.channels && `${channel.channels} channels`}
                    {channel.endpoints && `${channel.endpoints} endpoints`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
