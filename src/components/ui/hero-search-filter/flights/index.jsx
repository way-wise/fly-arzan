import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaHotel, FaCar } from "react-icons/fa6";
import OneWayFlightForm from "./one-way-form";
import RoundWayFlightForm from "./round-way-form";
import { useState } from "react";
import MultiCityForm from "./multi-city-form";
import { useTranslation } from "react-i18next";
import { Modal } from "../../modal";
import { BsClockHistory } from "react-icons/bs";

const HeroSearchFilter = () => {
  const { t } = useTranslation();
  const [flightType, setFlightType] = useState("oneWay");
  // Control which tab is active so we can block switching
  const [activeTab, setActiveTab] = useState("flights");

  const handleFlightTypeChange = (type) => {
    setFlightType(type);
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={modalOpen} onClose={setModalOpen}>
        <div className="tw:text-center tw:p-8">
          <BsClockHistory className="tw:text-6xl tw:text-secondary tw:mx-auto tw:mb-3" />
          <h3 className="tw:text-lg tw:font-semibold tw:!mb-3">Coming Soon!</h3>
          <p className="tw:text-gray-600">
            This feature is under development and will be available soon.
          </p>
        </div>
      </Modal>
      <div
        className={`tw:bg-cover tw:mt-16 tw:md:mt-[92px] tw:bg-center tw:bg-no-repeat tw:bg-[url(/images/hero_bg.png)] tw:!py-[60px]`}
      >
        <div className="container">
          <div className="hero-tital">
            <h2> {t("upperSection.Cheap_flights_para")}</h2>
            <p> {t("upperSection.Our_search")}</p>
          </div>
          <div className="tw:rounded-xl tw:bg-white tw:shadow-lg">
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                if (v === "flights") return setActiveTab(v);
                setModalOpen(true);
              }}
            >
              <TabsList>
                <TabsTrigger value="flights">
                  <GiCommercialAirplane />
                  <span className="tw:font-semibold">Flights</span>
                </TabsTrigger>
                <TabsTrigger value="hotels">
                  <FaHotel />
                  <span>Hotels</span>
                </TabsTrigger>
                <TabsTrigger value="cars">
                  <FaCar />
                  <span>Cars</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="flights">
                {/* Flight Type Radio Selectors */}
                <div className="tw:flex tw:flex-row tw:gap-3 tw:md:gap-5 tw:md:items-center tw:mb-5 tw:scrollbar-hide tw:overflow-x-auto">
                  <div className="tw:inline-flex tw:items-center tw:gap-1.5 md:tw:gap-2">
                    <input
                      type="radio"
                      name="flightType"
                      id="oneWay"
                      value="oneWay"
                      checked={flightType === "oneWay"}
                      className="tw:peer tw:border-secondary tw:checked:border-dark-purple tw:checked:ring-0 tw:checked:ring-offset-0"
                      onChange={() => handleFlightTypeChange("oneWay")}
                    />
                    <label
                      htmlFor="oneWay"
                      className="tw:whitespace-nowrap tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      One Way
                    </label>
                  </div>
                  <div className="tw:inline-flex tw:items-center tw:gap-1.5 md:tw:gap-2">
                    <input
                      type="radio"
                      name="flightType"
                      id="roundWay"
                      value="roundWay"
                      checked={flightType === "roundWay"}
                      className="tw:peer tw:border-secondary tw:checked:border-dark-purple tw:checked:ring-0 tw:checked:ring-offset-0"
                      onChange={() => handleFlightTypeChange("roundWay")}
                    />
                    <label
                      htmlFor="roundWay"
                      className="tw:whitespace-nowrap tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      Round Way
                    </label>
                  </div>
                  <div className="tw:inline-flex tw:items-center tw:gap-1.5 md:tw:gap-2">
                    <input
                      type="radio"
                      name="flightType"
                      id="multiCity"
                      value="multiCity"
                      checked={flightType === "multiCity"}
                      className="tw:peer tw:border-secondary tw:checked:border-dark-purple tw:checked:ring-0 tw:checked:ring-offset-0"
                      onChange={() => handleFlightTypeChange("multiCity")}
                    />
                    <label
                      htmlFor="multiCity"
                      className="tw:whitespace-nowrap tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      Multi City
                    </label>
                  </div>
                </div>

                {/* Flight Type Forms */}
                {flightType === "oneWay" && <OneWayFlightForm />}
                {flightType === "roundWay" && <RoundWayFlightForm />}
                {flightType === "multiCity" && <MultiCityForm />}
              </TabsContent>
              <TabsContent value="hotels">
                <p className="tw:text-center tw:text-xl tw:text-secondary">
                  Coming Soon
                </p>
              </TabsContent>
              <TabsContent value="cars">
                <p className="tw:text-center tw:text-xl tw:text-secondary">
                  Coming Soon
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSearchFilter;
