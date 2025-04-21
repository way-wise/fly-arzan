import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { CURR_API_KEY } from "../baseUrl";
import { useLocationContext } from "./userLocationContext";

// Create Context
const CurrencyContext = createContext();

// Provider Component
export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({}); // Rates for different currencies
    const { userLocation, setUserLocation } = useLocationContext();
  
  const selectedLocalCurr = JSON.parse(localStorage.getItem("selectCurr"));
  const [currency, setCurrency] = useState(selectedLocalCurr?.curr ||""); // Default USD rakho
  const BASE_CURRENCY = "USD"; // Base currency
  const BASE_URL = "https://openexchangerates.org/api/latest.json";
  useEffect(() => {
    if (userLocation?.curr) {
      setCurrency(userLocation.curr); // Jab API call complete ho jaye, tab currency update karo
    }
  }, [userLocation]);
  

  // Fetch rates whenever component mounts
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            app_id: CURR_API_KEY,
            base: BASE_CURRENCY, // Yeh Open Exchange Rates mein paid plan mein hota hai
          },
        });
        const data = response.data.rates;
        setRates(data);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error.message);
      }
    };

    fetchRates();
  }, [currency]);

  // Convert Function
  const convertPrice = (amount, targetCurrency = currency) => {
    if (!rates[targetCurrency]) {
      console.warn(`Rate for ${targetCurrency} not found.`);
      return amount;
    }
    
    const rate = rates[targetCurrency];
    const converted = amount * rate;

    return converted.toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        convertPrice,
        selectedLocalCurr,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom Hook for easier use
export const useCurrency = () => useContext(CurrencyContext);
