import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Places1 from "../../assets/Images/Places1.png";
import Places2 from "../../assets/Images/Places2.png";
import Places3 from "../../assets/Images/Places3.png";
import Places4 from "../../assets/Images/Places4.png";
import Places5 from "../../assets/Images/Places5.png";
import Places6 from "../../assets/Images/Places6.png";
import Places7 from "../../assets/Images/Places7.png";
import Places8 from "../../assets/Images/Places8.png";
import Places9 from "../../assets/Images/Places9.png";
import { useTranslation } from "react-i18next";
import { BackendUrl } from "../../baseUrl";
import { useLocationContext } from "../../context/userLocationContext";
import { useGet } from "../../utils/ApiMethod";
import FlightCard from "../Flights_cards/FlightCard";

const cardData = [
  {
    id: 1,
    title: "Coco Palm Dhuni",
    imgSrc: Places1,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 2,
    title: "Si chang island",
    imgSrc: Places2,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 3,
    title: "Montenegro",
    imgSrc: Places3,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },

  {
    id: 4,
    title: "Bali in Indonesia",
    imgSrc: Places4,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 5,
    title: " James Bond island",
    imgSrc: Places5,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 6,
    title: "Phang nga",
    imgSrc: Places6,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 7,
    title: "Chanthaburi",
    imgSrc: Places7,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 8,
    title: "Busan",
    imgSrc: Places8,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  {
    id: 9,
    title: "Lincoln Memorial",
    imgSrc: Places9,
    icon1: "Beaches",
    icon2: "Snorkeling",
    icon3: "Food",
  },
  // Add more cards as needed
];

const HotelsSec2 = forwardRef((props, ref) => {
  const [limit, setLimit] = useState(6);
  const { t } = useTranslation();
  const { userLocation } = useLocationContext();

  const { data, refetch } = useGet(
    userLocation?.country_name
      ? `/hotel?page=1&limit=${limit}&country=${userLocation?.country_name}&city=${userLocation?.city}`
      : null,
    true,
    BackendUrl,
    false
  );
 useEffect(() => {
    refetch();
  }, [limit]);

  return (
    <>
      <section ref={ref} className="Sec2-sec">
        <div className="container">
          <div className="main-Sec2">
            <div className="Sec2-tital">
              <h2>{ t("hotel_section.Discover_Hotel", { country: userLocation?.country_name || '' }) }</h2>
              <p>{t("hotel_section.Explore_hotel_para")}</p>
            </div>
            {Array.isArray(data?.data) && data?.data?.length > 0 ? (
              <FlightCard cardData={data?.data} navigateTo="/HotelsInner" />
            ) : (
              <FlightCard cardData={cardData} navigateTo="/HotelsInner" />
            )}
            {data?.data?.length > 6 && (
              <div className="Sec2-btn-box">
                <button onClick={() => setLimit(limit + 6)}>
                  {" "}
                  {t("buttons.more")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default HotelsSec2;
