import React, { useEffect } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import FlightSec4 from "../components/Landing_page_1_componets/FlightSec4";
import Contacthero from "../components/Contact_page_componets/Contacthero";
import Contactsec1 from "../components/Contact_page_componets/Contactsec1";


const Contact = () => {


  return (
    <>
      <Header />
      <Contacthero />
      <Contactsec1 />
      <FlightSec4 />
      <Footer />
    </>
  );
};

export default Contact;  
