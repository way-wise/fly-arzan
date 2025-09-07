import { string, number, object, date } from "yup";

export const OneWayFormSchema = object({
  flyingFrom: object({
    name: string().required(),
    iataCode: string().required(),
  }).required("Flying From is required"),
  flyingTo: object({
    name: string().required(),
    iataCode: string().required(),
  }).required("Flying To is required"),
  travellers: object({
    cabin: string().required("Cabin is required"),
    adults: number().required("Adults is required"),
    children: number().required("Children is required"),
  }),
  depart: date().required("Depart date is required"),
});
