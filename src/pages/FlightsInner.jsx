import React, { useContext, useEffect } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";
import Flightsinner2 from "../components/Inner_page_Sec_2_componets/Flightsinner2";
import FlightHeroinner1 from "../components/Inner_page_Sec_2_componets/FlightHeroinner1";
 

const FlightsInner = () => {
  
  return (
    <>
      <Header />
      <FlightHeroinner1 />
      <Flightsinner2 />

      <Footer />
    </>
  );
};

export default FlightsInner;
