import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab1 from "../Tab-componet/Tab1";
import { useTranslation } from "react-i18next";

const FlightHero = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="hero-sec add-more-height">
        <div className="container">
          <div className="main-hero">
            <div className="hero-tital">
              <h2> {t("upperSection.Cheap_flights_para")}</h2>
              <p> {t("upperSection.Our_search")}</p>
            </div>
            <div className="Flights-box add-height">
              <Tab1 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightHero;
