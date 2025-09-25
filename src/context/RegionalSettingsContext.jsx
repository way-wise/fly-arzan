import { createContext, useContext, useState, useEffect } from "react";
import { initializeRegionalSettings } from "../utils/locationUtils";
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
      name: "United States",
      countryCode: "US",
      flag: "https://flagcdn.com/w320/us.png"
    },
    currency: { curr: "USD", symbol: "$" },
    location: {
      latitude: null,
      longitude: null,
      timezone: "America/New_York"
    },
    setBy: "fallback"
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLocationDetecting, setIsLocationDetecting] = useState(false);

  // Initialize regional settings with smart IP detection and setBy logic
  useEffect(() => {
    const initializeSettings = async () => {
      try {
        console.log('🚀 Initializing Regional Settings...');
        setIsLocationDetecting(true);

        // This handles the setBy logic internally:
        // - If setBy === "user", uses existing settings
        // - If setBy === "ip" or missing, detects from IP
        const settings = await initializeRegionalSettings();

        setRegionalSettings(settings);
        setIsLocationDetecting(false);
        setIsLoaded(true);

        console.log('✅ Regional Settings initialized successfully');

      } catch (error) {
        console.error('❌ Failed to initialize regional settings:', error);

        // Fallback to defaults on error
        const fallbackSettings = {
          language: { label: "English (USA)", code: "en-US" },
          country: {
            name: "United States",
            countryCode: "US",
            flag: "https://flagcdn.com/w320/us.png"
          },
          currency: { curr: "USD", symbol: "$" },
          location: {
            latitude: null,
            longitude: null,
            timezone: "America/New_York"
          },
          setBy: "error-fallback"
        };

        setRegionalSettings(fallbackSettings);
        localStorage.setItem("regionalSettings", JSON.stringify(fallbackSettings));
        setIsLocationDetecting(false);
        setIsLoaded(true);
      }
    };

    initializeSettings();
  }, []);

  const updateRegionalSettings = (newSettings) => {
    setRegionalSettings(newSettings);
    localStorage.setItem("regionalSettings", JSON.stringify(newSettings));
  };

  const value = {
    regionalSettings,
    updateRegionalSettings,
    isLoaded,
    isLocationDetecting
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