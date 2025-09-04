
const FlightSearchPageHeader = ({ initialOneWayFormValues }) => {
  return (
    <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
      {`${initialOneWayFormValues.flyingFrom.name} (${
        initialOneWayFormValues.flyingFrom.iata
      }) - ${initialOneWayFormValues.flyingTo.name} (${
        initialOneWayFormValues.flyingTo.iata
      }) - ${
        initialOneWayFormValues.travellers.adults +
        initialOneWayFormValues.travellers.children
      } Traveller${
        initialOneWayFormValues.travellers.adults +
          initialOneWayFormValues.travellers.children !==
        1
          ? "s"
          : ""
      }, ${
        initialOneWayFormValues.travellers.cabin
          .charAt(0)
          .toUpperCase() +
        initialOneWayFormValues.travellers.cabin
          .slice(1)
          .toUpperCase()
          .split("_")
          .join(" ")
      }`}
    </h1>
  );
};

export default FlightSearchPageHeader;
