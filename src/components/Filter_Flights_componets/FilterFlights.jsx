import React, { useState } from "react";
import Footer from "../../header-footer/Footer";
import { useLocation } from "react-router-dom";
import Header from "../../header-footer/Header";
import FlightCard from "../Flights_cards/FlightCard";
import { useGet } from "../../utils/ApiMethod";
import { BackendUrl } from "../../baseUrl";

function FilterFlights() {
  const [limit, setLimit] = useState(10);
  //   const title = useLocation();
  const title = {
    state: "Los Angeles",
  };
  const { data, loading, refetch } = useGet(
    `/filter-flight/${title?.state}?page=1&limit=${limit}`,
    true, // fetchOnMount
    BackendUrl,
    false // isFormData
  );
  return (
    <div>
      <Header />
      <div className="container">
        <section className="Sec2-sec flight-filter">
          {/* <div className="main-Sec2"> */}
          <div className="cards-flight">
            {Array.isArray(data?.data) && data?.data?.length > 0 ? (
              <FlightCard cardData={data?.data} />
            ) : (
              <p>There is no data at this time</p>
            )}
            {data?.data?.length > 10 && (
              <div className="Sec2-btn-box">
                <button onClick={() => setLimit(limit + 10)}> More</button>
              </div>
            )}
          </div>
          {/* </div> */}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default FilterFlights;
