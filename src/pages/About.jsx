import React, { useEffect } from "react";
import Header from "../header-footer/HeaderOld2";
import Footer from "../header-footer/Footer";
import Abouthero from "../components/About_page_componets/Abouthero";
import Aboutsec1 from "../components/About_page_componets/Aboutsec1";
import Aboutsec2 from "../components/About_page_componets/Aboutsec2";
import Aboutsec3 from "../components/About_page_componets/Aboutsec3";
import Aboutsec4 from "../components/About_page_componets/Aboutsec4";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";

const About = () => {
  return (
    <>
      <Header />
      <Abouthero />
      <Aboutsec1 />
      <Aboutsec2 />
      <Aboutsec3 />
      <Aboutsec4 />
      <FlightSec4 />
      <Footer />
    </>
  );
};

export default About;
