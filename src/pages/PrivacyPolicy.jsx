import React, { useEffect } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";
import PrivacyPolicysec1 from "../components/PrivacyPolicy_page_componets/PrivacyPolicysec1";



const PrivacyPolicy = () => {


  return (
    <>
      <Header />
      <PrivacyPolicysec1 />
      <FlightSec4 />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;  
