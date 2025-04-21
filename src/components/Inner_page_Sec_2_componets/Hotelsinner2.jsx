import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab9 from "../Tab-componet/Tab9";

const Hotelsinner2 = () => {
  return (
    <>
      <section className="Flight-Departing">
        <div className="container">
          <div className="main-Flight-Departing ">
            <div className="Select-Departing-Flight-tab-box">
              <Tab9 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotelsinner2;
