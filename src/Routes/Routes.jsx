import React, { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../components/login/Login";
import Singup from "../components/login/singup";
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



const Routes = () => {




  return useRoutes([

    { path: "", element: <LandingFlights />, },

    { path: "/Hotels", element: <LandingHotels />, },

    { path: "/Car", element: <LandingCar />, },

    { path: "/FlightsInner", element: <FlightsInner />, },

    { path: "/FlightsInner2", element: <FlightsInner2 />, },

    { path: "/Recentactivities", element: <Recentactivities />, },

    { path: "/HotelsInner", element: <HotelsInner />, },

    { path: "/CarInner", element: <CarInner />, },

    { path: "/Faq", element: <FaqInner />, },

    { path: "/BookYourTicket", element: <BookYourTicket />, },

    { path: "/ReviewInner", element: <ReviewInner />, },

    { path: "/About", element: <About />, },

    { path: "/Contact", element: <Contact />, },

    { path: "/PrivacyPolicy", element: <PrivacyPolicy />, },



    { path: "/Login", element: <Login />, },

    { path: "/Singup", element: <Singup />, },

    { path: "/loader", element: <WeDirecting />, },

    { path: "/Dashboard/*", element: <Dashboard />, },

    { path: "/FlightsBooking", element: <Booking_StepFormmain />, },
    { path: "/flight-search", element: <FilterFlights />, },


    { path: "/COVID", element: <COVID />, },


    { path: "/Airport", element: <Airport />, },

    { path: "/VisaRequirements", element: <VisaRequirements/>, },
  ]);
};

export default Routes;
