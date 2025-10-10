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

      // Redirect to Trip.com automatically after 3 seconds
      const timer = setTimeout(() => {
        // Optional: fallback if popup blocked
        const forwardUrl = parsedDetails.forwardUrl;

        const newWindow = window.open(
          parsedDetails.forwardUrl,
          "_blank",
          "noopener,noreferrer"
        );

        if (newWindow !== null) {
          window.location.href = forwardUrl;
        }

        window.location.href = "/flight/details";
      }, 3000);

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
                src="/icons/trip.webp"
                alt="Trip.com"
                style={{ width: "120px" }}
              />
            </div>
            <h3>{t("BookYourTicket.Directing_To")}</h3>
            <p>Trip.com</p>
            <div className="loaderBar"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Directing;
