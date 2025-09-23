import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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
  const user = getUserById(id);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="tw:space-y-6">
        <div className="tw:flex tw:items-center tw:gap-4">
          <Link to="/admin/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="tw:h-4 tw:w-4 tw:mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="tw:p-6">
            <p className="tw:text-gray-500">User not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="tw:space-y-6">
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-4">
        <div>
          <h1 className="tw:text-2xl tw:font-bold tw:text-gray-900">
            {user.name}
          </h1>
          <p className="tw:text-gray-500">User Details</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="tw:size-4" />
          Back
        </Button>
      </div>

      <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-3 tw:gap-6">
        {/* User Info Card */}
        <Card className="tw:lg:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="tw:space-y-4">
            <div className="tw:flex tw:items-center tw:gap-4">
              <div className="tw:w-16 tw:h-16 tw:bg-gray-200 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                <span className="tw:text-xl tw:font-semibold tw:text-gray-600">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="tw:text-lg tw:font-semibold">{user.name}</h3>
                <p className="tw:text-gray-500">
                  Customer since {user.joinDate}
                </p>
              </div>
            </div>

            <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
              <div className="tw:flex tw:items-center tw:gap-3">
                <Mail className="tw:h-4 tw:w-4 tw:text-gray-400" />
                <div>
                  <p className="tw:text-sm tw:font-medium">Email</p>
                  <p className="tw:text-sm tw:text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="tw:flex tw:items-center tw:gap-3">
                <Phone className="tw:h-4 tw:w-4 tw:text-gray-400" />
                <div>
                  <p className="tw:text-sm tw:font-medium">Phone</p>
                  <p className="tw:text-sm tw:text-gray-600">{user.phone}</p>
                </div>
              </div>

              <div className="tw:flex tw:items-center tw:gap-3">
                <MapPin className="tw:h-4 tw:w-4 tw:text-gray-400" />
                <div>
                  <p className="tw:text-sm tw:font-medium">Location</p>
                  <p className="tw:text-sm tw:text-gray-600">{user.location}</p>
                </div>
              </div>

              <div className="tw:flex tw:items-center tw:gap-3">
                <Calendar className="tw:h-4 tw:w-4 tw:text-gray-400" />
                <div>
                  <p className="tw:text-sm tw:font-medium">Join Date</p>
                  <p className="tw:text-sm tw:text-gray-600">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>User activity overview</CardDescription>
          </CardHeader>
          <CardContent className="tw:space-y-4">
            <div className="tw:text-center tw:p-4 tw:bg-blue-50 tw:rounded-lg">
              <p className="tw:text-2xl tw:font-bold tw:text-blue-600">
                {user.totalBookings}
              </p>
              <p className="tw:text-sm tw:text-gray-600">Total Bookings</p>
            </div>
            <div className="tw:text-center tw:p-4 tw:bg-green-50 tw:rounded-lg">
              <p className="tw:text-2xl tw:font-bold tw:text-green-600">
                {user.totalSpent}
              </p>
              <p className="tw:text-sm tw:text-gray-600">Total Spent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest bookings and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="tw:text-gray-500">No recent activity available.</p>
        </CardContent>
      </Card>
    </div>
  );
}
