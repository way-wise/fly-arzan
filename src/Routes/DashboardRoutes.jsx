import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard1 from "../components/main-dashbord/Sidebar-box/Dashboard1";
import Dashboard2 from "../components/main-dashbord/Sidebar-box/Dashboard2";
import AddFlight from "../components/Dashboard_page_compontes/AddFlight/AddFlight";




const DashboardRoutes = () => {
  return (
    // ts
    <Routes>
      <Route path="" element={<Dashboard1 />} />
      <Route path="/ManageCotent" element={<Dashboard2 />} />
      <Route path="/flight" element={<AddFlight />} />

    </Routes>
  );
};

export default DashboardRoutes;
