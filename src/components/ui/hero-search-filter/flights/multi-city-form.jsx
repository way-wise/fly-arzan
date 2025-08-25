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
import { Minus, Plus, Trash } from "lucide-react";
import Calendar from "../../calendar";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, number, object, date, array } from "yup";
import { useNavigate } from "react-router-dom";

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

const MultiCityForm = () => {
  const navigate = useNavigate();

  // State for each segment's search queries
  const [segmentQueries, setSegmentQueries] = useState({});

  const MultiCityFormSchema = object({
    segments: array()
      .of(
        object({
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
          depart: date().required("Depart date is required"),
          travellers: object({
            cabin: string().required("Cabin is required"),
            adults: number().required("Adults is required"),
            children: number().required("Children is required"),
          }),
        })
      )
      .min(1, "At least one flight segment is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(MultiCityFormSchema),
    defaultValues: {
      segments: [
        {
          flyingFrom: null,
          flyingTo: null,
          depart: "",
          travellers: {
            cabin: "economy",
            adults: 1,
            children: 0,
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "segments",
  });

  // Watch form values
  const formValues = watch();
  const { segments } = formValues;

  // Travellers & Cabin Class state for each segment
  const [travellersStates, setTravellersStates] = useState({});
  const [travellersAppliedStates, setTravellersAppliedStates] = useState({});

  // Date state for each segment
  const [dateStates, setDateStates] = useState({});

  // Helper functions for segment queries
  const getSegmentQuery = (segmentIndex, type) => {
    return segmentQueries[`${segmentIndex}-${type}`] || "";
  };

  const setSegmentQuery = (segmentIndex, type, value) => {
    setSegmentQueries((prev) => ({
      ...prev,
      [`${segmentIndex}-${type}`]: value,
    }));
  };

  // Helper functions for travellers states
  const getTravellersOpen = (segmentIndex) => {
    return travellersStates[segmentIndex] || false;
  };

  const setTravellersOpen = (segmentIndex, isOpen) => {
    setTravellersStates((prev) => ({
      ...prev,
      [segmentIndex]: isOpen,
    }));
  };

  const getTravellersApplied = (segmentIndex) => {
    return travellersAppliedStates[segmentIndex] || false;
  };

  const setTravellersApplied = (segmentIndex, isApplied) => {
    setTravellersAppliedStates((prev) => ({
      ...prev,
      [segmentIndex]: isApplied,
    }));
  };

  // Helper functions for date states
  const getDateOpen = (segmentIndex) => {
    return dateStates[segmentIndex] || false;
  };

  const setDateOpen = (segmentIndex, isOpen) => {
    setDateStates((prev) => ({
      ...prev,
      [segmentIndex]: isOpen,
    }));
  };

  // Filter cities for each segment
  const getFilteredCities = (segmentIndex, type) => {
    const query = getSegmentQuery(segmentIndex, type);
    return query === ""
      ? city
      : city.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  };

  const addSegment = () => {
    append({
      flyingFrom: null,
      flyingTo: null,
      depart: "",
      travellers: {
        cabin: "economy",
        adults: 1,
        children: 0,
      },
    });
  };

  const removeSegment = (index) => {
    if (fields.length > 1) {
      remove(index);
      // Clean up states for removed segment
      setSegmentQueries((prev) => {
        const newQueries = { ...prev };
        delete newQueries[`${index}-from`];
        delete newQueries[`${index}-to`];
        return newQueries;
      });
      setDateStates((prev) => {
        const newStates = { ...prev };
        delete newStates[index];
        return newStates;
      });
      setTravellersStates((prev) => {
        const newStates = { ...prev };
        delete newStates[index];
        return newStates;
      });
      setTravellersAppliedStates((prev) => {
        const newStates = { ...prev };
        delete newStates[index];
        return newStates;
      });
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    navigate("/search/flight");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <fieldset className="tw:space-y-4">
        {fields.map((field, segmentIndex) => {
          const segmentTravellers = segments[segmentIndex]?.travellers || {
            adults: 1,
            children: 0,
            cabin: "economy",
          };
          const totalTravellers =
            segmentTravellers.adults + segmentTravellers.children;
          const cabinLabelMap = {
            economy: "Economy",
            premium_economy: "Premium Economy",
            business: "Business",
            first_class: "First Class",
          };
          const travellersSummary = `${totalTravellers} Traveller${
            totalTravellers !== 1 ? "s" : ""
          }, ${cabinLabelMap[segmentTravellers.cabin]}`;

          return (
            <div
              key={field.id}
              className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:xl:grid-cols-4 tw:2xl:flex tw:items-center tw:gap-4"
            >
              {/* Flying From */}
              <Combobox
                value={segments[segmentIndex]?.flyingFrom}
                virtual={{ options: getFilteredCities(segmentIndex, "from") }}
                onChange={(value) =>
                  setValue(`segments.${segmentIndex}.flyingFrom`, value)
                }
                onClose={() => setSegmentQuery(segmentIndex, "from", "")}
              >
                <div className="tw:relative tw:z-40 tw:grow">
                  <ComboboxInput
                    id={`flyingFrom-${segmentIndex}`}
                    displayValue={(city) => city?.name || ""}
                    onChange={(event) =>
                      setSegmentQuery(segmentIndex, "from", event.target.value)
                    }
                    className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0"
                    placeholder="From"
                  />
                  <label
                    htmlFor={`flyingFrom-${segmentIndex}`}
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
                  <button
                    type="button"
                    className="tw:absolute tw:z-50 tw:top-[calc(100%-16px)] tw:md:top-[50%] tw:right-1/2 tw:translate-x-1/2 tw:md:translate-x-0 tw:md:-right-8 tw:bg-white tw:md:-translate-y-1/2 tw:h-[50px] tw:w-[50px] tw:inline-flex tw:items-center tw:justify-center tw:border tw:!border-muted tw:!rounded-full"
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
                </div>
              </Combobox>

              {/* Flying To */}
              <Combobox
                value={segments[segmentIndex]?.flyingTo}
                virtual={{ options: getFilteredCities(segmentIndex, "to") }}
                onChange={(value) =>
                  setValue(`segments.${segmentIndex}.flyingTo`, value)
                }
                onClose={() => setSegmentQuery(segmentIndex, "to", "")}
              >
                <div className="tw:relative tw:grow">
                  <ComboboxInput
                    id={`flyingTo-${segmentIndex}`}
                    displayValue={(city) => city?.name || ""}
                    onChange={(event) =>
                      setSegmentQuery(segmentIndex, "to", event.target.value)
                    }
                    className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0"
                    placeholder="To"
                  />
                  <label
                    htmlFor={`flyingTo-${segmentIndex}`}
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

              {/* Depart */}
              <Popover
                open={getDateOpen(segmentIndex)}
                onOpenChange={(isOpen) => setDateOpen(segmentIndex, isOpen)}
              >
                <PopoverTrigger asChild>
                  <div className="tw:relative tw:grow">
                    <input
                      type="text"
                      id={`depart-${segmentIndex}`}
                      className="tw:peer tw:py-[10px] tw:ps-5 tw:pe-16 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                      placeholder="Depart"
                      value={
                        segments[segmentIndex]?.depart instanceof Date
                          ? segments[segmentIndex].depart.toLocaleDateString()
                          : ""
                      }
                      readOnly
                    />
                    <label
                      htmlFor={`depart-${segmentIndex}`}
                      className="tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
                    >
                      Depart
                    </label>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={segments[segmentIndex]?.depart}
                    onSelect={(d) => {
                      setValue(`segments.${segmentIndex}.depart`, d);
                      setDateOpen(segmentIndex, false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Travellers & Cabin Class */}
              <Popover
                open={getTravellersOpen(segmentIndex)}
                onOpenChange={(isOpen) =>
                  setTravellersOpen(segmentIndex, isOpen)
                }
              >
                <PopoverTrigger asChild>
                  <div className="tw:relative tw:grow">
                    <input
                      type="text"
                      id={`travellers-${segmentIndex}`}
                      className="tw:peer tw:py-[10px] tw:px-5 tw:h-[62px] tw:block tw:w-full tw:border tw:!border-muted tw:text-[15px] tw:!font-semibold tw:rounded-lg tw:placeholder:text-transparent tw:focus:border-primary tw:focus-visible:tw:border-primary tw:focus-visible:outline-hidden tw:focus:ring-primary tw:disabled:opacity-50 tw:disabled:pointer-events-none tw:focus:pt-6 tw:focus:pb-2 tw:not-placeholder-shown:pt-6 tw:not-placeholder-shown:pb-2 tw:autofill:pt-6 tw:autofill:pb-2 tw:focus-visible:ring-0 tw:read-only:cursor-default"
                      placeholder="Travellers"
                      value={
                        getTravellersApplied(segmentIndex)
                          ? travellersSummary
                          : ""
                      }
                      readOnly
                    />
                    <label
                      htmlFor={`travellers-${segmentIndex}`}
                      className="tw:max-w-full tw:absolute tw:top-0 tw:start-0 tw:h-full tw:!p-[14px_20.5px] tw:text-[20px] tw:text-secondary tw:truncate tw:pointer-events-none tw:transition tw:ease-in-out tw:duration-100 tw:border tw:border-transparent tw:origin-[0_0] tw:peer-disabled:opacity-50 tw:peer-disabled:pointer-events-none tw:peer-not-placeholder-shown:scale-80 tw:peer-not-placeholder-shown:translate-x-0.5 tw:peer-not-placeholder-shown:-translate-y-1.5 tw:peer-not-placeholder-shown:text-secondary"
                    >
                      Travellers & Cabin Class
                    </label>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {/* Cabin Selection */}
                  <div className="tw:flex tw:flex-col tw:mb-3">
                    <label
                      htmlFor={`cabin-${segmentIndex}`}
                      className="tw:font-medium"
                    >
                      Cabin Class
                    </label>
                    <Select
                      value={segmentTravellers.cabin}
                      onValueChange={(value) =>
                        setValue(
                          `segments.${segmentIndex}.travellers.cabin`,
                          value
                        )
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
                    <label
                      htmlFor={`adults-${segmentIndex}`}
                      className="tw:font-medium"
                    >
                      Adults (Age 18+)
                    </label>
                    <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border tw:border-muted tw:!rounded-md tw:p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setValue(
                            `segments.${segmentIndex}.travellers.adults`,
                            Math.max(1, segmentTravellers.adults - 1)
                          )
                        }
                        className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                      >
                        <Minus />
                      </button>
                      <span className="tw:text-lg">
                        {segmentTravellers.adults}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setValue(
                            `segments.${segmentIndex}.travellers.adults`,
                            Math.min(9, segmentTravellers.adults + 1)
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
                    <label
                      htmlFor={`children-${segmentIndex}`}
                      className="tw:font-medium"
                    >
                      Children (Age 0-17)
                    </label>
                    <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border tw:border-muted tw:!rounded-md tw:p-2">
                      <button
                        type="button"
                        onClick={() =>
                          setValue(
                            `segments.${segmentIndex}.travellers.children`,
                            Math.max(0, segmentTravellers.children - 1)
                          )
                        }
                        className="tw:size-8 tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:text-white tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100"
                      >
                        <Minus />
                      </button>
                      <span className="tw:text-lg">
                        {segmentTravellers.children}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setValue(
                            `segments.${segmentIndex}.travellers.children`,
                            Math.min(9, segmentTravellers.children + 1)
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
                        setValue(`segments.${segmentIndex}.travellers`, {
                          cabin: "economy",
                          adults: 1,
                          children: 0,
                        });
                        setTravellersApplied(segmentIndex, false);
                        setTravellersOpen(segmentIndex, false);
                      }}
                      className="tw:px-3 tw:py-2 tw:w-full tw:flex tw:items-center tw:justify-center tw:bg-muted/50 tw:hover:bg-muted tw:transition tw:!rounded tw:duration-100 tw:font-medium"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTravellersApplied(segmentIndex, true);
                        setTravellersOpen(segmentIndex, false);
                      }}
                      className="tw:px-3 tw:py-2 tw:w-full tw:flex tw:items-center tw:justify-center tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:transition tw:!rounded tw:duration-100 tw:font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Plus and Trash Buttons */}
              <div className="tw:flex tw:items-center tw:gap-2 tw:justify-end tw:md:col-span-2 tw:xl:col-span-4 tw:2xl:col-span-1">
                <button
                  type="button"
                  onClick={addSegment}
                  className="tw:justify-self-end tw:md:!w-fit tw:px-5 tw:h-[62px] tw:shrink-0 tw:2xl:px-0 tw:2xl:!w-[62px] tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:!rounded-lg tw:items-center tw:flex tw:justify-center tw:gap-2"
                  disabled={isSubmitting}
                >
                  <Plus size={28} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSegment(segmentIndex)}
                  className="tw:justify-self-end tw:md:!w-fit tw:px-5 tw:h-[62px] tw:shrink-0 tw:2xl:px-0 tw:2xl:!w-[62px] tw:bg-red-400 tw:!text-white tw:hover:bg-red-400/80 tw:!rounded-lg tw:items-center tw:flex tw:justify-center tw:gap-2"
                  disabled={isSubmitting || fields.length === 1}
                >
                  <Trash size={28} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Search Button */}
        <button
          type="submit"
          className="tw:w-full tw:justify-self-center tw:md:!w-fit tw:px-5 tw:h-[62px] tw:shrink-0 tw:bg-primary tw:!text-white tw:hover:bg-primary/80 tw:!rounded-lg tw:items-center tw:flex tw:justify-center tw:gap-2"
          disabled={isSubmitting}
        >
          <IoSearchOutline size={28} />
          <span className="tw:text-xl tw:font-medium">Search</span>
        </button>
      </fieldset>
    </form>
  );
};

export default MultiCityForm;
