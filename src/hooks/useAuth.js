import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API base URL - adjust based on your backend setup
const API_BASE_URL = import.meta.env.VITE_API_URL;

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

// Sign Out API call - uses better-auth endpoint
const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Sign out failed");
  }

  return { success: true };
};

// Get Session API call
const getSession = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/get-session`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null; // Not authenticated
    }
    throw new Error("Failed to get session");
  }

  const data = await response.json();
  return data;
};

// Sign In Hook
export const useSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signIn,
    mutationKey: ["auth", "sign-in"],
    onSuccess: async (data) => {
      // Set the session data directly to avoid race conditions
      if (data?.user) {
        queryClient.setQueryData(["auth", "session"], data);
      }
      // Also invalidate to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
};

// Sign Up Hook
export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signUp,
    mutationKey: ["auth", "sign-up"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
};

// Sign Out Hook
export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signOut,
    mutationKey: ["auth", "sign-out"],
    onSuccess: () => {
      // Clear session data
      queryClient.setQueryData(["auth", "session"], null);
      queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
};

// Session Hook - get current user session
export const useSession = () => {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: getSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false, // Prevent refetch loops
  });
};

// Helper hook to check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: session, isLoading } = useSession();
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
  const isModerator = isAuthenticated && 
    (user?.role === "super" || user?.role === "admin" || user?.role === "moderator");
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
