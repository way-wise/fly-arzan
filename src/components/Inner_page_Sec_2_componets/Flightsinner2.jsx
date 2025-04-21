import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab7 from "../Tab-componet/Tab7";

const Flightsinner2 = () => {
  return (
    <>
      <section className="Flight-Departing">
        <div className="container">
          <div className="main-Flight-Departing   no-padding">
            <div className="Select-Departing-Flight-tab-box">
              <Tab7 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Flightsinner2;
