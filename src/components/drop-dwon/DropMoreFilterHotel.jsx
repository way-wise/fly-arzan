import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function DropMoreFilterHotel({ setIsOpen, open }) {
  const filterRef = useRef(null); // useRef to track filter panel
  const { t } = useTranslation();

  const [expandedSections, setExpandedSections] = useState({
    FoodAndBeverage: false,
    payments: false,
    accessibility: false,
  });
  const payments = [
    "Pay Now",
    "Pay Later",
    "Partial Payment",
    "Flexiable Payment",
  ];
  const FoodAndBeverage = [
    "complimentaryBreakfast",
    "onSiteRestaurant",
    "barLounge",
    "coffeeShop",
    "miniBar",
  ];
  const accessibility = [
    "wheelchairAccessible",
    "elevatorLift",
    "accessibleParking",
    "hearingVisualAccessibility",
  ];

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (filterRef.current && !filterRef.current.contains(event.target)) {
  //       console.log("Clicked outside, closing filter - Current state:", moreFil);
  //       setIsOpen((prev) => {
  //         if (!prev) return prev; // Avoid unnecessary updates
  //         console.log("Updating state to false");
  //         return false;
  //       });
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [setIsOpen]);

  const handleApply = () => {
    setIsOpen(false);
  };
  const handleToggle = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  return (
    <div
      className="allfilter-main-div"
      ref={filterRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="allfilter-div">
        <h4>{t("HotelsInnerlabel.All_Filters")}</h4>

        <div>
          <h5 onClick={() => handleToggle("FoodAndBeverage")}>
            {t("HotelfilterSections.hotelFilters.FoodAndBeverage.title")}
            <span
              className={`arrow ${
                expandedSections.FoodAndBeverage ? "up" : "down"
              }`}
            >
              {expandedSections.FoodAndBeverage ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </h5>
          {expandedSections.FoodAndBeverage && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.hotelFilters.FoodAndBeverage.options", {
                  returnObjects: true,
                })
              ).map(([key, value]) => (
                <div key={key} className="inp-type">
                  <input type="checkbox" name="sortOption" readOnly />
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h5 onClick={() => handleToggle("payments")}>
            {t("HotelfilterSections.hotelFilters.payments.title")}
            <span
              className={`arrow ${expandedSections.payments ? "up" : "down"}`}
            >
              {expandedSections.payments ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </h5>
          {expandedSections.payments && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.hotelFilters.payments.options", {
                  returnObjects: true,
                })
              ).map(([key, value]) => (
                <div key={key} className="inp-type">
                  <input type="checkbox" name="sortOption" readOnly />
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h5 onClick={() => handleToggle("accessibility")}>
            {t("HotelfilterSections.hotelFilters.accessibility.title")}
            <span
              className={`arrow ${
                expandedSections.accessibility ? "up" : "down"
              }`}
            >
              {" "}
              {expandedSections.accessibility ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </h5>
          {expandedSections.accessibility && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.hotelFilters.accessibility.options", {
                  returnObjects: true,
                })
              ).map(([key, value]) => (
                <div key={key} className="inp-type">
                  <input type="checkbox" name="sortOption" readOnly />
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="action-btns">
        <button onClick={() => setIsOpen(false)} className="clear-btn">
          {t("HotelfilterSections.carFilters.buttons.reset")}
        </button>
        <button onClick={handleApply} className="apply-btn">
          {t("HotelfilterSections.carFilters.buttons.apply")}
        </button>
      </div>
    </div>
  );
}

export default DropMoreFilterHotel;
