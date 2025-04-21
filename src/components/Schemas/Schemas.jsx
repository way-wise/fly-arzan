import * as yup from "yup";

export const flightSchema = yup.object().shape({
  fromCountry: yup.string().required("From Country is required"),
  fromCity: yup.string().required("From City is required"),
  fromCityIataCode: yup.string().required("From City Iata Code is required"),

  toCountry: yup.string().required("To Country is required"),
  toCity: yup.string().required("To City is required"),
  toCityIataCode: yup.string().required("To City Iata Code is required"),

  title: yup.string().required("Title is required"),
  amenities: yup
    .array()
    .min(1, "Select at least one amenity")
    .required("Amenities are required"),

  currency: yup.string().required("Currency is required"),
  amount: yup.string().required("Amount is required"),
  at: yup.string().required("Flight At is required"),
  flightType: yup.string().required("Flight Type is required"),
  departureDate: yup.string().required("Departure Date is required"),
  returnDate: yup.string().when("flightType", ([flightType], schema) => {
    return flightType === "Return"
      ? schema.required("Return Date is required")
      : schema.notRequired();
  }),

  cabin: yup.string().required("Cabin class is required"),
  image: yup
  .mixed()
  .required("Image is required")
  .test("fileSize", "The file is too large", (value) => {
    return value && value.size <= 10 * 1024 * 1024; // 10MB
  })
  .test("fileType", "Unsupported File Format", (value) => {
    return value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
  }),


});


export const registrationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),

  terms: yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});


export const loginSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});