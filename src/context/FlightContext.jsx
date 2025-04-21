import { createContext, useState } from "react";

// Context banaya
export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [contextData, setContextData] = useState(null);
  const [FlightBookingData, setFlightBookingData] = useState({
    airline: "",
    cityMap: {},
    departureCountry: "",
    traveller: 1,
    type: "",
    cabin: "",
    price: "",
    currency: "",
    carrierCode: "",
    itineraries: [],
  });

  return (
    <FlightContext.Provider
      value={{
        contextData,
        setContextData,
        FlightBookingData,
        setFlightBookingData,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
