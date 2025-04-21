import React, { useEffect, useState } from "react";
import { useGet } from "../../utils/ApiMethod";
import { useTranslation } from "react-i18next";

const DropMoreFilters = ({ setIataCode }) => {
  const {t}=useTranslation();
  const [selectedOption, setSelectedOption] = useState("More Filters");
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error, refetch } = useGet(
    "/v1/reference-data/airlines?airlineCodes=AA,DL,UA,BA,QR,EK,AI,6E,SG,EY,PIA,SV,GF,LX,TK,LH,AC,WN,FZ"
  );
  useEffect(() => {
    refetch();
  }, []);

  
  const handleOptionClick = (option, iataCode) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIataCode(iataCode);
  };

  return (
    <>
      <div className="select-station-drop">
        <div onClick={() => setIsOpen(!isOpen)} className="dropdwon-1-list">
          {t(`FlightsInner.${selectedOption}`)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <g clipPath="url(#clip0_170_173)">
              <path
                d="M1.1935 3.50486L5.51988 8.22451L9.84625 3.50486C9.90995 3.43452 9.98577 3.37861 10.0693 3.34036C10.1529 3.30211 10.2426 3.28226 10.3332 3.28196C10.4239 3.28166 10.5137 3.30091 10.5975 3.33861C10.6812 3.37631 10.7574 3.43171 10.8215 3.50163C10.8856 3.57154 10.9363 3.65459 10.9709 3.746C11.0055 3.8374 11.0231 3.93536 11.0228 4.03423C11.0225 4.13311 11.0044 4.23095 10.9693 4.32212C10.9342 4.4133 10.883 4.49601 10.8185 4.5655L6.006 9.8155C5.87707 9.95614 5.70221 10.0352 5.51988 10.0352C5.33754 10.0352 5.16268 9.95614 5.03375 9.8155L0.221249 4.5655C0.0936106 4.42455 0.0222788 4.23424 0.0228301 4.03612C0.0233813 3.838 0.095771 3.64816 0.224191 3.50807C0.352611 3.36797 0.526628 3.289 0.70824 3.2884C0.889852 3.2878 1.06431 3.36561 1.1935 3.50486Z"
                fill="#50ADD8"
              />
            </g>
            <defs>
              <clipPath id="clip0_170_173">
                <rect
                  width="12"
                  height="11"
                  fill="white"
                  transform="translate(0.0198975 12.6602) rotate(-90)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>

        {isOpen && (
          <ul className="options-list">
            {Array.isArray(data?.data) &&
              data?.data?.length > 0 &&
              data?.data?.map((airline, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleOptionClick(airline?.businessName, airline?.iataCode)
                  }
                  className="select-option"
                >
                  {airline?.businessName}
                </li>
              ))}

            {/* <li
              onClick={() => handleOptionClick("Qatar Airways")}
              className="select-option"
            >
              Qatar Airways
            </li>
            <li
              onClick={() => handleOptionClick("Qatar Airways")}
              className="select-option"
            >
              Qatar Airways
            </li>
            <li
              onClick={() => handleOptionClick("Qatar Airways")}
              className="select-option"
            >
              Qatar Airways
            </li> */}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropMoreFilters;
