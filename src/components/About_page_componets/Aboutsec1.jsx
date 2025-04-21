import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useTranslation } from "react-i18next";


const Aboutsec1 = () => {
  const tasks = [
    { task: "Flight Booking", percentage: 90 },
    { task: "Hotel Booking", percentage: 70 },
    { task: "Rent Car Booking", percentage: 85 },
  ];
  const { t } = useTranslation();
  return (
    <>
      <section className="Aboutsec1-sec">
        <div className="container">
          <div className="Aboutsec1-main">
            <div className="Aboutsec1-tital">
              <h2>{ t(`AboutUs.Who_We_Are`)}</h2>
              <p>
              { t(`AboutUs.text1`)}
              </p>
              <p>
              { t(`AboutUs.text2`)}
              </p>

              <p>
              { t(`AboutUs.text3`)}
              </p>

              <p>
              { t(`AboutUs.text4`)}
              </p>

              <p>
              { t(`AboutUs.text5`)}
              </p>
            </div>
            <div className="Aboutsec1-bar-box">
              {tasks.map((item, index) => (
                <div className="Aboutsec1-bar-card" key={index}>
                  <ProgressBar task={item.task} percentage={item.percentage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutsec1;
