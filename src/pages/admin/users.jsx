import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    country: "Kazakhstan",
    city: "Almaty",
    lastSeen: "2h ago",
    totalSearches: 124,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Analyst",
    status: "Active",
    country: "Kazakhstan",
    city: "Astana",
    lastSeen: "12h ago",
    totalSearches: 87,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Support",
    status: "Invited",
    country: "Turkey",
    city: "Istanbul",
    lastSeen: "—",
    totalSearches: 0,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    country: "UAE",
    city: "Dubai",
    lastSeen: "5m ago",
    totalSearches: 203,
  },
];

export default function Users() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUserId, setMenuUserId] = useState(null);

  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();
    return mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q)
    );
  }, [query]);

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  const handleViewProfile = () => {
    if (menuUserId != null) {
      navigate(`/admin/users/${menuUserId}`);
      handleMenuClose();
    }
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
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            Manage admin users and inspect their flight search behavior.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            size="small"
            label={`${mockUsers.length} total users`}
            sx={{ bgcolor: "rgba(15,23,42,0.9)", color: "#e5e7eb", borderRadius: 999 }}
          />
        </Stack>
      </Box>

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
              User directory
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Search by name, email or location. Click a user to open a detailed profile.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search users by name, email or location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "rgba(15,23,42,0.9)",
                  borderRadius: 999,
                  fontSize: 13,
                },
              }}
            />
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>User</TableCell>
                  <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>Role</TableCell>
                  <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>Location</TableCell>
                  <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>Last seen</TableCell>
                  <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>Searches</TableCell>
                  <TableCell align="right" sx={{ color: "#9ca3af", borderColor: "#111827" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <TableCell sx={{ borderColor: "#111827" }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#1f2937",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Box>
                          <Typography sx={{ color: "#e5e7eb", fontSize: 14, fontWeight: 500 }}>
                            {user.name}
                          </Typography>
                          <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ borderColor: "#111827" }}>
                      <Chip
                        size="small"
                        label={user.role}
                        sx={{
                          bgcolor: "rgba(59,130,246,0.15)",
                          color: "#bfdbfe",
                          borderRadius: 999,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderColor: "#111827", color: "#e5e7eb", fontSize: 13 }}>
                      {user.city}, {user.country}
                    </TableCell>
                    <TableCell sx={{ borderColor: "#111827", color: "#9ca3af", fontSize: 13 }}>
                      {user.lastSeen}
                    </TableCell>
                    <TableCell sx={{ borderColor: "#111827", color: "#e5e7eb", fontSize: 13 }}>
                      {user.totalSearches}
                    </TableCell>
                    <TableCell align="right" sx={{ borderColor: "#111827" }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, user.id);
                        }}
                      >
                        <MoreVertIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            bgcolor: "#020617",
            color: "#e5e7eb",
            minWidth: 200,
            border: "1px solid rgba(31,41,55,0.9)",
          },
        }}
      >
        <MenuItem onClick={handleViewProfile}>
          <PersonIcon sx={{ fontSize: 18, mr: 1 }} /> View profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <MailOutlineIcon sx={{ fontSize: 18, mr: 1 }} />
          Send email
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ArrowForwardIcon sx={{ fontSize: 18, mr: 1 }} />
          Impersonate (mock)
        </MenuItem>
      </Menu>
    </Box>
  );
}
