// context/LocationContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({});

   

  return (
    <LocationContext.Provider
      value={{ userLocation,setUserLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};
