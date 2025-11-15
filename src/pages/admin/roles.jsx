import { useState } from "react";
import { Box, Card, CardContent, CardHeader, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Switch, Chip, Stack } from "@mui/material";
import { Security, People } from "@mui/icons-material";

const mockRoles = [
  {
    name: "Owner",
    description: "Full access to all features and settings.",
    users: 1,
    accent: "#f97316",
  },
  {
    name: "Admin",
    description: "Manage analytics, monitoring and user access.",
    users: 4,
    accent: "#3b82f6",
  },
  {
    name: "Analyst",
    description: "View analytics and export reports.",
    users: 7,
    accent: "#22c55e",
  },
  {
    name: "Support",
    description: "Read-only access to user profiles and logs.",
    users: 3,
    accent: "#a855f7",
  },
];

const basePermissionMatrix = [
  {
    module: "Dashboard",
    permissions: { Owner: true, Admin: true, Analyst: true, Support: true },
  },
  {
    module: "Search Analytics",
    permissions: { Owner: true, Admin: true, Analyst: true, Support: false },
  },
  {
    module: "Routes Analytics",
    permissions: { Owner: true, Admin: true, Analyst: true, Support: false },
  },
  {
    module: "Search Logs",
    permissions: { Owner: true, Admin: true, Analyst: true, Support: true },
  },
  {
    module: "Monitoring",
    permissions: { Owner: true, Admin: true, Analyst: false, Support: false },
  },
  {
    module: "Users",
    permissions: { Owner: true, Admin: true, Analyst: false, Support: false },
  },
  {
    module: "Roles & Permissions",
    permissions: { Owner: true, Admin: false, Analyst: false, Support: false },
  },
  {
    module: "Settings",
    permissions: { Owner: true, Admin: true, Analyst: false, Support: false },
  },
];

export default function Roles() {
  const [activeRole, setActiveRole] = useState("Admin");
  const [permissionMatrix, setPermissionMatrix] = useState(basePermissionMatrix);

  const handleTogglePermission = (moduleName) => {
    setPermissionMatrix((prev) =>
      prev.map((row) =>
        row.module === moduleName
          ? {
              ...row,
              permissions: {
                ...row.permissions,
                [activeRole]: !row.permissions[activeRole],
              },
            }
          : row
      )
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
            Roles & Permissions
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            Design how different teams can access analytics, monitoring and user data.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<Security sx={{ fontSize: 16 }} />}
            label="RBAC Preview"
            size="small"
            sx={{ bgcolor: "rgba(15,23,42,0.9)", color: "#e5e7eb", borderRadius: 999 }}
          />
        </Stack>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
            }}
          >
            <CardHeader
              title={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Security sx={{ fontSize: 20, color: "#60a5fa" }} />
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                    Role Overview
                  </Typography>
                </Stack>
              }
              sx={{ pb: 1.5, px: 2.5, pt: 2.25 }}
            />
            <CardContent sx={{ pt: 1, px: 2.5, pb: 2.5 }}>
              <Stack spacing={1.5}>
                {mockRoles.map((role) => {
                  const selected = role.name === activeRole;
                  return (
                    <Box
                      key={role.name}
                      onClick={() => setActiveRole(role.name)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: selected ? "rgba(15,23,42,1)" : "rgba(15,23,42,0.9)",
                        border: selected
                          ? "1px solid rgba(59,130,246,0.9)"
                          : "1px solid rgba(31,41,55,0.9)",
                        cursor: "pointer",
                        transition: "background 0.15s ease, border-color 0.15s ease",
                        "&:hover": {
                          bgcolor: "rgba(15,23,42,1)",
                        },
                      }}
                    >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 40,
                          borderRadius: 999,
                          bgcolor: role.accent,
                        }}
                      />
                      <Box>
                        <Typography sx={{ color: "#e5e7eb", fontWeight: 600, fontSize: 14 }}>
                          {role.name}
                        </Typography>
                        <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                          {role.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <People sx={{ fontSize: 16, color: selected ? "#e5e7eb" : "#9ca3af" }} />
                      <Typography variant="caption" sx={{ color: selected ? "#e5e7eb" : "#9ca3af" }}>
                        {role.users} users
                      </Typography>
                    </Stack>
                  </Box>
                );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(51,65,85,0.9)",
            }}
          >
            <CardHeader
              title={
                <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                  Permissions for {activeRole}
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  Toggle which modules this role can access. This is a visual prototype; wire it to your auth backend later.
                </Typography>
              }
              sx={{ pb: 1.5, px: 2.5, pt: 2.25 }}
            />
            <CardContent sx={{ pt: 1, px: 2.5, pb: 2.5 }}>
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#9ca3af", borderColor: "#111827" }}>Module</TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#9ca3af", borderColor: "#111827", width: 140 }}
                      >
                        {activeRole} can access
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissionMatrix.map((row) => (
                      <TableRow key={row.module}>
                        <TableCell sx={{ color: "#e5e7eb", borderColor: "#111827" }}>
                          {row.module}
                        </TableCell>
                        <TableCell align="center" sx={{ borderColor: "#111827" }}>
                          <Switch
                            checked={Boolean(row.permissions[activeRole])}
                            size="small"
                            color="primary"
                            onChange={() => handleTogglePermission(row.module)}
                            inputProps={{ "aria-label": `${activeRole} can access ${row.module}` }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
