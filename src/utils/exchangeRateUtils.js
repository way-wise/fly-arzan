/**
 * Convert USD amount to selected currency using exchange rates
 *
 * @param {number} usdAmount - Amount in USD
 * @param {string} currencyCode - Target currency code (e.g., "BDT", "EUR")
 * @param {Object} rates - Exchange rates object with all rates
 * @returns {number} Converted amount in target currency
 */
export const getExchangeRateFromDollar = (usdAmount, currencyCode, rates) => {
  if (!usdAmount || !rates || !currencyCode) {
    return usdAmount || 0;
  }

  const rate = rates[currencyCode] || 1;
  return usdAmount * rate;
};

/**
 * Format currency with symbol and amount
 *
 * @param {number} amount - Amount to format
 * @param {string} currencySymbol - Currency symbol (e.g., "$", "৳")
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencySymbol = "$", decimals = 2) => {
  return `${currencySymbol}${parseFloat(amount).toFixed(decimals)}`;
};
