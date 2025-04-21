import { createContext, useState } from "react";

// Context banaya
export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [contextHotelData, setContextHotelData] = useState(null);

  return (
    <HotelContext.Provider
      value={{setContextHotelData, contextHotelData}}
    >
      {children}
    </HotelContext.Provider>
  );
};
