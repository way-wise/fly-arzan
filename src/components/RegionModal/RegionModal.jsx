import { useEffect, useState } from "react";
import { HiLanguage } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { useLocationContext } from "../../context/userLocationContext";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useGet } from "../../utils/ApiMethod";
import { CURR_API_KEY } from "../../baseUrl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import getSymbolFromCurrency from "currency-symbol-map";
import { useCurrency } from "../../context/CurrencyContext";
import PropTypes from "prop-types";

function RegionModal({ setModal }) {
  const { userLocation, setUserLocation } = useLocationContext();
  const { setCurrency, selectedLocalCurr, currency } = useCurrency();
  const selectLocalLang = JSON.parse(localStorage.getItem("selectLang"));

  const selectedLocalCountry = JSON.parse(
    localStorage.getItem("selectCountry")
  );

  const { i18n } = useTranslation();
  const [currencies, setCurrencies] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectCurr, setSelectCurr] = useState({
    curr: selectedLocalCurr?.curr || userLocation?.curr || currency || "",
    symbol:
      selectedLocalCurr?.symbol ||
      userLocation?.symbol ||
      (currency ? getSymbolFromCurrency(currency) : ""),
  });
  const [selectCountry, setSelectCountry] = useState({
    country: selectedLocalCountry?.country || "",
    city: selectedLocalCountry?.city || "",
    countryCode: selectedLocalCountry?.countryCode || "",
  });
  const [selectLang, setSelectLang] = useState({
    label: selectLocalLang?.label || "",
    code: selectLocalLang?.code || "",
  });

  // Local dropdown open states so we don't rely on external bootstrap JS
  const [openLang, setOpenLang] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openCurr, setOpenCurr] = useState(false);

  const allLanguages = [
    { label: "English (UK)", code: "en-GB" },
    { label: "English (USA)", code: "en-US" },
    { label: "Español (Spanish)", code: "es" },
    { label: "中文 (Simplified Chinese)", code: "zh-CN" },
    { label: "中文 (Traditional Chinese)", code: "zh-TW" },
    { label: "Français (French)", code: "fr" },
    { label: "Deutsch (German)", code: "de" },
    { label: "Русский (Russian)", code: "ru" },
    { label: "Português (Portuguese)", code: "pt-PT" },
    { label: "Italiano (Italian)", code: "it" },
    { label: "العربية (Arabic)", code: "ar" },
    { label: "Türkçe (Turkish)", code: "tr" },
    { label: "Nederlands (Dutch)", code: "nl" },
    { label: "한국어 (Korean)", code: "ko-KR" },
    { label: "日本語 (Japanese)", code: "ja-JP" },
    // { label: "हिन्दी (Hindi)", code: "hi" },
    // { label: "اردو (Urdu)", code: "ur" },
    // { label: "فارسی (Persian / Farsi)", code: "fa" },
    { label: "Bahasa Indonesia (Indonesian)", code: "id" },
    // { label: "ไทย (Thai)", code: "th" },
    // { label: "Tiếng Việt (Vietnamese)", code: "vi" },
    { label: "Polski (Polish)", code: "pl" },
    { label: "Ελληνικά (Greek)", code: "el" },
    { label: "Svenska (Swedish)", code: "sv" },
    // { label: "Bahasa Melayu (Malay)", code: "ms" },
  ];

  const { data: countries } = useGet(
    "https://restcountries.com/v3.1/all",
    true,
    "",
    false
  );
  useEffect(() => {
    if (Array.isArray(countries) && countries.length > 0) {
      const sortedCountries = [...countries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountriesData(sortedCountries);
    }
  }, [countries]);
  

  useEffect(() => {
    const CURRENCIES_URL = `https://openexchangerates.org/api/currencies.json?app_id=${CURR_API_KEY}`;

    const getCurrencySymbols = async () => {
      try {
        const response = await axios.get(CURRENCIES_URL);
        const data = response.data;

        setCurrencies(data);
        // Example: { USD: "United States Dollar", EUR: "Euro", ... }
      } catch (error) {
        console.error("Failed to fetch currency symbols:", error.message);
      }
    };

    getCurrencySymbols();
  }, []);

  const handleCountrySelect = (name, city, countryCode, currency) => {
    const currName = Object.keys(currency)[0];
    const isSameCountry =
      name?.toLowerCase() === userLocation?.userCountry?.toLowerCase();
    setSelectCountry({
      country: name,
      city: isSameCountry ? userLocation?.userCity : city,
      countryCode,
    });
    setSelectCurr({ curr: currName, symbol: currency[currName]?.symbol });
  };

  const handleLanguageChange = (lng) => {
    setSelectLang({ label: lng?.label, code: lng?.code });
    setOpenLang(false);
  };

  const handleCurr = (curr, symbol) => {
    setSelectCurr({ curr, symbol });
    setOpenCurr(false);
  };

  const handleSubmit = () => {
    if (selectLang?.code) {
      localStorage.setItem("selectLang", JSON.stringify(selectLang));
      i18n.changeLanguage(selectLang?.code);
      setSelectLang("");
    }

    if (selectCountry?.country) {
      const isSameCountry =
        selectCountry?.country?.toLowerCase() ===
        userLocation?.userCountry?.toLowerCase();

      setUserLocation((prev) => ({
        ...prev,
        country_name: selectCountry?.country,
        city: isSameCountry ? userLocation?.userCity : selectCountry?.city,
        countryCode: selectCountry?.countryCode,
      }));
      localStorage.setItem("selectCountry", JSON.stringify(selectCountry));
      setSelectCountry("");
    }

    if (selectCurr?.curr) {
      setCurrency(selectCurr?.curr);
      localStorage.setItem("selectCurr", JSON.stringify(selectCurr));
      setSelectCurr({ curr: "", symbol: "" });
    }

    // Sab kuch set hone ke baad modal band karo
    setModal(false);
  };

  return (
    <div>
      <div className="region-heading">
        <p>Regional settings</p>
        <button className="" onClick={() => setModal(false)}>
          ✖
        </button>
      </div>
      <div className="language-dropdow">
        <div className="language-icon">
          <HiLanguage size={25} /> <p>Language</p>
        </div>
        <div className="dropdown" style={{ position: "relative" }}>
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            aria-haspopup="true"
            aria-expanded={openLang}
            onClick={() => setOpenLang((v) => !v)}
          >
            {selectLang?.label || "English (USA)"}
          </button>

          {openLang && (
            <div
              className="dropdown-menu show drop-down-height"
              role="menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 9999,
                maxHeight: "240px",
                overflowY: "auto",
              }}
            >
              {allLanguages?.length > 0 ? (
                allLanguages.map((lang) => (
                  <button
                    key={lang?.code}
                    className="dropdown-item"
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {lang?.label}
                  </button>
                ))
              ) : (
                <p className="dropdown-item">Loading...</p>
              )}
            </div>
          )}
        </div>
        {/* <Translate /> */}
      </div>
      <div className="country-region">
        <div className="language-icon">
          <BiWorld size={25} />
          <p>Country / Region</p>
        </div>

        <p>
          Selecting the country you’re in will give you local deals and
          information.
        </p>

        <div className="dropdown" style={{ position: "relative" }}>
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            aria-haspopup="true"
            aria-expanded={openCountry}
            onClick={() => setOpenCountry((v) => !v)}
          >
            {selectCountry?.country
              ? selectCountry?.country
              : userLocation?.country_name}
          </button>

          {openCountry && (
            <div
              className="dropdown-menu show drop-down-height"
              role="menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 9999,
                maxHeight: "240px",
                overflowY: "auto",
              }}
            >
              {countriesData?.length > 0 ? (
                countriesData.map((country, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      handleCountrySelect(
                        country.name.common,
                        country.capital?.[0],
                        country.cca2,
                        country.currencies
                      );
                      setOpenCountry(false);
                    }}
                  >
                    {country.name.common}
                  </button>
                ))
              ) : (
                <p className="dropdown-item">Loading...</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="currency-region" style={{ overflow: "visible" }}>
        <div className="language-icon">
          <HiCurrencyDollar size={25} />
          <p>Currency</p>
        </div>
        <div className="dropdown" style={{ position: "relative" }}>
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            aria-haspopup="true"
            aria-expanded={openCurr}
            onClick={() => setOpenCurr((v) => !v)}
          >
            {(() => {
              const code = selectCurr?.curr || selectedLocalCurr?.curr || userLocation?.curr || currency || "";
              const name = (code && currencies && currencies[code]) ? currencies[code] : "";
              const sym = selectCurr?.symbol || selectedLocalCurr?.symbol || getSymbolFromCurrency(code) || userLocation?.symbol || "";
              if (!code && !sym) return "Select currency";
              return `${code}${name ? ` - ${name}` : sym ? " -" : ""}${sym ? ` (${sym})` : ""}`;
            })()}
          </button>

          {openCurr && (
            <div
              className="dropdown-menu show drop-down-height"
              role="menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 9999,
                maxHeight: "280px",
                overflowY: "auto",
              }}
            >
              {Object.keys(currencies)?.length > 0 ? (
                Object.keys(currencies)
                  .sort((a, b) => a.localeCompare(b))
                  .map((currCode, index) => {
                    const name = currencies[currCode] || currCode;
                    const sym = getSymbolFromCurrency(currCode) || "";
                    return (
                      <button
                        onClick={() => handleCurr(currCode, sym)}
                        key={index}
                        className="dropdown-item"
                      >
                        {`${currCode} - ${name}${sym ? ` (${sym})` : ""}`}
                      </button>
                    );
                  })
              ) : (
                <p>Loading currencies...</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="region-btns">
        <button onClick={handleSubmit} className="save-btn">
          Save
        </button>
        <button onClick={() => setModal(false)} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RegionModal;

RegionModal.propTypes = {
  setModal: PropTypes.func.isRequired,
};
