import React, { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGet } from "../../utils/ApiMethod";
import { BackendUrl } from "../../baseUrl";
import { useEffect } from "react";
import { useRegionalSettings } from "../../context/RegionalSettingsContext";

const CarsSec4 = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState("Top Car Hire Providers");
  const { regionalSettings } = useRegionalSettings();
  const selectLocalLang = JSON.parse(localStorage.getItem("selectLang"));

  // Fetch data when activeTab changes
  const endpoint = regionalSettings?.country?.name
    ? `/category-hotel/${activeTab}/${regionalSettings.country.name}`
    : null;

  const { data, loading, refetch } = useGet(
    endpoint,
    true, // fetchOnMount
    BackendUrl,
    false // isFormData
  );

  // Tab data
  const tabs = {
    "Top Car Hire Providers": [
      "Europe car hire",
      "Drivalia car hire",
      "Green Motion car hire",
      "Sixt car hire",
      "Keddy By Europe car hire",
      "Alamo car hire",
      "Avis car hire",
      "Hertz car hire",
    ],
    "Top Car Hite Locations": [
      "Drivalia car hire",
      "Green Motion car hire",
      "Sixt car hire",
      "Keddy By Europe car hire",
      "Alamo car hire",
    ],
    "Flexible Car Hire Plans": [
      "Drivalia car hire",
      "Green Motion car hire",
      "Sixt car hire",
      "Keddy By Europe car hire",
      "Alamo car hire",
      "Drivalia car hire",
      "Green Motion car hire",
      "Sixt car hire",
      "Keddy By Europe car hire",
      "Alamo car hire",
    ],
  };

  const tabNames = [
    "Top Car Hire Providers",
    "Top Car Hite Locations",
    "Flexible Car Hire Plans",
  ];
  useEffect(() => {
    refetch();
  }, [activeTab, regionalSettings]);
  const { t } = useTranslation();
  // Update active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section ref={ref} className="Sec4-sec" id="begin-Journey">
      <div className="container">
        <div className="Sec4-sec--main">
          <div className="Sec4-sec--title">
            <h2> {t(`carsection.Begin_your`)}</h2>
          </div>
          {/* Tab Buttons */}
          <div className="Sec4-tabs">
            {tabNames.map((tabName) => (
              <button
                key={tabName}
                className={`tab-button ${
                  activeTab === tabName ? "active" : ""
                }`}
                onClick={() => handleTabClick(tabName)}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <ul className="tab-content">
            {loading ? (
              <li>Loading...</li>
            ) : data?.data?.length > 0 ? (
              data.data.map((item) => (
                <li onClick={() => handleNavigate(item.title)} key={item._id}>
                  {item?.title_Translation
                    ? item?.title_Translation[selectLocalLang?.code || "en-US"]
                    : item.title}
                </li>
              ))
            ) : (
              <li>No Data found.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default CarsSec4;
