import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import DevicesIcon from "@mui/icons-material/Devices";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouteIcon from "@mui/icons-material/Route";

// Mock user data
const getUserById = (id) => {
  const users = {
    1: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "January 15, 2023",
      avatar: "/avatars/01.png",
      totalBookings: 12,
      totalSpent: "$4,234",
    },
    2: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      joinDate: "March 22, 2023",
      avatar: "/avatars/02.png",
      totalBookings: 8,
      totalSpent: "$2,876",
    },
    3: {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinDate: "May 10, 2023",
      avatar: "/avatars/03.png",
      totalBookings: 15,
      totalSpent: "$6,543",
    },
    4: {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 321-0987",
      location: "Miami, FL",
      joinDate: "July 5, 2023",
      avatar: "/avatars/04.png",
      totalBookings: 6,
      totalSpent: "$1,987",
    },
  };
  return users[id];
};

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserById(id);

  const sessions = useMemo(
    () =>
      user
        ? [
            {
              id: 1,
              startedAt: "Today 09:24",
              device: "Desktop · Chrome",
              location: "Almaty, KZ",
              searches: 7,
              lastRoute: "ALA → IST",
              duration: "12m",
            },
            {
              id: 2,
              startedAt: "Yesterday 21:03",
              device: "Mobile · Safari",
              location: "Almaty, KZ",
              searches: 3,
              lastRoute: "ALA → DXB",
              duration: "5m",
            },
          ]
        : [],
    [user]
  );

  if (!user) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <IconButton
          size="small"
          onClick={() => navigate("/admin/users")}
          sx={{ alignSelf: "flex-start", color: "#e5e7eb" }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Card
          sx={{
            borderRadius: 3,
            bgcolor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(51,65,85,0.9)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ color: "#9ca3af" }}>User not found.</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            size="small"
            onClick={() => navigate(-1)}
            sx={{ color: "#e5e7eb", mr: 0.5 }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              User profile & behavior
            </Typography>
          </Box>
        </Stack>
        <Chip
          size="small"
          label={`Role: ${user.role || "Admin"}`}
          sx={{ bgcolor: "rgba(15,23,42,0.9)", color: "#e5e7eb", borderRadius: 999 }}
        />
      </Stack>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
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
                  User information
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Identity, contact details and geography.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "#1f2937",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {initials}
                </Avatar>
                <Box>
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 600, fontSize: 18 }}>
                    {user.name}
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>
                    Customer since {user.joinDate}
                  </Typography>
                </Box>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <MailIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Email</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>{user.email}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Phone</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>{user.phone}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <LocationOnIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Location</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>
                        {user.location}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <EventIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Join date</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>{user.joinDate}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
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
                  Flight activity
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  High-level metrics for this user.
                </Typography>
              }
              sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
            />
            <CardContent sx={{ px: 2.5, pb: 2.5 }}>
              <Stack spacing={1.75}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <QueryStatsIcon sx={{ fontSize: 20, color: "#60a5fa" }} />
                    <Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Total searches</Typography>
                      <Typography sx={{ color: "#e5e7eb", fontSize: 16, fontWeight: 600 }}>
                        {user.totalBookings}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <DevicesIcon sx={{ fontSize: 20, color: "#a5b4fc" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Preferred device</Typography>
                    <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>Desktop / Chrome</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 20, color: "#f97316" }} />
                  <Box>
                    <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>Last seen</Typography>
                    <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>Today, 09:24</Typography>
                  </Box>
                </Stack>
              </Stack>
              <Divider sx={{ my: 2, borderColor: "#111827" }} />
              <Typography sx={{ color: "#9ca3af", fontSize: 12, mb: 0.5 }}>
                Top routes searched
              </Typography>
              <Stack spacing={0.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RouteIcon sx={{ fontSize: 16, color: "#60a5fa" }} />
                  <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>ALA → IST</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RouteIcon sx={{ fontSize: 16, color: "#60a5fa" }} />
                  <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>ALA → DXB</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
              Recent sessions
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Flight search sessions with device, location and last route.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          {sessions.length === 0 ? (
            <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>
              No recent sessions available.
            </Typography>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Started at
                    </th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Device
                    </th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Location
                    </th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Searches
                    </th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Last route
                    </th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} style={{ borderTop: "1px solid #020617" }}>
                      <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>{s.startedAt}</td>
                      <td style={{ padding: "8px", fontSize: 13, color: "#9ca3af" }}>{s.device}</td>
                      <td style={{ padding: "8px", fontSize: 13, color: "#9ca3af" }}>{s.location}</td>
                      <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>{s.searches}</td>
                      <td style={{ padding: "8px", fontSize: 13, color: "#e5e7eb" }}>{s.lastRoute}</td>
                      <td style={{ padding: "8px", fontSize: 13, color: "#9ca3af" }}>{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
