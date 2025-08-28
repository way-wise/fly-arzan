import React, { useEffect, useRef } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import HeroHotels from "../components/Landing_page_2_componets/HeroHotels";
import HotelsSec2 from "../components/Landing_page_2_componets/HotelsSec2";
import HotelsSec3 from "../components/Landing_page_2_componets/HotelsSec3";
import HotelsFaq from "../components/Landing_page_2_componets/HotelsFaq";
import FlightSec1 from "../components/Landing_page_1_componets/FlightSec1";
import CarsSec4 from "../components/Landing_page_3_componets/CarsSec4";
import HotelsSec4 from "../components/Landing_page_2_componets/HotelsSec4";
import { useLocation } from "react-router-dom";

const LandingHotels = () => {
  const location = useLocation();

  const sectionRefs = {
    sec5: useRef(null),
    sec6: useRef(null),
    sec7: useRef(null),
    Hfaq: useRef(null),
  };

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const target = params.get("scrollTo");

    if (target && sectionRefs[target]) {
      // Add small delay to wait for render
      setTimeout(() => {
        scrollToSection(target);
      }, 300);
    }
  }, [location]);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <Header />
      <HeroHotels />
      <FlightSec1 />
      <HotelsSec2 ref={sectionRefs.sec5} />
      <HotelsSec3 ref={sectionRefs.sec6} />
      <HotelsFaq ref={sectionRefs.Hfaq} />
      <HotelsSec4 ref={sectionRefs.sec7} />
      <Footer />
    </>
  );
};

export default LandingHotels;
