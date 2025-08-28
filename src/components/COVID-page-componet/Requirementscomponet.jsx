import React from "react";
import { useTranslation } from "react-i18next";

const Requirementscomponet = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="PrivacyPolicysec1-sec top-margin">
        <div className="container">
          <div className="PrivacyPolicysec1-main">
            <div className="PrivacyPolicysec1-tital">
              <h2>Visa Requirements</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Requirementscomponet;
