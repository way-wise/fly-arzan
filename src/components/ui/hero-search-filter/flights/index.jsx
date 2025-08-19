import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaHotel, FaCar } from "react-icons/fa6";
import OneWayFlightForm from "./one-way-form";
import { useState } from "react";

const HeroSearchFilter = () => {
  const [flightType, setFlightType] = useState("oneWay");

  const handleFlightTypeChange = (type) => {
    setFlightType(type);
  };

  return (
    <div>
      <div
        className={`tw:bg-cover tw:bg-center tw:bg-no-repeat tw:bg-[url(/images/hero_bg.png)] tw:!py-[60px]`}
      >
        <div className="container">
          <div className="tw:rounded-xl tw:bg-white tw:shadow-lg">
            <Tabs defaultValue="flights">
              <TabsList>
                <TabsTrigger value="flights">
                  <GiCommercialAirplane />
                  <span>Flights</span>
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
                <div className="tw:flex tw:gap-5 tw:items-center tw:mb-5">
                  <div className="tw:flex tw:items-center tw:gap-2">
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
                      className="tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      One Way
                    </label>
                  </div>
                  <div className="tw:flex tw:items-center tw:gap-2">
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
                      className="tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      Round Way
                    </label>
                  </div>
                  <div className="tw:flex tw:items-center tw:gap-2">
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
                      className="tw:!mb-0 tw:peer-checked:!text-dark-purple tw:text-secondary tw:font-semibold"
                    >
                      Multi City
                    </label>
                  </div>
                </div>

                {flightType === "oneWay" && <OneWayFlightForm />}
              </TabsContent>
              <TabsContent value="hotels">
                <p>Hotels</p>
              </TabsContent>
              <TabsContent value="cars">
                <p>Cars</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchFilter;
