import { useRoutes } from "react-router-dom";
import Login from "../components/login/Login";
import Singup from "../components/login/Singup";
import LandingFlights from "../pages/LandingFlights";
import LandingHotels from "../pages/LandingHotels";
import LandingCar from "../pages/LandingCar";
import CarInner from "../pages/CarInner";
import HotelsInner from "../pages/HotelsInner";
import FlightsInner from "../pages/FlightsInner";
import FaqInner from "../pages/FaqInner";
import ReviewInner from "../pages/ReviewInner";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Booking_StepFormmain from "../components/Flights_Bookings_Page_components/Booking_StepFormmain";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import FlightsInner2 from "../pages/FlightsInner2";
import BookYourTicket from "../pages/BookYourTicket";
import WeDirecting from "../pages/WeDirecting";
import Recentactivities from "../components/login/Recentactivities";
import FilterFlights from "../components/Filter_Flights_componets/FilterFlights";
import COVID from "../header-footer/COVID";
import VisaRequirements from "../header-footer/VisaRequirements";
import Airport from "../header-footer/Airport";
import FlightSearchPage from "../pages/search/flight-search-page";
import FlightDetailsPage from "@/pages/details/flight-details-page";
import { AdminLayout, Dashboard as AdminDashboard, Users, UserDetails, Settings, Feedback, AnalyticsLogs } from "../pages/admin";
import Roles from "../pages/admin/roles";

// Analytics Pages
import EngagementMetrics from "../pages/admin/analytics/engagement";
import SearchRoutes from "../pages/admin/analytics/routes";
import TrendCharts from "../pages/admin/analytics/trends";

// Monitoring Pages
import APIHealth from "../pages/admin/monitoring/health";
import SystemAlerts from "../pages/admin/monitoring/alerts";
import SystemLogs from "../pages/admin/monitoring/logs";

// Auth Pages
import Sessions from "../pages/admin/auth/sessions";

const Routes = () => {
  return useRoutes([
    { path: "", element: <LandingFlights /> },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "dashboard", element: <AdminDashboard /> },
        
        // Analytics Routes
        { path: "logs", element: <AnalyticsLogs /> },
        { path: "analytics/engagement", element: <EngagementMetrics /> },
        { path: "analytics/routes", element: <SearchRoutes /> },
        { path: "analytics/trends", element: <TrendCharts /> },
        
        // Monitoring Routes
        { path: "monitoring/health", element: <APIHealth /> },
        { path: "monitoring/alerts", element: <SystemAlerts /> },
        { path: "monitoring/logs", element: <SystemLogs /> },
        
        // Auth Routes
        { path: "auth/sessions", element: <Sessions /> },
        
        // User Management
        { path: "users", element: <Users /> },
        { path: "users/:id", element: <UserDetails /> },
        { path: "roles", element: <Roles /> },
        
        // Settings & Feedback
        { path: "settings", element: <Settings /> },
        { path: "feedback", element: <Feedback /> },
      ],
    },

    { path: "/search/flight", element: <FlightSearchPage /> },

    { path: "/flight/details", element: <FlightDetailsPage /> },

    { path: "/Hotels", element: <LandingHotels /> },

    { path: "/Car", element: <LandingCar /> },

    { path: "/FlightsInner", element: <FlightsInner /> },

    { path: "/FlightsInner2", element: <FlightsInner2 /> },

    { path: "/Recentactivities", element: <Recentactivities /> },

    { path: "/HotelsInner", element: <HotelsInner /> },

    { path: "/CarInner", element: <CarInner /> },

    { path: "/Faq", element: <FaqInner /> },

    { path: "/BookYourTicket", element: <BookYourTicket /> },

    { path: "/ReviewInner", element: <ReviewInner /> },

    { path: "/About", element: <About /> },

    { path: "/Contact", element: <Contact /> },

    { path: "/PrivacyPolicy", element: <PrivacyPolicy /> },

    { path: "/Login", element: <Login /> },

    { path: "/Singup", element: <Singup /> },

    { path: "/loader", element: <WeDirecting /> },

    { path: "/FlightsBooking", element: <Booking_StepFormmain /> },
    { path: "/flight-search", element: <FilterFlights /> },

    { path: "/COVID", element: <COVID /> },

    { path: "/Airport", element: <Airport /> },

    { path: "/VisaRequirements", element: <VisaRequirements /> },
  ]);
};

export default Routes;
