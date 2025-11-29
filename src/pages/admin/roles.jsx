import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import {
  cardStyles,
  tableStyles,
  typographyStyles,
  chipStyles,
} from "./styles/dashboard-styles";
import { useRoles } from "@/hooks/useRoles";

/**
 * Dynamic Role & Permission Management
 * 
 * Roles are stored in the database and can be customized.
 * Permissions are grouped by category for easy management.
 */

// Role colors for display
const roleColors = {
  super: "#DC2626",
  admin: "#F97316",
  moderator: "#8B5CF6",
  user: "#3B82F6",
};

export default function Roles() {
  const [activeRole, setActiveRole] = useState(null);
  
  // Fetch roles from API
  const { data: roles = [], isLoading: rolesLoading, error: rolesError } = useRoles();

  // Set default active role when roles load
  if (!activeRole && roles.length > 0) {
    setActiveRole(roles[0]?.name || roles[0]?.id);
  }

  const selectedRole = roles.find((r) => r.name === activeRole || r.id === activeRole) || roles[0];

  // Group permissions by category for display
  const getPermissionsByGroup = () => {
    if (!selectedRole?.permissions) return {};
    
    return selectedRole.permissions.reduce((acc, perm) => {
      const group = perm.group || "other";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(perm);
      return acc;
    }, {});
  };

  const permissionsByGroup = getPermissionsByGroup();

  // Get role access level label
  const getRoleAccessLabel = (roleName) => {
    if (roleName === "super") return "Full Access";
    if (roleName === "admin") return "Admin Access";
    if (roleName === "moderator") return "Moderate Access";
    return "Limited";
  };

  // Get role color
  const getRoleColor = (roleName) => {
    return roleColors[roleName] || "#6B7280";
  };

  // Loading state
  if (rolesLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress sx={{ color: "#3B82F6" }} />
      </Box>
    );
  }

  // Error state
  if (rolesError) {
    return (
      <Alert severity="error" sx={{ bgcolor: "rgba(239, 68, 68, 0.1)", color: "#EF4444" }}>
        Failed to load roles: {rolesError.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={typographyStyles.pageTitle}>
            Roles & Permissions
          </Typography>
          <Typography variant="body2" sx={typographyStyles.pageSubtitle}>
            Manage role-based access control (RBAC) for your application.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<SecurityIcon sx={{ fontSize: 16 }} />}
            label={`${roles.length} Roles`}
            size="small"
            sx={chipStyles.default}
          />
        </Stack>
      </Box>

      <Alert
        severity="info"
        sx={{
          bgcolor: "rgba(59, 130, 246, 0.1)",
          color: "#3B82F6",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          "& .MuiAlert-icon": { color: "#3B82F6" },
        }}
      >
        Roles define what actions users can perform. System roles (super, admin, moderator, user) cannot be deleted.
      </Alert>

      <Grid container spacing={2.5}>
        {/* Role Selection */}
        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Card sx={cardStyles.base}>
            <CardHeader
              title={
                <Stack direction="row" spacing={1} alignItems="center">
                  <SecurityIcon sx={{ fontSize: 20, color: "#3B82F6" }} />
                  <Typography sx={typographyStyles.cardTitle}>Available Roles</Typography>
                </Stack>
              }
              subheader={
                <Typography variant="caption" sx={typographyStyles.cardSubtitle}>
                  Select a role to view its permissions
                </Typography>
              }
              sx={{ pb: 1.5, px: 2.5, pt: 2.25 }}
            />
            <CardContent sx={{ pt: 1, px: 2.5, pb: 2.5 }}>
              <Stack spacing={1.5}>
                {roles.map((role) => {
                  const selected = role.name === activeRole || role.id === activeRole;
                  const color = getRoleColor(role.name);
                  return (
                    <Box
                      key={role.id || role.name}
                      onClick={() => setActiveRole(role.name)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: 2,
                        bgcolor: selected ? "rgba(59, 130, 246, 0.1)" : "#0B0F16",
                        border: selected
                          ? "1px solid rgba(59, 130, 246, 0.5)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        "&:hover": {
                          bgcolor: "rgba(59, 130, 246, 0.05)",
                          borderColor: "rgba(59, 130, 246, 0.3)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 40,
                            borderRadius: 999,
                            bgcolor: color,
                          }}
                        />
                        <Box>
                          <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, fontFamily: "Inter", textTransform: "capitalize" }}>
                            {role.displayName || role.name}
                          </Typography>
                          <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                            {role.description || `${role.permissionCount || 0} permissions`}
                          </Typography>
                        </Box>
                      </Box>
                      <Stack direction="column" alignItems="flex-end" spacing={0.5}>
                        <Chip
                          size="small"
                          label={getRoleAccessLabel(role.name)}
                          sx={{
                            bgcolor: `${color}20`,
                            color: color,
                            fontSize: 10,
                            fontFamily: "Inter",
                            height: 20,
                          }}
                        />
                        {role.isSystem && (
                          <Typography sx={{ color: "#71717A", fontSize: 10, fontFamily: "Inter" }}>
                            System
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Permissions Matrix */}
        <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
          <Card sx={cardStyles.base}>
            <CardHeader
              title={
                <Typography sx={typographyStyles.cardTitle}>
                  Permissions for{" "}
                  <span style={{ textTransform: "capitalize", color: getRoleColor(selectedRole?.name) }}>
                    {selectedRole?.displayName || selectedRole?.name || "Select a role"}
                  </span>
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={typographyStyles.cardSubtitle}>
                  {selectedRole?.permissions?.length || 0} permissions assigned to this role
                </Typography>
              }
              sx={{ pb: 1.5, px: 2.5, pt: 2.25 }}
            />
            <CardContent sx={{ pt: 1, px: 2.5, pb: 2.5 }}>
              {Object.keys(permissionsByGroup).length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <BlockIcon sx={{ fontSize: 48, color: "#71717A", mb: 2 }} />
                  <Typography sx={{ color: "#71717A", fontSize: 14 }}>
                    No permissions assigned to this role
                  </Typography>
                </Box>
              ) : (
                Object.entries(permissionsByGroup).map(([group, permissions]) => (
                  <Box key={group} sx={{ mb: 3, "&:last-child": { mb: 0 } }}>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: 14,
                        fontFamily: "Inter",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        mb: 1.5,
                      }}
                    >
                      {group.replace(/_/g, " ")}
                    </Typography>
                    <Box sx={{ overflowX: "auto" }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={tableStyles.headerCell}>Resource</TableCell>
                            <TableCell sx={tableStyles.headerCell}>Action</TableCell>
                            <TableCell sx={tableStyles.headerCell}>Permission</TableCell>
                            <TableCell align="center" sx={{ ...tableStyles.headerCell, width: 100 }}>
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {permissions.map((perm) => (
                            <TableRow key={`${perm.resource}-${perm.action}`}>
                              <TableCell sx={{ ...tableStyles.bodyCell, fontWeight: 500, textTransform: "capitalize" }}>
                                {perm.resource}
                              </TableCell>
                              <TableCell sx={{ ...tableStyles.bodyCell, color: "#A1A1AA" }}>
                                {perm.action}
                              </TableCell>
                              <TableCell sx={{ ...tableStyles.bodyCell, color: "#71717A" }}>
                                {perm.displayName}
                              </TableCell>
                              <TableCell align="center" sx={tableStyles.bodyCell}>
                                <Chip
                                  size="small"
                                  icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                                  label="Allowed"
                                  sx={{
                                    bgcolor: "rgba(34, 197, 94, 0.1)",
                                    color: "#22C55E",
                                    fontSize: 11,
                                    fontFamily: "Inter",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
