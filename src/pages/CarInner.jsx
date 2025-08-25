import React, { useEffect } from "react";
import Header from "../header-footer/HeaderOld2";
import Footer from "../header-footer/Footer";
import CarsSec4 from "../components/Landing_page_3_componets/CarsSec4";
import Carinner2 from "../components/Inner_page_Sec_2_componets/Carinner2";

const CarInner = () => {
  return (
    <>
      <Header />
      {/* <CarHeroinner1 /> */}
      <Carinner2 />
      {/* <CarsSec4 /> */}
      <Footer />
    </>
  );
};

export default CarInner;
