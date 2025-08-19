import { IoSearchOutline } from "react-icons/io5";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "../../combobox";
import { useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";

const city = [
  { id: 1, name: "New York", code: "NYC", state: "NY" },
  { id: 2, name: "Los Angeles", code: "LAX", state: "CA" },
  { id: 3, name: "Chicago", code: "CHI", state: "IL" },
  { id: 4, name: "Houston", code: "HOU", state: "TX" },
  { id: 5, name: "Phoenix", code: "PHX", state: "AZ" },
  { id: 6, name: "Philadelphia", code: "PHL", state: "PA" },
  { id: 7, name: "San Antonio", code: "SAT", state: "TX" },
  { id: 8, name: "San Diego", code: "SAN", state: "CA" },
  { id: 9, name: "Dallas", code: "DFW", state: "TX" },
  { id: 10, name: "Miamis", code: "MIA", state: "FL" },
];

const OneWayForm = () => {
  const [selectedFlyingFrom, setSelectedFlyingFrom] = useState(null);
  const [selectedFlyingTo, setSelectedFlyingTo] = useState(null);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");

  // Mock Data
  const filteredCityFrom =
    queryFrom === ""
      ? city
      : city.filter((city) => {
          return city.name.toLowerCase().includes(queryFrom.toLowerCase());
        });

  // Mock Data
  const filteredCityTo =
    queryTo === ""
      ? city
      : city.filter((city) => {
          return city.name.toLowerCase().includes(queryTo.toLowerCase());
        });

  return (
    <form>
      <fieldset className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:xl:grid-cols-4 tw:2xl:flex tw:items-center tw:gap-4">
        {/* Flying From */}
        <Combobox
          value={selectedFlyingFrom}
          virtual={{ options: filteredCityFrom }}
          onChange={setSelectedFlyingFrom}
          onClose={() => setQueryFrom("")}
        >
          <div className="tw:relative">
            <ComboboxInput
              id="flyingFrom"
              displayValue={(city) => city?.name}
              onChange={(event) => setQueryFrom(event.target.value)}
              className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2"
              placeholder="From"
            />
            <label
              htmlFor="flyingFrom"
              className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-focus:scale-80 tw:peer-focus:translate-x-0.5 tw:peer-focus:-translate-y-1.5 tw:peer-focus:text-secondary tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
            >
              From
            </label>
            <ComboboxOptions className="tw:w-[var(--input-width)] tw:2xl:w-72">
              {({ option: city }) => (
                <ComboboxOption value={city}>
                  <GiCommercialAirplane className="tw:text-secondary" />
                  <span>{city.name}</span>
                </ComboboxOption>
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
        {/* Flying To */}
        <Combobox
          value={selectedFlyingTo}
          virtual={{ options: filteredCityTo }}
          onChange={setSelectedFlyingTo}
          onClose={() => setQueryTo("")}
        >
          <div className="tw:relative">
            <ComboboxInput
              id="flyingTo"
              displayValue={(city) => city?.name}
              onChange={(event) => setQueryTo(event.target.value)}
              className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2"
              placeholder="To"
            />
            <label
              htmlFor="flyingTo"
              className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-focus:scale-80 tw:peer-focus:translate-x-0.5 tw:peer-focus:-translate-y-1.5 tw:peer-focus:text-secondary tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
            >
              To
            </label>
            <ComboboxOptions className="tw:w-[var(--input-width)] tw:2xl:w-72">
              {({ option: city }) => (
                <ComboboxOption value={city}>
                  <GiCommercialAirplane className="tw:text-secondary" />
                  <span>{city.name}</span>
                </ComboboxOption>
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
        {/* Travellers & Cabin Class */}
        <div className="tw:relative tw:grow">
          <input
            type="text"
            id="travellers"
            className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2"
            placeholder="Travellers"
          />
          <label
            htmlFor="travellers"
            className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-focus:scale-80 tw:peer-focus:translate-x-0.5 tw:peer-focus:-translate-y-1.5 tw:peer-focus:text-secondary tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
          >
            Travellers & Cabin Class
          </label>
        </div>
        {/* Depart */}
        <div className="tw:relative">
          <input
            type="text"
            id="depart"
            className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2"
            placeholder="Depart"
          />
          <label
            htmlFor="depart"
            className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-focus:scale-80 tw:peer-focus:translate-x-0.5 tw:peer-focus:-translate-y-1.5 tw:peer-focus:text-secondary tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
          >
            Depart
          </label>
        </div>
        {/* Search Button */}
        <button className="tw:w-full tw:md:!w-fit tw:px-5 tw:h-[62px] tw:2xl:px-0 tw:2xl:!w-[62px] tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:!rounded-lg tw:items-center tw:flex tw:justify-center tw:gap-2">
          <IoSearchOutline size={28} />
          <span className="tw:2xl:hidden tw:text-xl tw:font-medium">
            Search
          </span>
        </button>
      </fieldset>
    </form>
  );
};

export default OneWayForm;
