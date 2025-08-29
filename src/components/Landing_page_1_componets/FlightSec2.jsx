import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Places1 from "../../assets/Images/Places1.png";
import Places2 from "../../assets/Images/Places2.png";
import Places3 from "../../assets/Images/Places3.png";
import Places4 from "../../assets/Images/Places4.png";
import Places5 from "../../assets/Images/Places5.png";
import Places6 from "../../assets/Images/Places6.png";
import Places7 from "../../assets/Images/Places7.png";
import Places8 from "../../assets/Images/Places8.png";
import Places9 from "../../assets/Images/Places9.png";
import { FlightContext } from "../../context/FlightContext";
import { useLocationContext } from "../../context/userLocationContext";
import { useGet } from "../../utils/ApiMethod";
import { BackendUrl } from "../../baseUrl";
import FlightCard from "../Flights_cards/FlightCard";
import { useTranslation } from "react-i18next";
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

const FlightSec2 = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userLocation } = useLocationContext();
  const [flightData, setFlightData] = useState([]);
  const [limit, setLimit] = useState(6);

  const { data, refetch } = useGet(
    userLocation?.country_name
      ? `/flight?page=1&limit=${limit}&country=${userLocation?.country_name}&city=${userLocation?.city}`
      : null,
    true,
    BackendUrl,
    false
  );

  useEffect(() => {
    if (data?.data?.length > 0) {
      setFlightData(data?.data);
    } else {
      setFlightData([]);
    }
  }, [data, userLocation]);
  useEffect(() => {
    refetch();
  }, [limit]);

  return (
    <>
      <section ref={ref} id="flight-main-deals" className="Sec2-sec">
        <div className="container">
          <div className="main-Sec2">
            {userLocation?.country_name ? (
              <div className="Sec2-tital">
                <h2>
                  {t("flightFaqSection.flightCard.FlightDealsFrom", {
                    country: userLocation?.country_name || "",
                  })}
                </h2>
                {/* <p>
                Discover the best flight deals from France at the lowest prices.
                These offers are available for a limited time, so you can
                explore them at your own pace!
              </p> */}
                <p>
                  {t("flightFaqSection.flightCard.Discover_flight_deals")}{" "}
                  {userLocation?.country_name}{" "}
                  {t("flightFaqSection.flightCard.at_the_lowest_prices")}
                </p>
              </div>
            ) : (
              <div className="Sec2-tital">
                <h2>{t("flightFaqSection.flightCard.PlacesLike")}</h2>
                {/* <p>
              Discover the best flight deals from France at the lowest prices.
              These offers are available for a limited time, so you can
              explore them at your own pace!
            </p> */}
                <p>{t("flightFaqSection.flightCard.PlacesLikePara")}</p>
              </div>
            )}

            {Array.isArray(flightData) && flightData?.length > 0 ? (
              <FlightCard cardData={flightData} navigateTo="/search/flight" />
            ) : (
              <FlightCard cardData={cardData} navigateTo="/search/flight" />
            )}
            {flightData?.length > 6 && (
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

export default FlightSec2;
