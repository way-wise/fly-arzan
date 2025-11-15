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
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#FFFFFF", fontFamily: "Inter" }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}>
            Manage admin users and inspect their flight search behavior.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            size="small"
            label={`${mockUsers.length} total users`}
            sx={{ 
              bgcolor: "rgba(59, 130, 246, 0.1)", 
              color: "#3B82F6", 
              border: "1px solid rgba(59, 130, 246, 0.2)", 
              borderRadius: 2,
              fontFamily: "Inter",
              fontSize: "0.75rem"
            }}
          />
        </Stack>
      </Box>

      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
              User directory
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
              Search by name, email or location. Click a user to open a detailed profile.
            </Typography>
          }
          sx={{ px: 3, pt: 3, pb: 2 }}
        />
        <CardContent sx={{ px: 3, pb: 3 }}>
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
                  bgcolor: "#0B0F16",
                  borderRadius: 2,
                  fontSize: 14,
                  fontFamily: "Inter",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none"
                  }
                },
              }}
            />
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>User</TableCell>
                  <TableCell sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>Role</TableCell>
                  <TableCell sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>Location</TableCell>
                  <TableCell sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>Last seen</TableCell>
                  <TableCell sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>Searches</TableCell>
                  <TableCell align="right" sx={{ 
                    color: "#71717A", 
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    fontSize: "0.75rem",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    py: 2
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{ 
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.02)"
                      }
                    }}
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <TableCell sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      py: 2.5
                    }}>
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
                          <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500, fontFamily: "Inter" }}>
                            {user.name}
                          </Typography>
                          <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      py: 2.5
                    }}>
                      <Chip
                        size="small"
                        label={user.role}
                        sx={{
                          bgcolor: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          borderRadius: 2,
                          fontSize: 11,
                          fontFamily: "Inter",
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)", 
                      color: "#FFFFFF", 
                      fontSize: 13,
                      fontFamily: "Inter",
                      py: 2.5
                    }}>
                      {user.city}, {user.country}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)", 
                      color: "#71717A", 
                      fontSize: 13,
                      fontFamily: "Inter",
                      py: 2.5
                    }}>
                      {user.lastSeen}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)", 
                      color: "#FFFFFF", 
                      fontSize: 13,
                      fontFamily: "Inter",
                      fontWeight: 500,
                      py: 2.5
                    }}>
                      {user.totalSearches}
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      py: 2.5
                    }}>
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
            bgcolor: "#1A1D23",
            color: "#FFFFFF",
            minWidth: 200,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 2,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            "& .MuiMenuItem-root": {
              fontFamily: "Inter",
              fontSize: "0.875rem",
              py: 1.5
            }
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
