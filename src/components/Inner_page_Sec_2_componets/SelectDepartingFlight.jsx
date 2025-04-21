import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Tab8 from "../Tab-componet/Tab8";
import DropMoreFilters from "../drop-dwon/DropMoreFilters";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SelectDepartingFlight = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sliderRef = useRef(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  // Slider settings
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6, // Show 4 cards at a time
    slidesToScroll: 1,
    arrows: false, // Hide default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const flights = [
    { date: "2 Jan -19 Feb", price: "£ 400.00" },
    { date: "3 Jan -20 Feb", price: "£ 400.00" },
    { date: "4 Jan -21 Feb", price: "£ 350.00" },
    { date: "5 Jan -22 Feb", price: "£ 390.00" },
    { date: "6 Jan -23 Feb", price: "£ 390.00" },
    { date: "7 Jan -24 Feb", price: "£ 390.00" },
    { date: "8 Jan -25 Feb", price: "£ 390.00" },
    { date: "9 Jan -26 Feb", price: "£ 390.00" },
    { date: "2 Jan -19 Feb", price: "£ 400.00" },
    { date: "3 Jan -20 Feb", price: "£ 400.00" },
    { date: "4 Jan -21 Feb", price: "£ 350.00" },
    { date: "5 Jan -22 Feb", price: "£ 390.00" },
    { date: "6 Jan -23 Feb", price: "£ 390.00" },
    { date: "7 Jan -24 Feb", price: "£ 390.00" },
    { date: "8 Jan -25 Feb", price: "£ 390.00" },
    { date: "9 Jan -26 Feb", price: "£ 390.00" },
  ];

  return (
    <div className="main-Select-Departing-Flight">
      {/* <div className="slider-container">
     
        <button className="prev-btn" onClick={() => sliderRef.current.slickPrev()}>
          ❮
        </button>


        <Slider ref={sliderRef} {...settings} className="Select-Departing-Flight-date-box">
          {flights.map((flight, index) => (
            <div key={index} className="date-card">
              <button
                onClick={() => handleClick(index)}
                className={`flight-button ${selectedIndex === index ? "active-button" : ""}`}
              >
                <h3>{flight.date}</h3>
                <h4>{flight.price}</h4>
              </button>
            </div>
          ))}
        </Slider>


        <button className="next-btn" onClick={() => sliderRef.current.slickNext()}>
          ❯
        </button>
      </div> */}

      <div className="Suggested-main-box">
        <div className="Suggested-tab-">
          <Tab8 />
        </div>
      </div>
    </div>
  );
};

export default SelectDepartingFlight;
