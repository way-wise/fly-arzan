import { IoSearchOutline } from "react-icons/io5";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@/components/ui/combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";

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

  // Travellers & Cabin Class state
  const [travellers, setTravellers] = useState({
    cabin: "economy",
    adults: 1,
    children: 0,
  });
  const [travellersOpen, setTravellersOpen] = useState(false);
  const [travellersApplied, setTravellersApplied] = useState(false);

  const totalTravellers = travellers.adults + travellers.children;
  const cabinLabelMap = {
    economy: "Economy",
    premium_economy: "Premium Economy",
    business: "Business",
    first_class: "First Class",
  };
  const travellersSummary = `${totalTravellers} Traveller${
    totalTravellers !== 1 ? "s" : ""
  }, ${cabinLabelMap[travellers.cabin]}`;

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
              className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0"
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
              className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0"
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
        <Popover open={travellersOpen} onOpenChange={setTravellersOpen}>
          <PopoverTrigger asChild>
            <div className="tw:relative tw:grow">
              <input
                type="text"
                id="travellers"
                className="tw:peer tw:py-[10px] tw:ps-5 tw:pe-16 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                placeholder="Travellers"
                value={travellersApplied ? travellersSummary : ""}
                readOnly
              />
              <label
                htmlFor="travellers"
                className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
              >
                Travellers & Cabin Class
              </label>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            {/* Cabin Selection */}
            <div className="tw:flex tw:flex-col tw:mb-3">
              <label htmlFor="cabin" className="tw:font-medium">
                Cabin Class
              </label>
              <Select
                value={travellers.cabin}
                onValueChange={(value) =>
                  setTravellers((prev) => ({ ...prev, cabin: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Cabin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium_economy">
                    Premium Economy
                  </SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first_class">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Adult Travellers */}
            <div className="tw:flex tw:flex-col tw:mb-3">
              <label htmlFor="adults" className="tw:font-medium">
                Adults (Age 18+)
              </label>
              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border tw:border-muted tw:!rounded-md tw:p-2">
                <button
                  type="button"
                  onClick={() =>
                    setTravellers((prev) => ({
                      ...prev,
                      adults: Math.max(1, prev.adults - 1),
                    }))
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Minus />
                </button>
                <span className="tw:text-lg">{travellers.adults}</span>
                <button
                  type="button"
                  onClick={() =>
                    setTravellers((prev) => ({
                      ...prev,
                      adults: Math.min(9, prev.adults + 1),
                    }))
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* Children Travellers */}
            <div className="tw:flex tw:flex-col tw:mb-3">
              <label htmlFor="children" className="tw:font-medium">
                Children (Age 0-17)
              </label>
              <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border tw:border-muted tw:!rounded-md tw:p-2">
                <button
                  type="button"
                  onClick={() =>
                    setTravellers((prev) => ({
                      ...prev,
                      children: Math.max(0, prev.children - 1),
                    }))
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Minus />
                </button>
                <span className="tw:text-lg">{travellers.children}</span>
                <button
                  type="button"
                  onClick={() =>
                    setTravellers((prev) => ({
                      ...prev,
                      children: Math.min(9, prev.children + 1),
                    }))
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* Apply & Reset Button */}
            <div className="tw:flex tw:items-center tw:flex-wrap tw:lg:flex-nowrap tw:gap-2">
              <button
                type="button"
                onClick={() => {
                  setTravellers({ cabin: "economy", adults: 1, children: 0 });
                  setTravellersApplied(false);
                  setTravellersOpen(false);
                }}
                className="tw:px-3 tw:py-2 tw:w-full tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100 tw:font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setTravellersApplied(true);
                  setTravellersOpen(false);
                }}
                className="tw:px-3 tw:py-2 tw:w-full tw:flex tw:items-center tw:justify-center tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:transition tw:!rounded tw:duration-100 tw:font-medium"
              >
                Apply
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Depart */}
        <div className="tw:relative">
          <input
            type="text"
            id="depart"
            className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0"
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
