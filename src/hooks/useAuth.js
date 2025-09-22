import { useMutation } from "@tanstack/react-query";

// API base URL - adjust based on your backend setup
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Sign In API call
const signIn = async (credentials) => {
  const formData = new FormData();
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);

  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sign in failed");
  }

  return data;
};

// Sign Up API call
const signUp = async (userData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sign up failed");
  }

  return data;
};

// Sign In Hook
export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    mutationKey: ["auth", "sign-in"],
  });
};

// Sign Up Hook
export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    mutationKey: ["auth", "sign-up"],
  });
};
