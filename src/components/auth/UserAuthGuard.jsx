import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSession } from "@/hooks/useAuth";

/**
 * UserAuthGuard - Protects user routes (requires authentication only)
 * 
 * Shows loading state while checking authentication,
 * redirects to login if not authenticated.
 */
const UserAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isLoading, isFetched } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const user = session?.user;

  useEffect(() => {
    // Only check after initial fetch is complete
    if (!isFetched) return;

    // Not authenticated - redirect to login
    if (!user) {
      setShouldRedirect(true);
    }
  }, [user, isFetched]);

  // Handle redirect
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/Login", { 
        replace: true,
        state: { from: location.pathname, message: "Please login to access your dashboard" }
      });
    }
  }, [shouldRedirect, navigate, location.pathname]);

  // Loading state
  if (isLoading || !isFetched) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#667eea" }} />
        <Typography sx={{ color: "#666", fontSize: 14 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Redirecting state
  if (shouldRedirect || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          gap: 2,
        }}
      >
        <CircularProgress size={32} sx={{ color: "#667eea" }} />
        <Typography sx={{ color: "#666", fontSize: 14 }}>
          Redirecting to login...
        </Typography>
      </Box>
    );
  }

  // Authenticated - render children
  return children;
};

export default UserAuthGuard;
