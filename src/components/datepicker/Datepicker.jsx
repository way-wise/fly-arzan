import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FlightContext } from "../../context/FlightContext";
import { format } from "date-fns";

const DateSelector = ({ type,isDeparture  }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { setContextData } = useContext(FlightContext);

  useEffect(() => {
    if (formattedDate === null) return;

    setContextData((prevData) => {
      if (type === "One Way") {
        return { ...prevData, departureDate: formattedDate };
      } else if (type === "Return") {
        return {
          ...prevData,
          ...(isDeparture ? { departureDate: formattedDate } : { returnDate: formattedDate }),
        };
      }
      return prevData;
    });
  }, [formattedDate]);


  return (
    <div className="search-date-box">
      {/* Previous Button */}
      <button
        onClick={() => {
          setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 1); // Previous date set karein
            setFormattedDate(format(newDate, "yyyy-MM-dd"));
             
            return newDate;
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M5.55525 11.5245L16.6806 0.399387C16.9379 0.141869 17.2814 0 17.6476 0C18.0139 0 18.3574 0.141869 18.6147 0.399387L19.434 1.21849C19.9671 1.75222 19.9671 2.61969 19.434 3.15262L10.0918 12.4948L19.4444 21.8474C19.7017 22.1049 19.8438 22.4482 19.8438 22.8142C19.8438 23.1807 19.7017 23.524 19.4444 23.7817L18.6251 24.6006C18.3675 24.8581 18.0243 25 17.658 25C17.2917 25 16.9482 24.8581 16.6909 24.6006L5.55525 13.4653C5.29732 13.207 5.15566 12.8621 5.15647 12.4954C5.15566 12.1273 5.29732 11.7826 5.55525 11.5245Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Date Display (Click to Show Calendar) */}
      <p onClick={() => setShowCalendar(!showCalendar)}>
        {selectedDate.toDateString()}
      </p>

      {/* Calendar Component */}
      {showCalendar && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setShowCalendar(false);
            setFormattedDate(format(date, "yyyy-MM-dd"));
          }}
          inline
          minDate={new Date()} // Disables past dates
        />
      )}

      {/* Next Button */}
      <button
        onClick={() => {
          setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 1); // Previous date set karein
            setFormattedDate(format(newDate, "yyyy-MM-dd"))
             
            return newDate;
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M19.4448 11.5245L8.31944 0.399387C8.06212 0.141869 7.71863 0 7.35237 0C6.98611 0 6.64262 0.141869 6.38531 0.399387L5.566 1.21849C5.03288 1.75222 5.03288 2.61969 5.566 3.15262L14.9082 12.4948L5.55564 21.8474C5.29832 22.1049 5.15625 22.4482 5.15625 22.8142C5.15625 23.1807 5.29832 23.524 5.55564 23.7817L6.37494 24.6006C6.63246 24.8581 6.97575 25 7.34201 25C7.70826 25 8.05176 24.8581 8.30907 24.6006L19.4448 13.4653C19.7027 13.207 19.8443 12.8621 19.8435 12.4954C19.8443 12.1273 19.7027 11.7826 19.4448 11.5245Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default DateSelector;
