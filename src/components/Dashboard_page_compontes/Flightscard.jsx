import React from "react";
import Places1 from "../../assets/Images/Places1.png";
import Places2 from "../../assets/Images/Places2.png";
import Places3 from "../../assets/Images/Places3.png";
import Places4 from "../../assets/Images/Places4.png";
import Places5 from "../../assets/Images/Places5.png";
import Places6 from "../../assets/Images/Places6.png";
import Places7 from "../../assets/Images/Places7.png";
import Places8 from "../../assets/Images/Places8.png";
import Places9 from "../../assets/Images/Places9.png";
import { BackendUrl } from "../../baseUrl";
import FlightCard from "../Flights_cards/FlightCard";
const Flightscard = ({showData}) => {
  const cardData = [
    {
      id: 1,
      title: "Coco Palm Dhuni",
      imgSrc: Places1,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 2,
      title: "Si chang island",
      imgSrc: Places2,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 3,
      title: "Montenegro",
      imgSrc: Places3,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },

    {
      id: 4,
      title: "Bali in Indonesia",
      imgSrc: Places4,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 5,
      title: " James Bond island",
      imgSrc: Places5,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 6,
      title: "Phang nga",
      imgSrc: Places6,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 7,
      title: "Chanthaburi",
      imgSrc: Places7,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 8,
      title: "Busan",
      imgSrc: Places8,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    {
      id: 9,
      title: "Lincoln Memorial",
      imgSrc: Places9,
      icon1: 'Beaches',
      icon2: 'Snorkeling',
      icon3: 'Food'
    },
    // Add more cards as needed
  ];
  return (
    <>
     <FlightCard cardData={showData}/>
    </>
  );
};

export default Flightscard;
