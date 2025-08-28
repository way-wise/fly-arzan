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
import Calendar from "../../calendar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, number, object, date } from "yup";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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

const RoundWayForm = () => {
  const navigate = useNavigate();
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped((prevValue) => !prevValue);
  };

  const RoundWayFormSchema = object({
    flyingFrom: object()
      .shape({
        id: number().required(),
        name: string().required(),
        code: string().required(),
        state: string().required(),
      })
      .required("Flying From is required"),
    flyingTo: object()
      .shape({
        id: number().required(),
        name: string().required(),
        code: string().required(),
        state: string().required(),
      })
      .required("Flying To is required"),
    travellers: object({
      cabin: string().required("Cabin is required"),
      adults: number().required("Adults is required"),
      children: number().required("Children is required"),
    }),
    depart: date().required("Depart date is required"),
    arrival: date().required("Arrival date is required"),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(RoundWayFormSchema),
    defaultValues: {
      flyingFrom: null,
      flyingTo: null,
      travellers: {
        cabin: "economy",
        adults: 1,
        children: 0,
      },
      depart: "",
      arrival: "",
    },
  });

  // Watch form values
  const formValues = watch();
  const { flyingFrom, flyingTo, travellers, depart, arrival } = formValues;

  // Travellers & Cabin Class state
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

  // Depart Date state
  const [departDateOpen, setDepartDateOpen] = useState(false);

  // Arrival Date state
  const [arrivalDateOpen, setArrivalDateOpen] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
    navigate("/search/flight");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <fieldset className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:xl:grid-cols-5 tw:2xl:flex tw:items-center tw:gap-4">
        <div className="tw:flex tw:flex-col tw:sm:flex-row tw:gap-4 tw:relative tw:grow tw:sm:col-span-2">
          {/* Flying From */}
          <Combobox
            value={flyingFrom}
            virtual={{ options: filteredCityFrom }}
            onChange={(value) => setValue("flyingFrom", value)}
            onClose={() => setQueryFrom("")}
          >
            <div
              className={cn(
                "tw:relative tw:z-40 tw:grow",
                isSwapped ? "tw:order-2" : "tw:order-1"
              )}
            >
              <ComboboxInput
                id="flyingFrom"
                displayValue={(city) => city?.name || ""}
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
          <button
            type="button"
            onClick={handleSwap}
            className="tw:absolute tw:z-50 tw:top-[45px] tw:sm:top-[50%] tw:left-1/2 tw:-translate-x-1/2 tw:bg-white tw:sm:-translate-y-1/2 tw:h-[50px] tw:w-[50px] tw:inline-flex tw:items-center tw:justify-center tw:border tw:!border-muted tw:!rounded-full"
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.46039 7.34263C3.69297 7.57559 4.07227 7.57559 4.30485 7.34263L5.07727 6.57021C5.31023 6.33763 5.31023 5.95833 5.07727 5.72574L4.30485 4.95333H14.9332C15.9214 4.95333 16.7251 5.7571 16.7251 6.74531C16.7251 7.23922 17.1272 7.64129 17.6211 7.64129H18.2184C18.7124 7.64129 19.1144 7.23922 19.1144 6.74531C19.1144 4.43963 17.2388 2.56402 14.9332 2.56402H4.30485L5.07727 1.79161C5.31023 1.55902 5.31023 1.17972 5.07727 0.947135L4.30485 0.174718C4.07227 -0.0582393 3.69297 -0.0582393 3.46039 0.174718L0.0873589 3.54737C-0.0291196 3.66422 -0.0291196 3.85313 0.0873589 3.96998L3.46039 7.34263Z"
                fill="#353978"
              />
              <path
                d="M15.6541 10.3299C15.4215 10.097 15.0425 10.097 14.8096 10.3299L14.0372 11.1023C13.8038 11.3357 13.8034 11.713 14.0372 11.9468L14.8096 12.7192H4.18128C3.19308 12.7192 2.3893 11.9154 2.3893 10.9272C2.3893 10.4333 1.98723 10.0312 1.49332 10.0312H0.895989C0.402075 10.0312 0 10.4333 0 10.9272C0 13.2329 1.8756 15.1085 4.18128 15.1085H14.8096L14.0372 15.8809C13.8038 16.1143 13.8034 16.4916 14.0372 16.7254L14.8096 17.4978C15.0426 17.7308 15.4211 17.7308 15.6541 17.4978L19.0271 14.1252C19.1436 14.0083 19.1436 13.8194 19.0271 13.7026L15.6541 10.3299Z"
                fill="#353978"
              />
            </svg>
          </button>
          {/* Flying To */}
          <Combobox
            value={flyingTo}
            virtual={{ options: filteredCityTo }}
            onChange={(value) => setValue("flyingTo", value)}
            onClose={() => setQueryTo("")}
          >
            <div
              className={cn(
                "tw:relative tw:grow",
                isSwapped ? "tw:order-1" : "tw:order-2"
              )}
            >
              <ComboboxInput
                id="flyingTo"
                displayValue={(city) => city?.name || ""}
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
        </div>
        {/* Depart */}
        <Popover open={departDateOpen} onOpenChange={setDepartDateOpen}>
          <PopoverTrigger asChild>
            <div className="tw:relative tw:grow">
              <input
                type="text"
                id="depart"
                className="tw:peer tw:py-[10px] tw:ps-5 tw:pe-16 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                placeholder="Depart"
                value={
                  depart instanceof Date ? depart.toLocaleDateString() : ""
                }
                readOnly
              />
              <label
                htmlFor="depart"
                className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
              >
                Depart
              </label>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              selected={depart}
              onSelect={(d) => {
                setValue("depart", d);
                setDepartDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {/* Arrival */}
        <Popover open={arrivalDateOpen} onOpenChange={setArrivalDateOpen}>
          <PopoverTrigger asChild>
            <div className="tw:relative tw:grow">
              <input
                type="text"
                id="arrival"
                className="tw:peer tw:py-[10px] tw:ps-5 tw:pe-16 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                placeholder="Arrival"
                value={
                  arrival instanceof Date ? arrival.toLocaleDateString() : ""
                }
                readOnly
              />
              <label
                htmlFor="arrival"
                className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
              >
                Arrival
              </label>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              selected={depart}
              onSelect={(d) => {
                setValue("arrival", d);
                setArrivalDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {/* Travellers & Cabin Class */}
        <Popover open={travellersOpen} onOpenChange={setTravellersOpen}>
          <PopoverTrigger asChild>
            <div className="tw:relative tw:basis-78">
              <input
                type="text"
                id="travellers"
                className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                placeholder="Travellers"
                value={travellersApplied ? travellersSummary : ""}
                readOnly
              />
              <label
                htmlFor="travellers"
                className="tw:max-w-full tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
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
                onValueChange={(value) => setValue("travellers.cabin", value)}
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
                    setValue(
                      "travellers.adults",
                      Math.max(1, travellers.adults - 1)
                    )
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Minus />
                </button>
                <span className="tw:text-lg">{travellers.adults}</span>
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "travellers.adults",
                      Math.min(9, travellers.adults + 1)
                    )
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
                    setValue(
                      "travellers.children",
                      Math.max(0, travellers.children - 1)
                    )
                  }
                  className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                >
                  <Minus />
                </button>
                <span className="tw:text-lg">{travellers.children}</span>
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "travellers.children",
                      Math.min(9, travellers.children + 1)
                    )
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
                  setValue("travellers", {
                    cabin: "economy",
                    adults: 1,
                    children: 0,
                  });
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
        {/* Search Button */}
        <button
          className="tw:w-full tw:xl:col-span-5 tw:sm:col-span-2 tw:justify-self-end tw:md:!w-fit tw:px-5 tw:h-[62px] tw:shrink-0 tw:2xl:px-0 tw:2xl:!w-[62px] tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:!rounded-lg tw:items-center tw:flex tw:justify-center tw:gap-2"
          disabled={isSubmitting}
        >
          <IoSearchOutline size={28} />
          <span className="tw:2xl:hidden tw:text-xl tw:font-medium">
            Search
          </span>
        </button>
      </fieldset>
    </form>
  );
};

export default RoundWayForm;
