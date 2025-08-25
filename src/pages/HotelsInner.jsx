import React, { useEffect } from "react";
import Header from "../header-footer/HeaderOld2";
import Footer from "../header-footer/Footer";
import CarsSec4 from "../components/Landing_page_3_componets/CarsSec4";
import Hotelsinner2 from "../components/Inner_page_Sec_2_componets/Hotelsinner2";

const HotelsInner = () => {
  return (
    <>
      <Header />
      {/* <HotelsHeroinner1 /> */}
      <Hotelsinner2 />
      {/* <CarsSec4 /> */}
      <Footer />
    </>
  );
};

export default HotelsInner;
