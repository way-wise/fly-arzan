import { useState } from "react";
import {
  Eye,
  DollarSign,
  BarChart3,
  Users,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// ============ COMPREHENSIVE MOCK DATA ============
const mockMetrics = {
  pageViews: { value: 12847, change: 7.4, trend: "up" },
  totalRevenue: { value: 124563, change: 12.4, trend: "up" },
  bounceRate: { value: 24.6, change: -3.1, trend: "down" },
  totalSubscribers: { value: 9234, change: 4.8, trend: "up" },
};

const mockSalesData = [
  { day: "Mon", pageViews: 1820, revenue: 14230 },
  { day: "Tue", pageViews: 1941, revenue: 15840 },
  { day: "Wed", pageViews: 2103, revenue: 17290 },
  { day: "Thu", pageViews: 1987, revenue: 16110 },
  { day: "Fri", pageViews: 2156, revenue: 18970 },
  { day: "Sat", pageViews: 1789, revenue: 13250 },
  { day: "Sun", pageViews: 1651, revenue: 11920 },
];

const mockSubscribersData = [
  { day: "Mon", subscribers: 1520 },
  { day: "Tue", subscribers: 1623 },
  { day: "Wed", subscribers: 1790 },
  { day: "Thu", subscribers: 1678 },
  { day: "Fri", subscribers: 1821 },
  { day: "Sat", subscribers: 1492 },
  { day: "Sun", subscribers: 1385 },
];

const mockTrafficData = [
  { name: "Desktop", value: 7423, color: "#3b82f6" },
  { name: "Mobile", value: 4832, color: "#22c55e" },
  { name: "Tablet", value: 592, color: "#f59e0b" },
];

const mockIntegrations = [
  { name: "Stripe", status: "active", lastSync: "2 mins ago", icon: "💳" },
  { name: "Zapier", status: "active", lastSync: "5 mins ago", icon: "⚡" },
  { name: "SendGrid", status: "inactive", lastSync: "3 hours ago", icon: "📧" },
  { name: "Slack", status: "active", lastSync: "1 min ago", icon: "💬" },
  { name: "Google Analytics", status: "active", lastSync: "10 mins ago", icon: "📊" },
  { name: "Amadeus API", status: "degraded", lastSync: "15 mins ago", icon: "✈️" },
];

