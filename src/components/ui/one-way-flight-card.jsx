import { useNavigate } from "react-router-dom";
import { RiPlaneLine } from "react-icons/ri";
import {
  getAirlineLogoUrl,
  formatDurationFromMinutes,
} from "@/lib/flight-utils";

const OneWayFlightCard = ({ itinerary }) => {
  const navigate = useNavigate();

  return (
    <div
      key={itinerary.id}
      className="tw:rounded-xl tw:bg-white tw:shadow tw:p-4 tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:justify-between"
    >
      {/* Flight Details Section */}
      <div className="tw:flex tw:flex-col tw:justify-between tw:grow tw:gap-4 tw:px-[30px] tw:mb-8 tw:md:mb-0">
        <div className="tw:flex tw:items-center tw:justify-between tw:flex-col tw:gap-4 tw:md:gap-0 tw:md:flex-row">
          {/* Airline Logo, Code */}
          <div className="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-0.5 tw:text-center">
            {getAirlineLogoUrl(itinerary.airlineCode) ? (
              <img
                src={getAirlineLogoUrl(itinerary.airlineCode)}
                alt={itinerary.flights[0].airline}
                className="tw:w-[120px]"
              />
            ) : (
              <div className="tw:w-[120px] tw:h-[60px] tw:flex tw:items-center tw:justify-center tw:bg-gray-100 tw:rounded">
                <span className="tw:text-sm tw:text-gray-500">
                  {itinerary.airlineCode}
                </span>
              </div>
            )}
            <span className="tw:text-sm tw:text-secondary">
              {itinerary.airlineCode} - {itinerary.flights[0].flightNumber}
            </span>
          </div>

          {/* Time, Stop, Airline */}
          <div className="tw:flex tw:items-center tw:gap-6 tw:grow tw:justify-center">
            {/* Depart */}
            <div className="tw:flex tw:flex-col tw:gap-1 tw:text-right">
              <span className="tw:font-semibold tw:text-[20px]">
                {itinerary.flights[0].departure.time}
              </span>
              <span className="tw:text-sm tw:text-[#5D586C]">
                {itinerary.flights[0].departure.airport}
              </span>
            </div>
            {/* Duration & Stop */}
            <div className="tw:flex tw:items-center tw:gap-2">
              <div className="tw:flex tw:flex-col tw:text-center tw:gap-1">
                <span className="tw:text-sm tw:font-semibold">
                  {formatDurationFromMinutes(itinerary.totalDurationMinutes)}
                </span>
                <span className="tw:h-px tw:w-[82px] tw:bg-secondary" />
                <span className="tw:text-sm tw:text-primary">
                  {(() => {
                    const stops = itinerary.flights.length - 1;
                    if (stops === 0) {
                      return "Direct";
                    }
                    const stopAirports = itinerary.flights
                      .slice(0, stops)
                      .map((flight) => flight.arrival.airport);
                    return (
                      <>
                        {`${stops} Stop${stops > 1 ? "s" : ""}`}{" "}
                        {stopAirports.map((airport, index) => (
                          <strong
                            key={index}
                            className="tw:text-[#5D586C] tw:!font-normal"
                          >
                            {airport}
                            {index < stopAirports.length - 1 ? ", " : ""}
                          </strong>
                        ))}
                      </>
                    );
                  })()}
                </span>
              </div>
              <RiPlaneLine
                size={24}
                className="tw:text-secondary tw:rotate-90"
              />
            </div>
            {/* Arrival */}
            <div className="tw:flex tw:flex-col tw:gap-1 tw:text-left">
              <span className="tw:font-semibold tw:text-[20px]">
                {
                  itinerary.flights[itinerary.flights.length - 1].arrival
                    .time
                }
              </span>
              <span className="tw:text-sm tw:text-[#5D586C]">
                {
                  itinerary.flights[itinerary.flights.length - 1].arrival
                    .airport
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Select Button */}
      <div className="tw:w-full tw:md:w-fit tw:py-4 tw:px-6 tw:bg-[#F2FAFF] tw:rounded-xl tw:flex tw:flex-col tw:items-center tw:gap-3 tw:md:ml-4">
        <button
          onClick={() => navigate("/flight/details")}
          className="tw:w-full tw:md:w-fit tw:bg-primary tw:py-2 tw:px-[30px] tw:flex tw:flex-col tw:!text-white tw:!rounded-full hover:tw:bg-primary/90 tw:transition-colors"
        >
          <span className="tw:text-sm">Select</span>
          <span className="tw:text-xl tw:font-medium">
            ${itinerary.price}
          </span>
        </button>
        <span className="tw:text-sm tw:text-[#939393]">
          ${itinerary.totalPrice} Total
        </span>
      </div>
    </div>
  );
};

export default OneWayFlightCard;