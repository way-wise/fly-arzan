import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Tab11 from "../Tab-componet/Tab11";
import { useTranslation } from 'react-i18next';

const FaqInnersec2 = () => {
    const { t } = useTranslation();
  return (
    <>
      <section className="FaqInner-sec2">
        <div className="container">
          <div className="FaqInner-sec2-main">
            <div className="FaqInner-sec2-tital">
              <h2>{ t(`Faqpage.tital1`)}</h2>
              <p>{ t(`Faqpage.text1`)}</p>
            </div>

            <div className="FaqInner-sec2-tab">
              <Tab11 />
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqInnersec2;
