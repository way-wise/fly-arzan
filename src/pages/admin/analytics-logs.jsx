import { useState, useEffect } from "react";
import {
  Download,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Skeleton } from "../../components/ui/skeleton";

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
      <div className="tw:space-y-6">
        <Skeleton className="tw:h-12 tw:w-full" />
        <Skeleton className="tw:h-96 tw:w-full" />
      </div>
    );
  }

  return (
    <div className="tw:space-y-6">
      {/* Header */}
      <div className="tw:flex tw:items-center tw:justify-between">
        <div>
          <h2 className="tw:text-2xl tw:font-bold tw:tracking-tight">
            Search Analytics Logs
          </h2>
          <p className="tw:text-muted-foreground">
            Detailed search logs with device and passenger information
          </p>
        </div>
        <div className="tw:flex tw:gap-2">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="tw:h-4 tw:w-4 tw:mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => fetchLogs(pagination.page)}
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`tw:h-4 tw:w-4 tw:mr-2 ${
                refreshing ? "tw:animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Inline Search Controls over the table */}

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Search Logs ({pagination?.total || 0} total)</CardTitle>
          <div className="tw:mt-3 tw:flex tw:flex-wrap tw:items-center tw:gap-3">
            <div className="tw:w-40">
              <Select
                value={filters.searchType}
                onValueChange={(value) =>
                  handleFilterChange("searchType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="origin">Origin</SelectItem>
                  <SelectItem value="destination">Destination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="tw:flex-1 tw:min-w-[220px]">
              <Input
                type="text"
                placeholder={
                  filters.searchType === "destination"
                    ? "e.g., LHR or London"
                    : "e.g., DXB or Dubai"
                }
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange("searchQuery", e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPagination((prev) => ({ ...prev, page: 1 }));
                    fetchLogs(1);
                  }
                }}
              />
            </div>
            {/* Inline extra filters */}
            <div className="tw:w-40">
              <Select
                value={filters.tripType}
                onValueChange={(v) => handleFilterChange("tripType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Trip Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-way">one-way</SelectItem>
                  <SelectItem value="round-trip">round-trip</SelectItem>
                  <SelectItem value="multi-city">multi-city</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="tw:w-40">
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                placeholder="Start Date"
              />
            </div>
            <div className="tw:w-40">
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                placeholder="End Date"
              />
            </div>

            <div className="tw:w-44">
              <Select
                value={filters.os}
                onValueChange={(v) => handleFilterChange("os", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="OS" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions?.oses?.map((os) => (
                    <SelectItem key={os} value={os}>
                      {os}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="tw:w-48">
              <Select
                value={filters.browser}
                onValueChange={(v) => handleFilterChange("browser", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Browser" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions?.browsers?.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="tw:w-44">
              <Select
                value={filters.deviceType}
                onValueChange={(v) => handleFilterChange("deviceType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions?.deviceTypes?.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="tw:w-44">
              <Select
                value={filters.travelClass}
                onValueChange={(v) => handleFilterChange("travelClass", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions?.travelClasses?.map((tc) => (
                    <SelectItem key={tc} value={tc}>
                      {tc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filterOptions?.countries?.length > 0 && (
              <div className="tw:w-48">
                <Select
                  value={filters.country}
                  onValueChange={(v) => handleFilterChange("country", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions?.countries?.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Bottom action row */}
            <div className="tw:w-full tw:flex tw:justify-end tw:gap-2">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="tw:h-10"
              >
                <X className="tw:h-4 tw:w-4 tw:mr-2" />
                Clear
              </Button>
              <Button
                onClick={applyFilters}
                className="tw:h-10 tw:bg-primary hover:tw:bg-primary/90 !tw:text-white"
              >
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="tw:text-center tw:text-muted-foreground tw:py-8">
              No logs found matching your filters
            </p>
          ) : (
            <>
              <div className="tw:overflow-x-auto">
                <table className="tw:w-full tw:text-sm">
                  <thead className="tw:bg-gray-50">
                    <tr>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Timestamp
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Route
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Trip Type
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Passengers
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Class
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Device
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Browser
                      </th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">OS</th>
                      <th className="tw:p-3 tw:text-left tw:font-medium">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="tw:border-t hover:tw:bg-gray-50"
                      >
                        <td className="tw:p-3 tw:text-xs tw:text-muted-foreground">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="tw:p-3 tw:font-medium">
                          {log.origin} → {log.destination}
                        </td>
                        <td className="tw:p-3">
                          <span className="tw:text-xs tw:px-2 tw:py-1 tw:bg-blue-100 tw:text-blue-700 tw:rounded">
                            {log.tripType}
                          </span>
                        </td>
                        <td className="tw:p-3">
                          {log.adults}A
                          {log.children > 0 && `, ${log.children}C`}
                        </td>
                        <td className="tw:p-3 tw:text-sm">
                          {log.travelClass || "Unknown"}
                        </td>
                        <td className="tw:p-3 tw:text-sm">
                          {log.deviceType || "Unknown"}
                        </td>
                        <td className="tw:p-3 tw:text-sm">
                          {log.browser
                            ? `${log.browser} ${
                                log.browserVersion || ""
                              }`.trim()
                            : "Unknown"}
                        </td>
                        <td className="tw:p-3 tw:text-sm">
                          {log.os
                            ? `${log.os} ${log.osVersion || ""}`.trim()
                            : "Unknown"}
                        </td>
                        <td className="tw:p-3 tw:text-sm">
                          {log.country || log.region
                            ? `${log.country || ""} ${log.region || ""}`.trim()
                            : "Unknown"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="tw:flex tw:items-center tw:justify-between tw:mt-4 tw:pt-4 tw:border-t">
                <p className="tw:text-sm tw:text-muted-foreground">
                  Page {pagination?.page || 1} of {pagination?.totalPages || 1}{" "}
                  ({pagination?.total || 0} total)
                </p>
                <div className="tw:flex tw:gap-2">
                  <Button
                    onClick={() =>
                      handlePageChange((pagination?.page || 1) - 1)
                    }
                    disabled={(pagination?.page || 1) === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="tw:h-4 tw:w-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      handlePageChange((pagination?.page || 1) + 1)
                    }
                    disabled={
                      (pagination?.page || 1) >= (pagination?.totalPages || 1)
                    }
                    variant="outline"
                    size="sm"
                  >
                    <ChevronRight className="tw:h-4 tw:w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
