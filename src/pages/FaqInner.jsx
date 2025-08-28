import React, { useEffect } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";
import Flightsinner2 from "../components/Inner_page_Sec_2_componets/Flightsinner2";
import FaqInnerhero from "../components/FaqInner_page_componets/FaqInnerhero";
import FaqInnersec2 from "../components/FaqInner_page_componets/FaqInnersec2";

const FaqInner = () => {
  return (
    <>
      <Header />
      <FaqInnerhero />
      <FaqInnersec2 />
      <Footer />
    </>
  );
};

export default FaqInner;
