import { format, parseISO } from "date-fns";

// Helper to convert "HH:mm" to minutes from midnight
export const timeToMinutes = (timeStr) => {
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  } catch {
    return 0;
  }
};

// Helper function to format duration from minutes to "Xh Ym" format
export const formatDurationFromMinutes = (minutes) => {
  if (isNaN(minutes) || minutes <= 0) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
};

// Helper function to format time from ISO date string
export const formatTimeFromISO = (dateTime) => {
  try {
    return format(parseISO(dateTime), "HH:mm");
  } catch {
    return "00:00";
  }
};

// Helper function to format date from ISO date string
export const formatDateFromISO = (dateTime) => {
  try {
    return format(parseISO(dateTime), "eee, dd MMM");
  } catch {
    return "";
  }
};

// Helper function to calculate total price
export const calculateTotalPrice = (priceData) => {
  const base = parseFloat(priceData?.base) || 0;
  const total = parseFloat(priceData?.grandTotal) || base;
  return {
    price: base,
    totalPrice: total,
    currency: priceData?.currency || "USD",
  };
};

// Helper function to get airline logo URL based on carrier code
export const getAirlineLogoUrl = (carrierCode) => {
  if (!carrierCode) {
    return null;
  }
  // Construct the path using the carrier code.
  return `/logos/${carrierCode.toUpperCase()}.png`;
};

// Helper to parse duration from ISO format (PT4H25M) or minutes
export const parseDuration = (duration) => {
  if (typeof duration === "number") return duration;
  if (typeof duration === "string") {
    if (duration.startsWith("PT")) {
      // ISO 8601 format like "PT4H25M"
      const hoursMatch = duration.match(/(\d+)H/);
      const minutesMatch = duration.match(/(\d+)M/);
      const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
      return hours * 60 + minutes;
    }
    return parseInt(duration) || 0;
  }
  return 0;
};