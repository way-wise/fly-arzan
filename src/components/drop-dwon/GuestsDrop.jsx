import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const GuestDropdown = ({
  setCabin,
  value,
  setRooms,
  rooms,
  setPersons,
  persons,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Guests and rooms");
  const { t } = useTranslation();
  // ✅ Done button par selected values show karwana
  const handleDone = () => {
    if (persons.adults > 0 && rooms > 0 && persons.childrens > 0) {
      const selection = `${persons.adults} ${t("upperSection.Adults")}, ${
        persons.childrens
      } ${t("upperSection.Children")}, ${rooms} ${t("upperSection.Rooms")}`;
      setSelectedOption(selection);
    }

    setIsOpen(false);
  };

  return (
    <div className="select-station-drop">
      {/* Dropdown Button */}
      <div onClick={() => setIsOpen(!isOpen)} className="dropdwon-1-list">
        {value ? value : t(`hotel_section.${selectedOption}`)}
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
          {/* Adults Counter */}
          <div className="dropdown-section">
            <label>{t("upperSection.Adults")}</label>
            <div className="counter">
              <button
                disabled={persons.adults <= 1}
                onClick={() =>
                  setPersons((prev) => ({
                    ...prev,
                    adults: Math.max(prev.adults - 1, 1),
                  }))
                }
              >
                −
              </button>
              <span>{persons.adults}</span>
              <button
                onClick={() =>
                  setPersons((prev) => ({
                    ...prev,
                    adults: prev.adults + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Children Counter */}
          <div className="dropdown-section">
            <label>{t("upperSection.Children")}</label>
            <div className="counter">
              <button
                disabled={persons.childrens <= 0}
                onClick={() =>
                  setPersons((prev) => ({
                    ...prev,
                    childrens: Math.max(prev.childrens - 1, 0),
                  }))
                }
              >
                −
              </button>
              <span>{persons.childrens}</span>
              <button
                onClick={() =>
                  setPersons((prev) => ({
                    ...prev,
                    childrens: prev.childrens + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Rooms Counter */}
          <div className="dropdown-section">
            <label>{t("upperSection.Rooms")}</label>
            <div className="counter">
              <button disabled={rooms <= 1} onClick={() => setRooms(rooms - 1)}>
                −
              </button>
              <span>{rooms}</span>
              <button onClick={() => setRooms(rooms + 1)}>+</button>
            </div>
          </div>

          {/* ✅ Done Button */}
          <div className="done-btn" onClick={handleDone}>
            {t("upperSection.Done")}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestDropdown;
