import { useState, useEffect } from "react";
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
  IconButton,
  Skeleton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function AnalyticsLogs() {
  const [logs, setLogs] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  // Filter state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    tripType: "",
    searchType: "origin",
    searchQuery: "",
    os: "",
    browser: "",
    deviceType: "",
    country: "",
    travelClass: "",
  });

  // Filters panel removed; inline controls over table

  const fetchLogs = async (page = 1) => {
    try {
      setRefreshing(true);
      const base = {
        page: page.toString(),
        limit: pagination.limit.toString(),
      };
      const mapped = { ...base };
      // Map search field to origin/destination
      if (filters.searchQuery && (filters.searchType || "origin") !== "all") {
        if ((filters.searchType || "origin") === "origin")
          mapped.origin = filters.searchQuery;
        else mapped.destination = filters.searchQuery;
      }
      // Pass other filters if set
      [
        "startDate",
        "endDate",
        "tripType",
        "os",
        "browser",
        "deviceType",
        "country",
        "travelClass",
      ].forEach((k) => {
        const v = filters[k];
        if (v) mapped[k] = v;
      });
      const params = new URLSearchParams(mapped);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/logs/search-logs?${params}`
      );
      const data = await response.json();

      setLogs(data.logs || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/logs/filter-options`
      );
      const data = await response.json();
      setFilterOptions(data);
    } catch (error) {
      console.error("Failed to fetch filter options:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchLogs(1);
  };

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      tripType: "",
      searchType: "origin",
      searchQuery: "",
      os: "",
      browser: "",
      deviceType: "",
      country: "",
      travelClass: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    setTimeout(() => fetchLogs(1), 100);
  };

  const handleExport = () => {
    const mapped = {};
    if (filters.searchQuery) {
      if ((filters.searchType || "origin") === "origin")
        mapped.origin = filters.searchQuery;
      else mapped.destination = filters.searchQuery;
    }
    [
      "startDate",
      "endDate",
      "tripType",
      "os",
      "browser",
      "deviceType",
      "country",
      "travelClass",
    ].forEach((k) => {
      const v = filters[k];
      if (v) mapped[k] = v;
    });
    const params = new URLSearchParams(mapped);
    window.open(
      `${API_BASE_URL}/api/admin/logs/search-logs/export?${params}`,
      "_blank"
    );
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    fetchLogs(newPage);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={320} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
            Search analytics logs
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            Detailed flight search logs with device, geo and passenger breakdown.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleExport}
            sx={{
              borderColor: "rgba(55,65,81,0.9)",
              color: "#e5e7eb",
              textTransform: "none",
            }}
          >
            <DownloadIcon sx={{ fontSize: 18, mr: 1 }} /> CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => fetchLogs(pagination.page)}
            disabled={refreshing}
            sx={{
              borderColor: "rgba(55,65,81,0.9)",
              color: "#e5e7eb",
              textTransform: "none",
            }}
          >
            <RefreshIcon
              sx={{
                fontSize: 18,
                mr: 1,
                animation: refreshing ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh
          </Button>
        </Stack>
      </Box>

      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "#151515",
          border: "1px solid #262626",
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
              Search logs ({pagination?.total || 0} total)
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Combine quick route search with advanced filters to narrow down logs.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          {/* Filters */}
          <Stack spacing={2} sx={{ mb: 2.5 }}>
            {/* Primary search row */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems="center">
              <Box sx={{ width: 140 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.searchType}
                  onChange={(e) => handleFilterChange("searchType", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "rgba(15,23,42,0.9)",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="origin">Origin</MenuItem>
                  <MenuItem value="destination">Destination</MenuItem>
                </Select>
              </Box>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={
                    filters.searchType === "destination"
                      ? "Search destination (e.g., LHR or London)"
                      : "Search origin (e.g., DXB or Dubai)"
                  }
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPagination((prev) => ({ ...prev, page: 1 }));
                      fetchLogs(1);
                    }
                  }}
                  sx={{
                    bgcolor: "#101010",
                    borderRadius: 999,
                    "& .MuiInputBase-input": { fontSize: 13, color: "#e5e7eb" },
                  }}
                />
              </Box>
              <Box sx={{ width: 140 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.tripType}
                  onChange={(e) => handleFilterChange("tripType", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "#101010",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="">Trip type</MenuItem>
                  <MenuItem value="one-way">one-way</MenuItem>
                  <MenuItem value="round-trip">round-trip</MenuItem>
                  <MenuItem value="multi-city">multi-city</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: 160 }}>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange("startDate", e.target.value)}
                  sx={{
                    bgcolor: "#101010",
                    borderRadius: 1,
                    "& .MuiInputBase-input": { fontSize: 13, color: "#e5e7eb" },
                  }}
                />
              </Box>
              <Box sx={{ width: 160 }}>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange("endDate", e.target.value)}
                  sx={{
                    bgcolor: "#101010",
                    borderRadius: 1,
                    "& .MuiInputBase-input": { fontSize: 13, color: "#e5e7eb" },
                  }}
                />
              </Box>
            </Stack>

            {/* Advanced filters */}
            <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center">
              <Box sx={{ width: 160 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.os}
                  onChange={(e) => handleFilterChange("os", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "#101010",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="">OS</MenuItem>
                  {filterOptions?.oses?.map((os) => (
                    <MenuItem key={os} value={os}>
                      {os}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 180 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.browser}
                  onChange={(e) => handleFilterChange("browser", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "#101010",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="">Browser</MenuItem>
                  {filterOptions?.browsers?.map((b) => (
                    <MenuItem key={b} value={b}>
                      {b}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 160 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.deviceType}
                  onChange={(e) => handleFilterChange("deviceType", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "#101010",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="">Device</MenuItem>
                  {filterOptions?.deviceTypes?.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 160 }}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.travelClass}
                  onChange={(e) => handleFilterChange("travelClass", e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: "#101010",
                    color: "#e5e7eb",
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="">Class</MenuItem>
                  {filterOptions?.travelClasses?.map((tc) => (
                    <MenuItem key={tc} value={tc}>
                      {tc}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {filterOptions?.countries?.length > 0 && (
                <Box sx={{ width: 180 }}>
                  <Select
                    fullWidth
                    size="small"
                    value={filters.country}
                    onChange={(e) => handleFilterChange("country", e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: "#101010",
                      color: "#e5e7eb",
                      fontSize: 13,
                    }}
                  >
                    <MenuItem value="">Country</MenuItem>
                    {filterOptions?.countries?.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
              <Box sx={{ flex: 1 }} />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearFilters}
                  startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderColor: "#30363d",
                    color: "#e5e7eb",
                    textTransform: "none",
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={applyFilters}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#2563eb",
                    "&:hover": { bgcolor: "#1d4ed8" },
                  }}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {logs.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#9ca3af", py: 4, fontSize: 13 }}>
              No logs found matching your filters.
            </Typography>
          ) : (
            <>
              <Box sx={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Timestamp</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Route</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Trip type</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Passengers</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Class</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Device</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Browser</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>OS</th>
                      <th style={{ padding: "8px", textAlign: "left", color: "#9ca3af" }}>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} style={{ borderTop: "1px solid #020617" }}>
                        <td style={{ padding: "8px", color: "#9ca3af", fontSize: 12 }}>
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.origin} → {log.destination}
                        </td>
                        <td style={{ padding: "8px" }}>
                          <Chip
                            size="small"
                            label={log.tripType}
                            sx={{
                              bgcolor: "rgba(59,130,246,0.15)",
                              color: "#bfdbfe",
                              borderRadius: 999,
                              fontSize: 11,
                            }}
                          />
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.adults}A
                          {log.children > 0 && `, ${log.children}C`}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.travelClass || "Unknown"}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.deviceType || "Unknown"}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.browser
                            ? `${log.browser} ${(log.browserVersion || "").trim()}`.trim()
                            : "Unknown"}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.os
                            ? `${log.os} ${(log.osVersion || "").trim()}`.trim()
                            : "Unknown"}
                        </td>
                        <td style={{ padding: "8px", color: "#e5e7eb" }}>
                          {log.country || log.region
                            ? `${log.country || ""} ${log.region || ""}`.trim()
                            : "Unknown"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: "1px solid rgba(31,41,55,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                  Page {pagination?.page || 1} of {pagination?.totalPages || 1} ({
                    pagination?.total || 0
                  }{" "}
                  total)
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => handlePageChange((pagination?.page || 1) - 1)}
                    disabled={(pagination?.page || 1) === 1}
                    sx={{ color: "#e5e7eb", border: "1px solid rgba(31,41,55,0.9)" }}
                  >
                    <ChevronLeftIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handlePageChange((pagination?.page || 1) + 1)}
                    disabled={(pagination?.page || 1) >= (pagination?.totalPages || 1)}
                    sx={{ color: "#e5e7eb", border: "1px solid rgba(31,41,55,0.9)" }}
                  >
                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
