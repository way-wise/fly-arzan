import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FlightContext } from "../../context/FlightContext";
import { useTranslation } from "react-i18next";


const Directing = () => {
  const { FlightBookingData } = useContext(FlightContext);
  const { t } = useTranslation();
  return (
    <>
      <section className="Directing">
        <div className="container">
          <div className="Directing-main">
            <h2>{t('BookYourTicket.Directing_To')}</h2>
            <p>{FlightBookingData?.airline || "Dubai"}</p>
            <div className="loaderBar"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Directing;
