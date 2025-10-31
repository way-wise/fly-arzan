import React, { useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import {
  Users,
  Settings,
  Menu,
  X,
  BarChart3,
  MessageSquare,
  User,
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const menuItems = [
  { name: "Dashboard", icon: BarChart3, href: "/admin" },
  { name: "Analytics Logs", icon: FileText, href: "/admin/logs" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Feedback", icon: MessageSquare, href: "/admin/feedback" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const getPageTitle = (pathname) => {
  const item = menuItems.find((item) => item.href === pathname);
  return item ? item.name : "Dashboard";
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="tw:flex tw:h-screen tw:bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="tw:fixed tw:inset-0 tw:z-40 tw:bg-black/50 tw:lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          tw:fixed tw:inset-y-0 tw:left-0 tw:z-50 tw:w-64 tw:bg-white tw:border-r tw:border-gray-200 tw:transform tw:transition-transform tw:duration-300 tw:ease-in-out
          tw:lg:static tw:lg:translate-x-0
          ${sidebarOpen ? "tw:translate-x-0" : "tw:-translate-x-full"}
        `}
      >
        <div className="tw:flex tw:items-center tw:justify-between tw:h-16 tw:px-4 tw:border-b tw:border-gray-200">
          <Link to="/admin" className="tw:lg:mx-auto">
            <img src="/logo.png" className="tw:!w-[140px]" />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="tw:lg:hidden tw:text-gray-600 tw:hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="tw:h-5 tw:w-5" />
          </Button>
        </div>

        <nav className="tw:mt-6 tw:px-4">
          <ul className="tw:space-y-2 tw:!p-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      tw:w-full tw:flex tw:items-center tw:px-4 tw:py-2.5 tw:text-sm tw:font-medium tw:rounded tw:transition-colors tw:duration-200 tw:!no-underline
                      ${
                        isActive
                          ? "tw:!bg-primary tw:!text-white tw:shadow-sm"
                          : "tw:!text-gray-700 tw:hover:!bg-gray-100 tw:hover:!text-gray-900"
                      }
                    `}
                  >
                    <Icon className="tw:mr-2 tw:size-5 tw:flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="tw:flex-1 tw:flex tw:flex-col tw:overflow-hidden">
        {/* Top bar */}
        <header className="tw:h-16 tw:bg-white tw:border-b tw:border-gray-200 tw:px-6 tw:!flex tw:items-center tw:lg:justify-end tw:justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="tw:lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="tw:size-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="tw:!size-8 tw:!rounded-full">
                <Avatar className="tw:size-10">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="tw:w-56 tw:mt-2" align="end">
              <DropdownMenuItem>
                <User className="tw:mr-2 tw:size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="tw:mr-2 tw:size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* Main content area */}
        <main className="tw:flex-1 tw:overflow-auto tw:bg-gray-50 tw:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
