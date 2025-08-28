import React from "react";
import { useTranslation } from "react-i18next";

const Airportcomponet = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="PrivacyPolicysec1-sec top-margin">
        <div className="container">
          <div className="PrivacyPolicysec1-main">
            <div className="PrivacyPolicysec1-tital">
              <h2>Nearest Airport Details</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Airportcomponet;
