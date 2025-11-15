import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  QueryStats as QueryStatsIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  ListAlt as ListAltIcon,
  MonitorHeart as MonitorHeartIcon,
  WarningAmber as WarningAmberIcon,
  BugReport as BugReportIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Feedback as FeedbackIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

const navSections = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: DashboardIcon,
        path: "/admin",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        label: "Search Analytics",
        icon: QueryStatsIcon,
        path: "/admin/analytics/engagement",
      },
      {
        label: "Routes Analytics",
        icon: BarChartIcon,
        path: "/admin/analytics/routes",
      },
      {
        label: "Trend Charts",
        icon: TimelineIcon,
        path: "/admin/analytics/trends",
      },
      {
        label: "Search Logs",
        icon: ListAltIcon,
        path: "/admin/logs",
      },
    ],
  },
  {
    title: "Monitoring",
    items: [
      {
        label: "API Health",
        icon: MonitorHeartIcon,
        path: "/admin/monitoring/health",
      },
      {
        label: "Alerts",
        icon: WarningAmberIcon,
        path: "/admin/monitoring/alerts",
      },
      {
        label: "System Logs",
        icon: BugReportIcon,
        path: "/admin/monitoring/logs",
      },
    ],
  },
  {
    title: "Users & Access",
    items: [
      {
        label: "Users",
        icon: PeopleIcon,
        path: "/admin/users",
      },
      {
        label: "Roles & Permissions",
        icon: SecurityIcon,
        path: "/admin/roles",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        label: "Feedback",
        icon: FeedbackIcon,
        path: "/admin/feedback",
      },
      {
        label: "Settings",
        icon: SettingsIcon,
        path: "/admin/settings",
      },
    ],
  },
];

const shellBackground = "radial-gradient(circle at top, rgba(17,24,39,1), rgba(15,23,42,1))";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const drawer = <AdminLayoutDrawer onItemClick={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0A0A0A" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#0A0A0A",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid #262626",
        }}
      >
        <Toolbar sx={{ minHeight: 72, px: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Fly Arzan Admin
              </Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                Control center for analytics, monitoring and users
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body2" sx={{ color: "#e5e7eb", fontWeight: 500 }}>
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  admin@flyarzan.com
                </Typography>
              </Box>
              <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ ml: 0.5 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "#1f2937",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  AD
                </Avatar>
              </IconButton>
            </Stack>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 260,
                  bgcolor: "#0A0A0A",
                  color: "#e5e7eb",
                  border: "1px solid #262626",
                },
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
              <Divider sx={{ borderColor: "rgba(31,41,55,0.9)" }} />
              <MenuItem onClick={handleProfileMenuClose}>Log out</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #262626",
              bgcolor: "#0A0A0A",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 12,
          bgcolor: "#0A0A0A",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

const AdminLayoutDrawer = ({ onItemClick = () => {} }) => {
  const location = useLocation();

  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0A0A0A",
        color: "#e5e7eb",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 72,
          px: 2,
          borderBottom: "1px solid #262626",
        }}
      >
        <Link to="/admin" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: 32 }}
          />
        </Link>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", py: 2 }}>
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 3,
                mb: 0.5,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                color: "#64748b",
              }}
            >
              {section.title}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(item.path);
                return (
                  <ListItemButton
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1.5,
                      mb: 0.5,
                      borderRadius: 1.5,
                      px: 1.75,
                      py: 1,
                      background: active
                        ? "linear-gradient(90deg, rgba(30,64,175,0.95), rgba(15,23,42,0.95))"
                        : "transparent",
                      "& .MuiListItemIcon-root": { color: active ? "#60a5fa" : "#6b7280" },
                      "& .MuiTypography-root": { color: active ? "#e5e7eb" : "#9ca3af", fontWeight: active ? 600 : 500 },
                      "&:hover": {
                        background: active
                          ? "linear-gradient(90deg, rgba(30,64,175,0.95), rgba(15,23,42,0.95))"
                          : "transparent",
                      },
                      "&:hover .MuiTypography-root": { color: active ? "#e5e7eb" : "#60a5fa" },
                      "&:hover .MuiListItemIcon-root": { color: "#60a5fa" },
                    }}
                    onClick={onItemClick}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: active ? "#60a5fa" : "#6b7280" }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: active ? 600 : 500 }}>
                          {item.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

    </Box>
  );
};

export default AdminLayout;
