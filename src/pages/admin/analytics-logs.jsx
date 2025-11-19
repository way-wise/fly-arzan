import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

// Mock data
const mockLogs = [
  {
    id: 1,
    timestamp: "10/23/2025, 9:33:03 PM",
    origin: "DXB",
    destination: "JED",
    tripType: "one-way",
    passengers: "1A",
    class: "economy",
    device: "desktop",
    browser: "Chrome 141.0.0",
    os: "Windows 10/11",
    location: "Unknown",
  },
  {
    id: 2,
    timestamp: "10/23/2025, 8:15:22 PM",
    origin: "ALA",
    destination: "IST",
    tripType: "round-trip",
    passengers: "2A",
    class: "business",
    device: "mobile",
    browser: "Safari 17.2",
    os: "iOS 17",
    location: "Kazakhstan",
  },
  {
    id: 3,
    timestamp: "10/23/2025, 7:42:11 PM",
    origin: "TSE",
    destination: "DXB",
    tripType: "one-way",
    passengers: "1A, 1C",
    class: "economy",
    device: "desktop",
    browser: "Firefox 120",
    os: "macOS",
    location: "Kazakhstan",
  },
  {
    id: 4,
    timestamp: "10/23/2025, 6:28:45 PM",
    origin: "ALA",
    destination: "SAW",
    tripType: "round-trip",
    passengers: "3A",
    class: "economy",
    device: "tablet",
    browser: "Chrome 141.0.0",
    os: "Android 14",
    location: "Turkey",
  },
  {
    id: 5,
    timestamp: "10/23/2025, 5:55:33 PM",
    origin: "DXB",
    destination: "LHR",
    tripType: "one-way",
    passengers: "1A",
    class: "first",
    device: "desktop",
    browser: "Edge 120",
    os: "Windows 10/11",
    location: "UAE",
  },
];

// Consistent styling
const selectStyles = {
  bgcolor: "rgba(59, 130, 246, 0.1)",
  color: "#3B82F6",
  fontSize: "0.875rem",
  fontFamily: "Inter",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  borderRadius: 2,
  height: 36,
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiSelect-icon": { color: "#3B82F6" },
};

const selectMenuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#1A1D23",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      "& .MuiMenuItem-root": {
        color: "#e5e7eb",
        fontFamily: "Inter",
        fontSize: "0.875rem",
        "&:hover": { bgcolor: "rgba(59, 130, 246, 0.1)" },
        "&.Mui-selected": {
          bgcolor: "rgba(59, 130, 246, 0.2)",
          "&:hover": { bgcolor: "rgba(59, 130, 246, 0.3)" },
        },
      },
    },
  },
};

export default function AnalyticsLogs() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    tripType: "",
    travelClass: "",
    device: "",
    browser: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      tripType: "",
      travelClass: "",
      device: "",
      browser: "",
    });
  };

  const handleExport = () => {
    console.log("Exporting logs as CSV");
  };

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      !filters.searchQuery ||
      log.origin.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      log.destination.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesTripType =
      !filters.tripType || log.tripType === filters.tripType;
    const matchesClass =
      !filters.travelClass || log.class === filters.travelClass;
    const matchesDevice = !filters.device || log.device === filters.device;
    const matchesBrowser =
      !filters.browser ||
      log.browser.toLowerCase().includes(filters.browser.toLowerCase());
    return (
      matchesSearch &&
      matchesTripType &&
      matchesClass &&
      matchesDevice &&
      matchesBrowser
    );
  });

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
            Search Analytics Logs
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}
          >
            Detailed flight search logs with device, geo and passenger breakdown
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            sx={{
              borderColor: "rgba(59, 130, 246, 0.3)",
              color: "#3B82F6",
              fontFamily: "Inter",
              textTransform: "none",
              height: 36,
              "&:hover": {
                borderColor: "#3B82F6",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            sx={{
              borderColor: "rgba(59, 130, 246, 0.3)",
              color: "#3B82F6",
              fontFamily: "Inter",
              textTransform: "none",
              height: 36,
              "&:hover": {
                borderColor: "#3B82F6",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            Refresh
          </Button>
        </Stack>
      </Box>

      {/* Filters Card */}
      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader
          title={
            <Typography
              sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}
            >
              Search Logs ({filteredLogs.length} total)
            </Typography>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ color: "#71717A", fontFamily: "Inter" }}
            >
              Combine quick route search with advanced filters to narrow down
              logs
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          {/* Filter Controls */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search origin (e.g., DXB or Dubai)"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{
                          color: "#71717A",
                          mr: 1.5,
                          ml: 0.5,
                          fontSize: 20,
                        }}
                      />
                    ),
                  }}
                  sx={{
                    bgcolor: "rgba(59, 130, 246, 0.05)",
                    borderRadius: 2,
                    fontFamily: "Inter",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "all 0.2s ease",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover": {
                        bgcolor: "rgba(59, 130, 246, 0.08)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      },
                      "&.Mui-focused": {
                        bgcolor: "rgba(59, 130, 246, 0.08)",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem",
                      color: "#FFFFFF",
                      fontFamily: "Inter",
                      height: "20px",
                      paddingLeft: "4px",
                      "&::placeholder": { color: "#71717A", opacity: 1 },
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: 140 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.tripType}
                  onChange={(e) =>
                    handleFilterChange("tripType", e.target.value)
                  }
                  displayEmpty
                  sx={selectStyles}
                  MenuProps={selectMenuProps}
                >
                  <MenuItem value="">Trip type</MenuItem>
                  <MenuItem value="one-way">One-way</MenuItem>
                  <MenuItem value="round-trip">Round-trip</MenuItem>
                  <MenuItem value="multi-city">Multi-city</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: 140 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.travelClass}
                  onChange={(e) =>
                    handleFilterChange("travelClass", e.target.value)
                  }
                  displayEmpty
                  sx={selectStyles}
                  MenuProps={selectMenuProps}
                >
                  <MenuItem value="">Class</MenuItem>
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="first">First</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: 140 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.device}
                  onChange={(e) => handleFilterChange("device", e.target.value)}
                  displayEmpty
                  sx={selectStyles}
                  MenuProps={selectMenuProps}
                >
                  <MenuItem value="">Device</MenuItem>
                  <MenuItem value="desktop">Desktop</MenuItem>
                  <MenuItem value="mobile">Mobile</MenuItem>
                  <MenuItem value="tablet">Tablet</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: 160 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.browser}
                  onChange={(e) =>
                    handleFilterChange("browser", e.target.value)
                  }
                  displayEmpty
                  sx={selectStyles}
                  MenuProps={selectMenuProps}
                >
                  <MenuItem value="">Browser</MenuItem>
                  <MenuItem value="chrome">Chrome</MenuItem>
                  <MenuItem value="safari">Safari</MenuItem>
                  <MenuItem value="firefox">Firefox</MenuItem>
                  <MenuItem value="edge">Edge</MenuItem>
                </Select>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                sx={{
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  fontFamily: "Inter",
                  textTransform: "none",
                  height: 36,
                  "&:hover": {
                    borderColor: "#ef4444",
                    bgcolor: "rgba(239, 68, 68, 0.1)",
                  },
                }}
              >
                Clear
              </Button>
            </Stack>
          </Stack>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    TIMESTAMP
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    TRIP TYPE
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    PASSENGERS
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    CLASS
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    DEVICE
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    BROWSER
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    OS
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Inter",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderBottom: "none",
                    }}
                  >
                    LOCATION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    sx={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      "&:hover": { bgcolor: "rgba(59, 130, 246, 0.05)" },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.timestamp}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <Chip
                        label={log.tripType}
                        size="small"
                        sx={{
                          bgcolor:
                            log.tripType === "one-way"
                              ? "rgba(59, 130, 246, 0.1)"
                              : "rgba(34, 197, 94, 0.1)",
                          color:
                            log.tripType === "one-way" ? "#3b82f6" : "#22c55e",
                          fontFamily: "Inter",
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.passengers}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.class}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.device}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.browser}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.os}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#e5e7eb",
                        fontFamily: "Inter",
                        fontSize: "0.875rem",
                        borderBottom: "none",
                      }}
                    >
                      {log.location}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredLogs.length === 0 && (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography sx={{ color: "#71717A", fontFamily: "Inter" }}>
                No logs found matching your filters
              </Typography>
            </Box>
          )}

          {/* Pagination Info */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#71717A", fontFamily: "Inter" }}
            >
              Page 1 of 1 ({filteredLogs.length} logs)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
