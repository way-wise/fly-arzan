import React, { useEffect, useState } from "react";
import { HiLanguage } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { useLocationContext } from "../../context/userLocationContext";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useGet } from "../../utils/ApiMethod";
import { CURR_API_KEY } from "../../baseUrl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Translate from "../Translate/Translate";
import getSymbolFromCurrency from "currency-symbol-map";
import { useCurrency } from "../../context/CurrencyContext";

function RegionModal({ setModal }) {
  const { userLocation, setUserLocation } = useLocationContext();
  const { setCurrency, selectedLocalCurr } = useCurrency();
  const selectLocalLang = JSON.parse(localStorage.getItem("selectLang"));

  const selectedLocalCountry = JSON.parse(
    localStorage.getItem("selectCountry")
  );

  const { i18n } = useTranslation();
  const [currencies, setCurrencies] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectCurr, setSelectCurr] = useState({
    curr: selectedLocalCurr?.curr || userLocation?.curr,
    symbol: selectedLocalCurr?.symbol || userLocation?.symbol,
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
  };

  const handleCurr = (curr, symbol) => {
    setSelectCurr({ curr, symbol });
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
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectLang?.label || "English (USA)"}
          </button>

          <div
            className="dropdown-menu drop-down-height"
            aria-labelledby="dropdownMenuButton"
          >
            {allLanguages?.length > 0 ? (
              allLanguages.map((lang) => (
                <button
                  key={lang?.code} // if lang is unique, otherwise use index
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

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectCountry?.country
              ? selectCountry?.country
              : userLocation?.country_name}
          </button>

          <div
            className="dropdown-menu drop-down-height"
            aria-labelledby="dropdownMenuButton"
          >
            {countriesData?.length > 0 ? (
              countriesData.map((country, index) => (
                <p
                  key={index}
                  className="dropdown-item"
                  onClick={() =>
                    handleCountrySelect(
                      country.name.common,
                      country.capital[0],
                      country.cca2,
                      country.currencies
                    )
                  }
                >
                  {country.name.common}
                </p>
              ))
            ) : (
              <p className="dropdown-item">Loading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="currency-region">
        <div className="language-icon">
          <HiCurrencyDollar size={25} />
          <p>Currency</p>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle language-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectCurr?.curr} - {selectCurr?.symbol}
          </button>

          <div
            className="dropdown-menu drop-down-height"
            aria-labelledby="dropdownMenuButton"
          >
            {Object.keys(currencies)?.length > 0 ? (
              Object.keys(currencies).map((curr, index) => (
                <p
                  onClick={() => handleCurr(curr, getSymbolFromCurrency(curr))}
                  key={index}
                  className="dropdown-item"
                >
                  {curr} - {getSymbolFromCurrency(curr)}
                </p>
              ))
            ) : (
              <p>Loading currencies...</p>
            )}
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
      </div>
    </div>
  );
}

export default RegionModal;
