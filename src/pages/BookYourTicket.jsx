import React, { useContext, useEffect } from "react";
import Header from "../header-footer/Header";
import Footer from "../header-footer/Footer";
import BookYourTicket1 from "../components/BookYourTicket_page_componets/BookYourTicket1";
import { FlightContext } from "../context/FlightContext";
import { useNavigate } from "react-router-dom";

const BookYourTicket = () => {
  //   const { FlightBookingData } = useContext(FlightContext);
  //   const navigate = useNavigate();

  // useEffect(() => {

  
  //   if (!FlightBookingData || !FlightBookingData.itineraries || FlightBookingData.itineraries.length === 0) {
  //     navigate("/");
  //   }
  // }, [FlightBookingData]);

  return (
    <>
      <Header />
      <BookYourTicket1 />
      <Footer />
    </>
  );
};

export default BookYourTicket;
