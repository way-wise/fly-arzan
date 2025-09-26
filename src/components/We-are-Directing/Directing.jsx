import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Directing = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Get flight details from session storage
    const selectedFlightDetails = sessionStorage.getItem(
      "selected-flight-details"
    );
    if (selectedFlightDetails) {
      const parsedDetails = JSON.parse(selectedFlightDetails);

      // Redirect to Trip.com after 5 seconds
      const timer = setTimeout(() => {
        if (parsedDetails.forwardUrl) {
          window.open(parsedDetails.forwardUrl, "_blank");
          // Optionally navigate back or to another page
          window.history.back();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <section className="Directing top-margin">
        <div className="container">
          <div className="Directing-main">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src="/icons/trip.png"
                alt="Trip.com"
                style={{ width: "120px", marginBottom: "10px" }}
              />
            </div>
            <h2>{t("BookYourTicket.Directing_To")}</h2>
            <p>Trip.com</p>
            <div className="loaderBar"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Directing;
