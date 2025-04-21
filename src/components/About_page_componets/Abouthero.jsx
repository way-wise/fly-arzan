import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab6 from "../Tab-componet/Tab6";
import { useTranslation } from "react-i18next";

const Abouthero = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="Abouthero-sec">
        <div className="container">
          <div className="Abouthero-main">
            <h2>{ t(`AboutUs.heading`)}</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Abouthero;
