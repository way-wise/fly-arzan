import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab5 from "../Tab-componet/Tab5";

const HotelsHeroinner1 = () => {
  return (
    <>
      <section className="hero-sec">
        <div className="container">
          <div className="main-hero">

            <div className="Flights-box">
              <Tab5 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelsHeroinner1;
