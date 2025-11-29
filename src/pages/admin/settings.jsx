import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  cardStyles,
  typographyStyles,
  chipStyles,
} from "./styles/dashboard-styles";

// Consistent switch styling
const switchSx = {
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#3B82F6",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#3B82F6",
  },
};

export default function Settings() {
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
            Settings
          </Typography>
          <Typography variant="body2" sx={typographyStyles.pageSubtitle}>
            Configure notifications and workspace preferences for the admin panel.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={<SettingsIcon sx={{ fontSize: 16 }} />}
            label="Preferences"
            size="small"
            sx={chipStyles.default}
          />
        </Stack>
      </Box>

      {/* Notification Preferences */}
      <Card sx={cardStyles.base}>
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <NotificationsIcon sx={{ fontSize: 20, color: "#3B82F6" }} />
              <Typography sx={typographyStyles.cardTitle}>Notification Preferences</Typography>
            </Stack>
          }
          subheader={
            <Typography variant="caption" sx={typographyStyles.cardSubtitle}>
              Choose how you want to be notified about alerts and reports.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked size="small" sx={switchSx} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>
                    Email alerts
                  </Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                    Receive daily analytics summaries and critical system alerts.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
            <FormControlLabel
              control={<Switch defaultChecked size="small" sx={switchSx} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>
                    Slack notifications
                  </Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                    Push API health alerts and quota warnings to your Slack channel.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
            <FormControlLabel
              control={<Switch size="small" sx={switchSx} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>
                    Weekly reports
                  </Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                    Email a weekly snapshot of top routes, traffic and conversion.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Interface Settings */}
      <Card sx={cardStyles.base}>
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <PaletteIcon sx={{ fontSize: 20, color: "#A855F7" }} />
              <Typography sx={typographyStyles.cardTitle}>Interface</Typography>
            </Stack>
          }
          subheader={
            <Typography variant="caption" sx={typographyStyles.cardSubtitle}>
              Tailor how the admin interface behaves for your team.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked size="small" sx={switchSx} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>
                    Compact tables
                  </Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                    Use a denser layout for logs and analytics tables.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
            <FormControlLabel
              control={<Switch size="small" sx={switchSx} />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}>
                    Highlight weekends
                  </Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                    Emphasize weekend traffic in charts and reports.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
          </Stack>
          <Divider sx={{ my: 2.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip
              label="Dark theme"
              size="small"
              sx={{
                bgcolor: "rgba(147, 51, 234, 0.1)",
                color: "#A855F7",
                fontFamily: "Inter",
                fontSize: 12,
              }}
            />
            <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
              Theme is controlled by the main app; this panel follows it.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
