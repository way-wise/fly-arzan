import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab10 from "../Tab-componet/Tab10";
import Header from "../../header-footer/HeaderOld2";
import FlightSec4 from "../Landing_page_1_componets/FlightSec4";
import Footer from "../../header-footer/Footer";
import Flights_Booking_StepForm1 from "./Flights_Booking_StepForm1";

const Booking_StepFormmain = () => {
  return (
    <>
      <Header />
      <Flights_Booking_StepForm1 />
      <FlightSec4 />
      <Footer />
    </>
  );
};

export default Booking_StepFormmain;
