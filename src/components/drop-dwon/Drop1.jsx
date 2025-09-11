import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Drop1 = ({ setCabin, value, persons, setPersons }) => {
  const { t, i18n } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("Cabin_Class_Adults");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option, value) => {
    setSelectedOption(option);
    setCabin(value);
    setIsOpen(false);
  };

  const incrementAdults = () => {
    setPersons((prev) => ({
      ...prev,
      adults: (prev.adults || 0) + 1,
    }));
  };

  const decrementAdults = () => {
    setPersons((prev) => ({
      ...prev,
      adults: Math.max((prev.adults || 1) - 1, 1),
    }));
  };

  const incrementChildren = () => {
    setPersons((prev) => ({
      ...prev,
      childrens: (prev.childrens || 0) + 1,
    }));
  };

  const decrementChildren = () => {
    setPersons((prev) => ({
      ...prev,
      childrens: Math.max((prev.childrens || 0) - 1, 0),
    }));
  };

  return (
    <div className="select-station-drop">
      {/* Dropdown Button */}
      <div onClick={() => setIsOpen(!isOpen)} className="dropdwon-1-list">
        {value
          ? t(`upperSection.${value}`)
          : t(`upperSection.${selectedOption.toUpperCase()}`)}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2.05621 3.70333L7.95581 9.6029L13.8554 3.70333..."
            fill="#272727"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="options-box">
          {/* Cabin Class Selection */}
          <div className="dropdown-section">
            <label>{t("upperSection.cabinClass")}</label>
            <select
              value={selectedOption}
              onChange={(e) =>
                handleOptionClick(e.target.value, e.target.value.toUpperCase())
              }
            >
              <option value="ECONOMY">{t("upperSection.ECONOMY")}</option>
              <option value="PREMIUM_ECONOMY">
                {t("upperSection.PREMIUM_ECONOMY")}
              </option>
              <option value="BUSINESS">{t("upperSection.BUSINESS")}</option>
              <option value="FIRST">{t("upperSection.FIRST")}</option>
            </select>
          </div>

          {/* Adults Counter */}
          <div className="dropdown-section">
            <label>{t("upperSection.Adults")}</label>
            <div className="counter">
              <button disabled={persons?.adults <= 1} onClick={decrementAdults}>
                −
              </button>
              <span>{persons?.adults || 1}</span>
              <button onClick={incrementAdults}>+</button>
              <span>{t("upperSection.Aged18")}</span>
            </div>
          </div>

          {/* Children Counter */}
          <div className="dropdown-section">
            <label>{t("upperSection.Children")}</label>
            <div className="counter">
              <button
                disabled={(persons?.childrens || 0) <= 0}
                onClick={decrementChildren}
              >
                −
              </button>
              <span>{persons?.childrens || 0}</span>
              <button onClick={incrementChildren}>+</button>
              <span>{t("upperSection.Aged17")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drop1;
