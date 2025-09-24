import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const RegionalSettingsContext = createContext();

export const useRegionalSettings = () => {
  const context = useContext(RegionalSettingsContext);
  if (!context) {
    throw new Error("useRegionalSettings must be used within RegionalSettingsProvider");
  }
  return context;
};

export const RegionalSettingsProvider = ({ children }) => {
  const [regionalSettings, setRegionalSettings] = useState({
    language: { label: "English (USA)", code: "en-US" },
    country: {
      country: "United States",
      countryCode: "US",
      flag: "https://flagcdn.com/w320/us.png"
    },
    currency: { curr: "USD", symbol: "$" }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize settings from localStorage on app load
  useEffect(() => {
    const existingSettings = localStorage.getItem("regionalSettings");

    if (existingSettings) {
      // Load existing settings
      try {
        const parsed = JSON.parse(existingSettings);
        setRegionalSettings(parsed);
      } catch (error) {
        console.error("Failed to parse regional settings:", error);
        // Keep defaults if parsing fails
      }
    } else {
      // Save default settings to localStorage
      const defaultSettings = {
        language: { label: "English (USA)", code: "en-US" },
        country: {
          country: "United States",
          countryCode: "US",
          flag: "https://flagcdn.com/w320/us.png"
        },
        currency: { curr: "USD", symbol: "$" }
      };
      localStorage.setItem("regionalSettings", JSON.stringify(defaultSettings));
      setRegionalSettings(defaultSettings);
    }

    setIsLoaded(true);
  }, []);

  const updateRegionalSettings = (newSettings) => {
    setRegionalSettings(newSettings);
    localStorage.setItem("regionalSettings", JSON.stringify(newSettings));
  };

  const value = {
    regionalSettings,
    updateRegionalSettings,
    isLoaded
  };

  return (
    <RegionalSettingsContext.Provider value={value}>
      {children}
    </RegionalSettingsContext.Provider>
  );
};

RegionalSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};