import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Plane,
  Activity,
  AlertTriangle,
  Download,
  RefreshCw,
  MousePointerClick,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
// Charts
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [health, setHealth] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [series, setSeries] = useState([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState([]);
  const [browserBreakdown, setBrowserBreakdown] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, healthRes, alertsRes, seriesRes, deviceRes, browserRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/reports/metrics`),
        fetch(`${API_BASE_URL}/api/admin/monitoring/health`),
        fetch(`${API_BASE_URL}/api/admin/monitoring/alerts`),
        fetch(`${API_BASE_URL}/api/admin/reports/metrics/timeseries`),
        fetch(`${API_BASE_URL}/api/admin/reports/metrics/breakdown?type=device`),
        fetch(`${API_BASE_URL}/api/admin/reports/metrics/breakdown?type=browser`),
      ]);

      const [metricsData, healthData, alertsData, seriesData, deviceData, browserData] = await Promise.all([
        metricsRes.json(),
        healthRes.json(),
        alertsRes.json(),
        seriesRes.json(),
        deviceRes.json(),
        browserRes.json(),
      ]);

      setMetrics(metricsData);
      setHealth(healthData);
      setAlerts(alertsData.alerts || []);
      setSeries(seriesData.series || []);
      setDeviceBreakdown(deviceData.breakdown || []);
      setBrowserBreakdown(browserData.breakdown || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Trigger backend refresh
    await fetch(`${API_BASE_URL}/api/admin/reports/refresh`, {
      method: "POST",
    }).catch(() => {});
    await fetchDashboardData();
  };

  const handleCSVExport = (endpoint) => {
    window.open(
      `${API_BASE_URL}/api/admin/reports/${endpoint}&format=csv`,
      "_blank"
    );
  };

  const calculateChange = (current, previous) => {
    if (!previous) return null; // not enough history
    return ((current - previous) / (previous || 1)) * 100;
  };

  if (loading) {
    return (
      <div className="tw:space-y-6">
        <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-4 tw:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="tw:h-4 tw:w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="tw:h-8 tw:w-20 tw:mb-2" />
                <Skeleton className="tw:h-3 tw:w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const searchChange = calculateChange(
    metrics?.last24h?.totalSearches,
    metrics?.prev24h?.totalSearches
  );
  const clickOutChange = calculateChange(
    metrics?.last24h?.totalClickOuts,
    metrics?.prev24h?.totalClickOuts
  );
  const rateChange = calculateChange(
    metrics?.last24h?.clickOutRate,
    metrics?.prev24h?.clickOutRate
  );

  return (
    <div className="tw:space-y-6">
      {/* Header with Refresh */}
      <div className="tw:flex tw:items-center tw:justify-between">
        <div>
          <h2 className="tw:text-2xl tw:font-bold tw:tracking-tight">
            Dashboard
          </h2>
          <p className="tw:text-muted-foreground">
            Real-time analytics and system monitoring
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`tw:h-4 tw:w-4 tw:mr-2 ${
              refreshing ? "tw:animate-spin" : ""
            }`}
          />
          Refresh Data
        </Button>
      </div>

      {/* System Status */}
      {health && health.checks && (
        <Card>
          <CardHeader>
            <CardTitle className="tw:flex tw:items-center tw:gap-2">
              <Activity className="tw:h-5 tw:w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tw:flex tw:items-center tw:gap-6">
              <div className="tw:flex tw:items-center tw:gap-2">
                <div
                  className={`tw:h-3 tw:w-3 tw:rounded-full ${
                    health.status === "green"
                      ? "tw:bg-green-500"
                      : health.status === "yellow"
                      ? "tw:bg-yellow-500"
                      : "tw:bg-red-500"
                  }`}
                />
                <span className="tw:font-medium">
                  {health.status === "green"
                    ? "All Systems Operational"
                    : health.status === "yellow"
                    ? "Degraded Performance"
                    : "System Issues Detected"}
                </span>
              </div>
              <div className="tw:text-sm tw:text-muted-foreground">
                Database: {health.checks.database} | Amadeus:{" "}
                {health.checks.amadeus}
              </div>
              <div className="tw:text-sm tw:text-muted-foreground">
                Uptime: {Math.floor(health.checks.uptime / 3600)}h
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card className="tw:border-yellow-500">
          <CardHeader>
            <CardTitle className="tw:flex tw:items-center tw:gap-2 tw:text-yellow-600">
              <AlertTriangle className="tw:h-5 tw:w-5" />
              Active Alerts ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tw:space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="tw:flex tw:items-start tw:gap-3 tw:p-3 tw:bg-yellow-50 tw:rounded-lg"
                >
                  <AlertTriangle className="tw:h-5 tw:w-5 tw:text-yellow-600 tw:mt-0.5" />
                  <div className="tw:flex-1">
                    <p className="tw:font-medium tw:text-sm">{alert.message}</p>
                    {alert.error && (
                      <p className="tw:text-xs tw:text-muted-foreground tw:mt-1">
                        {alert.error}
                      </p>
                    )}
                    <p className="tw:text-xs tw:text-muted-foreground tw:mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`tw:text-xs tw:px-2 tw:py-1 tw:rounded ${
                      alert.level === "critical"
                        ? "tw:bg-red-100 tw:text-red-700"
                        : "tw:bg-yellow-100 tw:text-yellow-700"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6">
        <Card>
          <CardHeader className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:space-y-0 tw:pb-2">
            <CardTitle className="tw:text-sm tw:font-medium">
              Total Searches
            </CardTitle>
            <Search className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="tw:text-2xl tw:font-bold">
              {metrics?.last24h?.totalSearches || 0}
            </div>
            {searchChange === null ? (
              <p className="tw:text-xs tw:text-muted-foreground">N/A vs previous 24h</p>
            ) : (
              <p
                className={`tw:text-xs tw:flex tw:items-center tw:gap-1 ${
                  searchChange >= 0 ? "tw:text-green-600" : "tw:text-red-600"
                }`}
              >
                {searchChange >= 0 ? (
                  <TrendingUp className="tw:h-3 tw:w-3" />
                ) : (
                  <TrendingDown className="tw:h-3 tw:w-3" />
                )}
                {Math.abs(searchChange).toFixed(1)}% vs previous 24h
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:space-y-0 tw:pb-2">
            <CardTitle className="tw:text-sm tw:font-medium">
              Total Click-Outs
            </CardTitle>
            <MousePointerClick className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="tw:text-2xl tw:font-bold">
              {metrics?.last24h?.totalClickOuts || 0}
            </div>
            {clickOutChange === null ? (
              <p className="tw:text-xs tw:text-muted-foreground">N/A vs previous 24h</p>
            ) : (
              <p
                className={`tw:text-xs tw:flex tw:items-center tw:gap-1 ${
                  clickOutChange >= 0 ? "tw:text-green-600" : "tw:text-red-600"
                }`}
              >
                {clickOutChange >= 0 ? (
                  <TrendingUp className="tw:h-3 tw:w-3" />
                ) : (
                  <TrendingDown className="tw:h-3 tw:w-3" />
                )}
                {Math.abs(clickOutChange).toFixed(1)}% vs previous 24h
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:space-y-0 tw:pb-2">
            <CardTitle className="tw:text-sm tw:font-medium">
              Click-Out Rate
            </CardTitle>
            <TrendingUp className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="tw:text-2xl tw:font-bold">
              {((metrics?.last24h?.clickOutRate || 0) * 100).toFixed(1)}%
            </div>
            {rateChange === null ? (
              <p className="tw:text-xs tw:text-muted-foreground">N/A vs previous 24h</p>
            ) : (
              <p
                className={`tw:text-xs tw:flex tw:items-center tw:gap-1 ${
                  rateChange >= 0 ? "tw:text-green-600" : "tw:text-red-600"
                }`}
              >
                {rateChange >= 0 ? (
                  <TrendingUp className="tw:h-3 tw:w-3" />
                ) : (
                  <TrendingDown className="tw:h-3 tw:w-3" />
                )}
                {Math.abs(rateChange).toFixed(1)}% vs previous 24h
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Routes */}
      {/* Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Activity (Last 24h)</CardTitle>
          <CardDescription>Searches and click-outs per hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="tw:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="searches" stroke="#3b82f6" fill="url(#colorS)" />
                <Area type="monotone" dataKey="clickouts" stroke="#22c55e" fill="url(#colorC)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-6 tw:mt-6">
            <div>
              <h4 className="tw:text-sm tw:font-medium tw:mb-2">Devices</h4>
              <div className="tw:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceBreakdown} dataKey="count" nameKey="key" outerRadius={80} label>
                      {deviceBreakdown.map((_, i) => (
                        <Cell key={`d-${i}`} fill={["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"][i % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="tw:text-sm tw:font-medium tw:mb-2">Top Browsers</h4>
              <div className="tw:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={browserBreakdown} dataKey="count" nameKey="key" outerRadius={80} label>
                      {browserBreakdown.map((_, i) => (
                        <Cell key={`b-${i}`} fill={["#06b6d4", "#8b5cf6", "#84cc16", "#f43f5e", "#f59e0b"][i % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Routes */}
      <Card>
        <CardHeader>
          <div className="tw:flex tw:items-center tw:justify-between">
            <div>
              <CardTitle className="tw:flex tw:items-center tw:gap-2">
                <Plane className="tw:h-5 tw:w-5" />
                Top 5 Routes (Last 24h)
              </CardTitle>
              <CardDescription>Most searched routes by volume</CardDescription>
            </div>
            <Button
              onClick={() =>
                handleCSVExport("top-routes?range=last24h&limit=10")
              }
              variant="outline"
              size="sm"
            >
              <Download className="tw:h-4 tw:w-4 tw:mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {metrics?.last24h?.topRoutes?.length > 0 ? (
            <div className="tw:space-y-4">
              {metrics.last24h.topRoutes.map((route, index) => (
                <div
                  key={index}
                  className="tw:flex tw:items-center tw:justify-between tw:p-3 tw:bg-gray-50 tw:rounded-lg"
                >
                  <div className="tw:flex tw:items-center tw:gap-3">
                    <span className="tw:text-lg tw:font-bold tw:text-gray-400">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="tw:font-medium">
                        {route.origin} → {route.destination}
                      </p>
                    </div>
                  </div>
                  <div className="tw:text-right">
                    <p className="tw:font-bold tw:text-lg">{route.count}</p>
                    <p className="tw:text-xs tw:text-muted-foreground">
                      searches
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="tw:text-center tw:text-muted-foreground tw:py-8">
              No search data available yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
