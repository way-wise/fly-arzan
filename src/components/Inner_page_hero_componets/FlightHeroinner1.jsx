import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab4 from "../Tab-componet/Tab4";

const FlightHeroinner1 = () => {
  return (
    <>
      <section className="hero-sec">
        <div className="container">
          <div className="main-hero">

            <div className="Flights-box">
              <Tab4 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightHeroinner1;
