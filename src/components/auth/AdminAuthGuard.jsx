import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSession } from "@/hooks/useAuth";

/**
 * AdminAuthGuard - Protects admin routes
 * 
 * Shows loading state while checking authentication,
 * redirects to login if not authenticated or not admin.
 */
const AdminAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isLoading, isFetched } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState(null);

  // Check if user is admin (super or admin role)
  const user = session?.user;
  const isAdmin = user && (user.role === "admin" || user.role === "super");

  // Add dark background to body immediately to prevent white flash
  useLayoutEffect(() => {
    document.body.classList.add("admin-loading");
    document.body.style.backgroundColor = "#0B0F16";
    
    return () => {
      document.body.classList.remove("admin-loading");
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    // Only check after initial fetch is complete
    if (!isFetched) return;

    // Not authenticated - redirect to login
    if (!user) {
      setRedirectTarget("/Login");
      setShouldRedirect(true);
      return;
    }

    // Authenticated but not admin - redirect to user dashboard
    if (!isAdmin) {
      setRedirectTarget("/dashboard");
      setShouldRedirect(true);
      return;
    }
  }, [user, isAdmin, isFetched]);

  // Handle redirect in separate effect to avoid render issues
  useEffect(() => {
    if (shouldRedirect && redirectTarget) {
      navigate(redirectTarget, { 
        replace: true,
        state: redirectTarget === "/Login" 
          ? { from: location.pathname, message: "Please login to access admin panel" }
          : { message: "You don't have permission to access admin panel" }
      });
    }
  }, [shouldRedirect, redirectTarget, navigate, location.pathname]);

  // Loading state - show immediately with dark background
  if (isLoading || !isFetched) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#0B0F16",
          gap: 3,
        }}
      >
        <CircularProgress 
          size={48} 
          sx={{ 
            color: "#3B82F6",
          }} 
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontWeight: 500,
              fontFamily: "Inter",
              mb: 1,
            }}
          >
            Loading Admin Panel
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#71717A",
              fontFamily: "Inter",
            }}
          >
            Verifying your credentials...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Redirecting state
  if (shouldRedirect || !user || !isAdmin) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#0B0F16",
          gap: 2,
        }}
      >
        <CircularProgress size={32} sx={{ color: "#3B82F6" }} />
        <Typography
          variant="body2"
          sx={{
            color: "#71717A",
            fontFamily: "Inter",
          }}
        >
          Redirecting...
        </Typography>
      </Box>
    );
  }

  // Authenticated and is admin - render children
  return children;
};

export default AdminAuthGuard;
