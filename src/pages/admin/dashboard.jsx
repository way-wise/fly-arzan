import React from "react";
import { TrendingUp, Plane, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// Mock data for dashboard stats
const dashboardStats = [
  { title: "Total Users", value: "2,847", change: "+12%", trend: "up" },
  { title: "Revenue", value: "$45,231", change: "+8%", trend: "up" },
  { title: "Monthly Growth", value: "23%", change: "+5%", trend: "up" },
  {
    title: "Avg. Stay Duration",
    value: "4.2 days",
    change: "-2%",
    trend: "down",
  },
];

const popularRoutes = [
  { route: "NYC → LAX", bookings: 1247, revenue: "$89,432" },
  { route: "LHR → JFK", bookings: 892, revenue: "$67,890" },
  { route: "DXB → BOM", bookings: 743, revenue: "$45,231" },
  { route: "CDG → BCN", bookings: 634, revenue: "$38,920" },
];

const popularCities = [
  { city: "New York", searches: 3421 },
  { city: "London", searches: 2847 },
  { city: "Dubai", searches: 2156 },
  { city: "Paris", searches: 1923 },
];

export default function Dashboard() {
  return (
    <div className="tw:space-y-6">
      {/* Stats Grid */}
      <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-4 tw:gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:space-y-0 tw:pb-2">
              <CardTitle className="tw:text-sm tw:font-medium">
                {stat.title}
              </CardTitle>
              <TrendingUp
                className={`tw:h-4 tw:w-4 ${
                  stat.trend === "up" ? "tw:text-green-600" : "tw:text-red-600"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="tw:text-2xl tw:font-bold">{stat.value}</div>
              <p
                className={`tw:text-xs ${
                  stat.trend === "up" ? "tw:text-green-600" : "tw:text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Routes and Cities */}
      <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="tw:flex tw:items-center tw:gap-2">
              <Plane className="tw:h-5 tw:w-5" />
              Popular Routes
            </CardTitle>
            <CardDescription>
              Most booked flight routes this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="tw:space-y-4">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className="tw:flex tw:items-center tw:justify-between"
                >
                  <div>
                    <p className="tw:font-medium">{route.route}</p>
                    <p className="tw:text-sm tw:text-gray-500">
                      {route.bookings} bookings
                    </p>
                  </div>
                  <div className="tw:text-right">
                    <p className="tw:font-medium">{route.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="tw:flex tw:items-center tw:gap-2">
              <MapPin className="tw:h-5 tw:w-5" />
              Popular Cities
            </CardTitle>
            <CardDescription>Most searched destinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="tw:space-y-4">
              {popularCities.map((city, index) => (
                <div
                  key={index}
                  className="tw:flex tw:items-center tw:justify-between"
                >
                  <div>
                    <p className="tw:font-medium">{city.city}</p>
                  </div>
                  <div className="tw:text-right">
                    <p className="tw:font-medium">{city.searches} searches</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
