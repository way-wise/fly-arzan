import React, { useEffect } from "react";
import Header from "../header-footer/HeaderOld2";
import Footer from "../header-footer/Footer";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";
import Flightsinner2 from "../components/Inner_page_Sec_2_componets/Flightsinner2";
import Flightsinner3 from "../components/Inner_page_Sec_2_componets/Flightsinner3";
import FlightHeroinner1 from "../components/Inner_page_Sec_2_componets/FlightHeroinner1";

const FlightsInner2 = () => {
  return (
    <>
      <Header />

      <Flightsinner3 />
      <Footer />
    </>
  );
};

export default FlightsInner2;
