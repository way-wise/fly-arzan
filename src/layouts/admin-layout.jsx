import React from "react";
import Sidebar from "../components/ui/sidebar";
import Header from "../components/ui/header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="tw:flex tw:h-screen tw:bg-gray-50">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="tw:flex-1 tw:flex tw:flex-col tw:overflow-hidden">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="tw:flex-1 tw:overflow-x-hidden tw:overflow-y-auto tw:bg-gray-50">
          <div className="tw:container tw:mx-auto tw:px-6 tw:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
