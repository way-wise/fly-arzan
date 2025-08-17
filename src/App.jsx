import Routes from "./Routes/Routes";
import Scroll from "./ScrollToTop/Scroll";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FlightProvider } from "./context/FlightContext";
import { HotelProvider } from "./context/HotelContext";
import { CarProvider } from "./context/CarContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useLocationContext } from "./context/userLocationContext";
import { useGet } from "./utils/ApiMethod";
import { LOCATION_API_KEY } from "./baseUrl";
import getSymbolFromCurrency from "currency-symbol-map";

function App() {
  const { setUserLocation } = useLocationContext();
  const selectedLocalCoun = JSON.parse(localStorage.getItem("selectCountry"));

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://api.ipapi.com/api/check?access_key=${LOCATION_API_KEY}`
        );
        const data = await response.json();

        setUserLocation({
          country_name: selectedLocalCoun?.country
            ? selectedLocalCoun?.country
            : data?.country_name, // <<<<< actual user country ,
          city: selectedLocalCoun?.city ? selectedLocalCoun?.city : data?.city,
          userCountry: data?.country_name,
          userCity: data?.city,
          curr: data?.currency?.code,
          symbol: getSymbolFromCurrency(data?.currency?.code),
        });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <BrowserRouter>
      <Scroll />

      <Routes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
