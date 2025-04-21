import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab10 from "../Tab-componet/Tab10";

const Carinner2 = () => {
  return (
    <>
      <section className="Flight-Departing">
        <div className="container">
          <div className="main-Flight-Departing ">
            <div className="Select-Departing-Flight-tab-box">
              <Tab10 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carinner2;
