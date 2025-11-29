import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Helper to make API calls to admin roles endpoints
 */
const adminFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api/admin/roles${endpoint}`;
  
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const text = await response.text();
  
  if (!text || text.trim() === "") {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return { success: true };
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${text}`);
    }
    return { success: true, message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
};

/**
 * Hook to get all roles
 */
export const useRoles = () => {
  return useQuery({
    queryKey: ["admin", "roles"],
    queryFn: async () => {
      const data = await adminFetch("", { method: "GET" });
      return data?.roles ?? [];
    },
  });
};

/**
 * Hook to get a single role by ID
 */
export const useRole = (roleId) => {
  return useQuery({
    queryKey: ["admin", "role", roleId],
    queryFn: async () => {
      const data = await adminFetch(`/${roleId}`, { method: "GET" });
      return data;
    },
    enabled: !!roleId,
  });
};

/**
 * Hook to get all available permissions
 */
export const usePermissions = () => {
  return useQuery({
    queryKey: ["admin", "permissions"],
    queryFn: async () => {
      const data = await adminFetch("/permissions/all", { method: "GET" });
      return data?.permissions ?? {};
    },
  });
};

/**
 * Hook to get current user's permissions
 */
export const useMyPermissions = () => {
  return useQuery({
    queryKey: ["auth", "my-permissions"],
    queryFn: async () => {
      const data = await adminFetch("/me/permissions", { method: "GET" });
      return data;
    },
  });
};

/**
 * Hook to create a new role
 */
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, permissionIds }) => {
      return adminFetch("", {
        method: "POST",
        body: JSON.stringify({ name, description, permissionIds }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
    },
  });
};

/**
 * Hook to update a role
 */
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, description, permissionIds }) => {
      return adminFetch(`/${roleId}`, {
        method: "PUT",
        body: JSON.stringify({ description, permissionIds }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "role"] });
    },
  });
};

/**
 * Hook to delete a role
 */
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId }) => {
      return adminFetch(`/${roleId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "roles"] });
    },
  });
};

/**
 * Helper hook to check if current user has a specific permission
 */
export const useHasPermission = (resource, action) => {
  const { data: permissions, isLoading } = useMyPermissions();
  
  if (isLoading || !permissions) {
    return { hasPermission: false, isLoading };
  }
  
  const permissionsGrouped = permissions.permissionsGrouped || {};
  const hasPermission = permissionsGrouped[resource]?.includes(action) ?? false;
  
  return { hasPermission, isLoading };
};

/**
 * Helper hook to check if current user has any of the specified permissions
 */
export const useHasAnyPermission = (permissionsList) => {
  const { data: permissions, isLoading } = useMyPermissions();
  
  if (isLoading || !permissions) {
    return { hasPermission: false, isLoading };
  }
  
  const permissionsGrouped = permissions.permissionsGrouped || {};
  
  const hasPermission = permissionsList.some(([resource, action]) => {
    return permissionsGrouped[resource]?.includes(action) ?? false;
  });
  
  return { hasPermission, isLoading };
};
