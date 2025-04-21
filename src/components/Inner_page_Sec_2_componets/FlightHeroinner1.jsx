import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import react-tabs CSS
import Drop1 from "../drop-dwon/Drop1";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateSelector from "../datepicker/Datepicker";
import Tab1 from "../Tab-componet/Tab1";
import { FlightContext } from "../../context/FlightContext";
import { useTranslation } from "react-i18next";

const FlightHeroinner1 = () => {
  const [activeButton, setActiveButton] = useState("One Way");
  const [isClick, setClick] = useState(false);
  const { contextData } = useContext(FlightContext);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const navigate = useNavigate();

  const routetoHotels = () => {
    navigate("/Hotels");
  };

  const routetoCars = () => {
    navigate("/Car");
  };
  const [DepartureDate, setDepartureDate] = useState(null);
  const [ReturnDate, setDateReturnDate] = useState(null);

  const [flightGroups, setFlightGroups] = useState([{ id: 1 }]);

  // Function to add a new flight group
  const addFlightGroup = () => {
    const newGroup = { id: flightGroups.length + 1 };
    setFlightGroups([...flightGroups, newGroup]);
  };

  // Function to delete a specific flight group
  const deleteFlightGroup = (id) => {
    const updatedGroups = flightGroups.filter((group) => group.id !== id);
    setFlightGroups(updatedGroups);
  };
 const { t } = useTranslation();
  const [showFlightBox, setShowFlightBox] = useState(false);
  return (
    <>
      <section className="FlightHeroinner1">
        <div className="container">
          <div className="main-search-faild-box">
            <div className="click-search-btn-box">
              <div className="search-btn-main-box">
              <Tab1 upperHeadingShow={false} />

                {/* <div
                  className="search-btn-box"
                  onClick={() => setShowFlightBox(!showFlightBox)}
                >
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_2402_1167)">
                        <path
                          d="M24.7628 24.3391L18.3082 17.9877C19.9984 16.1513 21.037 13.7226 21.037 11.0501C21.0362 5.33309 16.3273 0.699219 10.5181 0.699219C4.70891 0.699219 0 5.33309 0 11.0501C0 16.7671 4.70891 21.4009 10.5181 21.4009C13.0281 21.4009 15.3301 20.5328 17.1384 19.0894L23.618 25.4659C23.9338 25.777 24.4463 25.777 24.7621 25.4659C25.0785 25.1549 25.0785 24.6501 24.7628 24.3391ZM10.5181 19.8084C5.60289 19.8084 1.61836 15.8872 1.61836 11.0501C1.61836 6.21298 5.60289 2.29176 10.5181 2.29176C15.4333 2.29176 19.4178 6.21298 19.4178 11.0501C19.4178 15.8872 15.4333 19.8084 10.5181 19.8084Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2402_1167">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0 0.699219)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <input type="text" placeholder={t('upperSection.input')} />
                </div>
                {contextData?.type === "One Way" ? (
                  <DateSelector type={contextData?.type} />
                ) : (
                  <>
         
                    <DateSelector type={contextData?.type} isDeparture={true} />

                    {contextData?.type === "Return" && (
                      <DateSelector
                        type={contextData?.type}
                        isDeparture={false}
                      />
                    )}
                  </>
                )} */}
              </div>
            </div>
            {/* {showFlightBox && (
              <>
                <Tab1 upperHeadingShow={false} />
              </>

  
            )}; */}
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightHeroinner1;
