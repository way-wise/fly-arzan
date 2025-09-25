/**
 * Clean IP-based location detection using ipapi.co
 */

/**
 * Currency code to symbol mapping
 */
const CURRENCY_SYMBOLS = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥',
  'CNY': '¥',
  'INR': '₹',
  'AUD': 'A$',
  'CAD': 'C$',
  'NZD': 'NZ$',
  'CHF': 'CHF',
  'SEK': 'kr',
  'NOK': 'kr',
  'DKK': 'kr',
  'PLN': 'zł',
  'TRY': '₺',
  'RUB': '₽',
  'BRL': 'R$',
  'MXN': '$',
  'ARS': '$',
  'KRW': '₩',
  'SGD': 'S$',
  'MYR': 'RM',
  'THB': '฿',
  'IDR': 'Rp',
  'PHP': '₱',
  'VND': '₫',
  'AED': 'د.إ',
  'SAR': '﷼',
  'ZAR': 'R',
  'EGP': '£',
  'ILS': '₪',
  'BDT': '৳',
  'PKR': '₨',
  'LKR': '₨',
  'NPR': '₨',
  'MMK': 'Ks',
  'KHR': '៛',
  'LAK': '₭'
};

/**
 * Country code to language mapping
 */
const COUNTRY_TO_LANGUAGE = {
  'US': { label: 'English (USA)', code: 'en-US' },
  'CA': { label: 'English (USA)', code: 'en-US' },
  'GB': { label: 'English (UK)', code: 'en-GB' },
  'AU': { label: 'English (USA)', code: 'en-US' },
  'NZ': { label: 'English (USA)', code: 'en-US' },
  'IE': { label: 'English (UK)', code: 'en-GB' },
  'DE': { label: 'Deutsch (German)', code: 'de' },
  'FR': { label: 'Français (French)', code: 'fr' },
  'ES': { label: 'Español (Spanish)', code: 'es' },
  'IT': { label: 'Italiano (Italian)', code: 'it' },
  'NL': { label: 'Nederlands (Dutch)', code: 'nl' },
  'PT': { label: 'Português (Portuguese)', code: 'pt-PT' },
  'RU': { label: 'Русский (Russian)', code: 'ru' },
  'CN': { label: '中文 (Simplified Chinese)', code: 'zh-CN' },
  'TW': { label: '中文 (Traditional Chinese)', code: 'zh-TW' },
  'JP': { label: '日本語 (Japanese)', code: 'ja-JP' },
  'KR': { label: '한국어 (Korean)', code: 'ko-KR' },
  'IN': { label: 'English (USA)', code: 'en-US' },
  'BD': { label: 'English (USA)', code: 'en-US' },
  'PH': { label: 'English (USA)', code: 'en-US' },
  'SG': { label: 'English (USA)', code: 'en-US' },
  'MY': { label: 'English (USA)', code: 'en-US' },
  'ID': { label: 'Bahasa Indonesia (Indonesian)', code: 'id' },
  'TH': { label: 'English (USA)', code: 'en-US' },
  'VN': { label: 'English (USA)', code: 'en-US' },
  'TR': { label: 'Türkçe (Turkish)', code: 'tr' },
  'PL': { label: 'Polski (Polish)', code: 'pl' },
  'SE': { label: 'Svenska (Swedish)', code: 'sv' },
  'NO': { label: 'English (USA)', code: 'en-US' },
  'DK': { label: 'English (USA)', code: 'en-US' },
  'AR': { label: 'Español (Spanish)', code: 'es' },
  'BR': { label: 'Português (Portuguese)', code: 'pt-PT' },
  'MX': { label: 'Español (Spanish)', code: 'es' },
  'AE': { label: 'العربية (Arabic)', code: 'ar' },
  'SA': { label: 'العربية (Arabic)', code: 'ar' },
  'EG': { label: 'العربية (Arabic)', code: 'ar' },
  'GR': { label: 'Ελληνικά (Greek)', code: 'el' },
  'PK': { label: 'English (USA)', code: 'en-US' },
  'LK': { label: 'English (USA)', code: 'en-US' },
  'NP': { label: 'English (USA)', code: 'en-US' },
  'MM': { label: 'English (USA)', code: 'en-US' },
  'KH': { label: 'English (USA)', code: 'en-US' },
  'LA': { label: 'English (USA)', code: 'en-US' }
};

/**
 * Get user's location data from IP using ip-api.com (free, no CORS issues)
 */
export async function getUserLocationFromIP() {
  try {
    console.log('🌍 Detecting location from IP using ip-api.com...');

    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,currency');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const locationData = await response.json();
    console.log('✅ Raw IP API response:', locationData);

    // Validate response
    if (locationData.status === 'fail') {
      throw new Error(locationData.message || 'IP API error');
    }

    return locationData;

  } catch (error) {
    console.warn('❌ IP location detection failed:', error.message);
    throw error;
  }
}

/**
 * Map ip-api.com response to regionalSettings format
 */
export function mapLocationToRegionalSettings(locationData) {
  const countryCode = locationData.countryCode || 'US';

  // Get currency symbol from mapping, fallback to currency code
  const currencySymbol = CURRENCY_SYMBOLS[locationData.currency] || locationData.currency || '$';

  // Get language from mapping, fallback to English (USA)
  const language = COUNTRY_TO_LANGUAGE[countryCode] || { label: 'English (USA)', code: 'en-US' };

  // Build regional settings
  const regionalSettings = {
    language,
    country: {
      name: locationData.country || 'United States',
      countryCode: countryCode,
      flag: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
    },
    currency: {
      curr: locationData.currency || 'USD',
      symbol: currencySymbol
    },
    location: {
      latitude: locationData.lat || null,
      longitude: locationData.lon || null,
      timezone: locationData.timezone || 'America/New_York'
    },
    setBy: 'ip',
    detectedAt: new Date().toISOString()
  };

  console.log('🎯 Mapped regional settings:', regionalSettings);
  return regionalSettings;
}

/**
 * Get fallback regional settings (US defaults)
 */
export function getFallbackRegionalSettings() {
  return {
    language: { label: 'English (USA)', code: 'en-US' },
    country: {
      name: 'United States',
      countryCode: 'US',
      flag: 'https://flagcdn.com/w320/us.png'
    },
    currency: {
      curr: 'USD',
      symbol: '$'
    },
    location: {
      latitude: null,
      longitude: null,
      timezone: 'America/New_York'
    },
    setBy: 'fallback',
    detectedAt: new Date().toISOString()
  };
}

/**
 * Detect and build regional settings from IP
 */
export async function detectAndBuildRegionalSettings() {
  try {
    console.log('🚀 Starting IP-based regional settings detection...');

    // Get location data from IP
    const locationData = await getUserLocationFromIP();

    // Map to regional settings format
    const regionalSettings = mapLocationToRegionalSettings(locationData);

    // Save to localStorage
    localStorage.setItem('regionalSettings', JSON.stringify(regionalSettings));
    console.log('✅ Regional settings saved to localStorage');

    return regionalSettings;

  } catch (error) {
    console.error('❌ Failed to detect regional settings from IP:', error);

    // Return and save fallback settings
    const fallbackSettings = getFallbackRegionalSettings();
    localStorage.setItem('regionalSettings', JSON.stringify(fallbackSettings));
    console.log('⚠️ Using fallback regional settings');

    return fallbackSettings;
  }
}

/**
 * Initialize regional settings with smart setBy logic
 */
export async function initializeRegionalSettings() {
  try {
    // Check if we already have regional settings
    const existingSettings = localStorage.getItem('regionalSettings');

    if (existingSettings) {
      const parsed = JSON.parse(existingSettings);

      // Check setBy flag
      if (parsed.setBy === 'user') {
        console.log('✅ User has set preferences - using existing settings');
        return parsed;
      } else {
        console.log('🔄 Settings were set by IP - refreshing from current location');
        return await detectAndBuildRegionalSettings();
      }
    } else {
      console.log('🆕 No existing settings found - detecting from IP');
      return await detectAndBuildRegionalSettings();
    }

  } catch (error) {
    console.error('Failed to initialize regional settings:', error);
    return getFallbackRegionalSettings();
  }
}