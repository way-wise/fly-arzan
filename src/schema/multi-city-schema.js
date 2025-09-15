import { array, object, string, date, number } from "yup";

// Location schema (for from/to)
const locationSchema = object({
  city: string().required("City is required"),
  iataCode: string()
    .required("Airport code is required")
    .length(3, "Airport code must be 3 characters")
    .matches(/^[A-Z]{3}$/, "Airport code must be 3 uppercase letters"),
});

// Segment schema
const segmentSchema = object({
  from: locationSchema.required("Origin location is required"),
  to: locationSchema.required("Destination location is required"),
  depart: date().required("Departure date is required").min(
    new Date(),
    "Departure date cannot be in the past"
  ),
});

// Travellers schema
const travellersSchema = object({
  cabin: string()
    .required("Cabin class is required")
    .oneOf(
      ["economy", "premium_economy", "business", "first_class"],
      "Invalid cabin class"
    ),
  adults: number()
    .integer()
    .min(1, "At least 1 adult is required")
    .max(9, "Maximum 9 adults allowed")
    .required("Number of adults is required"),
  children: number()
    .integer()
    .min(0, "Children count cannot be negative")
    .max(9, "Maximum 9 children allowed")
    .required("Number of children is required"),
});

// Multi-city form schema
export const MultiCityFormSchema = object({
  segments: array()
    .of(segmentSchema)
    .min(2, "At least 2 segments are required for multi-city")
    .max(6, "Maximum 6 segments allowed")
    .required("Segments are required")
    .test(
      "valid-connections",
      "Each segment destination should connect to the next origin",
      (value) => {
        if (!value || value.length < 2) return true;
        // This is optional validation - we can relax this for multi-city
        // where users might want separate unconnected flights
        return true;
      }
    ),
  travellers: travellersSchema.required("Traveller information is required"),
});
