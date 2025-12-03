import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

// API base URL - adjust based on your backend setup
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Re-export useSession from better-auth client for consistent session management
export { useSession } from "@/lib/auth-client";

// Sign In API call
const signIn = async (credentials) => {
  const formData = new FormData();
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);

  const response = await fetch(`${API_BASE_URL}/api/auth/custom/sign-in`, {
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

  const response = await fetch(`${API_BASE_URL}/api/auth/custom/sign-up`, {
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
    mutationFn: async (credentials) => {
      const result = await signIn(credentials);
      // Refresh the session cache after successful login
      await authClient.getSession({ fetchOptions: { throw: false } });
      return result;
    },
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

// Sign Out Hook - uses better-auth client
export const useSignOut = () => {
  return useMutation({
    mutationFn: () => authClient.signOut(),
    mutationKey: ["auth", "sign-out"],
  });
};

// Helper hook to check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: session, isPending: isLoading } = authClient.useSession();
  return {
    isAuthenticated: !!session?.user,
    isLoading,
    user: session?.user ?? null,
    session: session?.session ?? null,
  };
};

// Helper hook to check if user is admin (only super role can access admin panel)
// This matches better-auth config: adminRoles: "super"
export const useIsAdmin = () => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();
  const isAdmin = isAuthenticated && user?.role === "super";
  return {
    isAdmin,
    isLoading,
    user,
  };
};

// Helper hook to check if user is super admin
export const useIsSuperAdmin = () => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();
  return {
    isSuperAdmin: isAuthenticated && user?.role === "super",
    isLoading,
    user,
  };
};

// Helper hook to check if user is moderator or higher
export const useIsModerator = () => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();
  const isModerator =
    isAuthenticated &&
    (user?.role === "super" ||
      user?.role === "admin" ||
      user?.role === "moderator");
  return {
    isModerator,
    isLoading,
    user,
  };
};

// Helper hook to check if user has a specific role
export const useHasRole = (...allowedRoles) => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();
  const hasRole = isAuthenticated && allowedRoles.includes(user?.role);
  return {
    hasRole,
    isLoading,
    user,
  };
};
