const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Log a search event (fire-and-forget, non-blocking)
 */
export const logSearchEvent = async (data) => {
  try {
    await fetch(`${API_BASE_URL}/api/admin/analytics/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: data.origin,
        destination: data.destination,
        tripType: data.tripType, // "one-way" | "round-trip" | "multi-city"
        travelClass: data.travelClass,
        adults: data.adults ?? 1,
        children: data.children ?? 0,
      }),
    }).catch(() => {}); // Silent fail
  } catch (err) {
    // Silent fail - don't block user flow
  }
};

/**
 * Log a click-out event (fire-and-forget, non-blocking)
 */
export const logClickOutEvent = async (data) => {
  try {
    await fetch(`${API_BASE_URL}/api/admin/analytics/clickout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: data.origin,
        destination: data.destination,
        tripType: data.tripType,
        partner: data.partner,
      }),
    }).catch(() => {}); // Silent fail
  } catch (err) {
    // Silent fail
  }
};
