import React, { useState } from "react";
import { useTranslation } from "react-i18next";


const Accountcomponets = () => {
  
    const { t } = useTranslation();
  return (
    <>
      <section className="Accountcomponets-sec">
        <div className="General-box">
          <p>{t(`Accountpage.text4`)}</p>
        </div>

        <div className="General-Email">
          <h3>{t(`Accountpage.text5`)}</h3>
          <p>{t(`Accountpage.tital4`)}</p>
        </div>

        <div className="General-box">
          <p>{t(`Accountpage.text6`)}</p>
        </div>

        <div className="General-Email more-bxo">
          <input type="checkbox" />
          <p>{t(`Accountpage.text7`)}</p>
        </div>

        <div className="General-Email">

          <p>{t(`Accountpage.text8`)} </p>
          <h3>{t(`Accountpage.text9`)}</h3>
        </div>


        <div className="General-box">
          <p>{t(`Accountpage.text1`)}</p>
        </div>
      </section>
    </>
  );
};

export default Accountcomponets;
