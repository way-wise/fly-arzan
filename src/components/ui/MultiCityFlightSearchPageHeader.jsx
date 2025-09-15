import PropTypes from "prop-types";

// Helper function to format cabin class names nicely
const formatCabinClass = (cabin) => {
  if (!cabin) return "";
  return cabin
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const MultiCityFlightSearchPageHeader = ({ multicityFormValues }) => {
  const { originDestinations, travelers } = multicityFormValues;
  const totalTravellers = travelers?.length || 0;

  // Get cabin class from search criteria
  const cabinClass =
    multicityFormValues.searchCriteria?.flightFilters?.cabinRestrictions?.[0]
      ?.cabin;
  const formattedCabin = formatCabinClass(cabinClass);

  // Create travelers summary like one-way form
  const travellersSummary = `${totalTravellers} Traveller${
    totalTravellers !== 1 ? "s" : ""
  }${formattedCabin ? `, ${formattedCabin}` : ""}`;

  return (
    <div className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
      {/* Flight segments with city names and IATA codes */}
      <div className="tw:flex tw:flex-wrap tw:items-center">
        {originDestinations?.map((segment, index) => {
          const fromCode = segment.originLocationCode;
          const toCode = segment.destinationLocationCode;
          const fromCity = segment.originCity || fromCode;
          const toCity = segment.destinationCity || toCode;
          const date = segment.departureDateTimeRange?.date
            ? new Date(segment.departureDateTimeRange.date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                }
              )
            : "";

          return (
            <span key={index} className="tw:inline-flex tw:items-center">
              {index === 0 ? (
                <span className="tw:inline-block">
                  {fromCity} ({fromCode}) → {toCity} ({toCode}) {date}
                </span>
              ) : (
                <span className="tw:inline-block">
                  → {toCity} ({toCode}) {date}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Travelers summary */}
      <div className="tw:text-[14px] tw:font-normal tw:text-gray-600 tw:mt-2">
        {travellersSummary}
      </div>
    </div>
  );
};

MultiCityFlightSearchPageHeader.propTypes = {
  multicityFormValues: PropTypes.shape({
    originDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        originLocationCode: PropTypes.string,
        destinationLocationCode: PropTypes.string,
        departureDateTimeRange: PropTypes.shape({
          date: PropTypes.string,
        }),
      })
    ),
    travelers: PropTypes.array,
    searchCriteria: PropTypes.shape({
      flightFilters: PropTypes.shape({
        cabinRestrictions: PropTypes.arrayOf(
          PropTypes.shape({
            cabin: PropTypes.string,
          })
        ),
      }),
    }),
  }).isRequired,
};

export default MultiCityFlightSearchPageHeader;
