import { object, string } from "yup";

// Sign In Schema
export const signInSchema = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Sign Up Schema
export const signUpSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
});
