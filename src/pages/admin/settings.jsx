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

export default function Settings() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#FFFFFF", fontFamily: "Inter" }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter" }}>
          Configure notifications and workspace preferences for the admin panel.
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
              Notification preferences
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
              Choose how you want to be notified about alerts and reports.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={1.5}>
            <FormControlLabel
              control={<Switch defaultChecked size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter, sans-serif" }}>Email alerts</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter, sans-serif" }}>
                    Receive daily analytics summaries and critical system alerts.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch defaultChecked size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#FFFFFF", fontSize: 14, fontFamily: "Inter, sans-serif" }}>Slack notifications</Typography>
                  <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter, sans-serif" }}>
                    Push API health alerts and quota warnings to your Slack channel.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>Weekly reports</Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                    Email a weekly snapshot of top routes, traffic and conversion.
                  </Typography>
                </Box>
              }
            />
          </Stack>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter" }}>
              Interface
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter" }}>
              Tailor how the admin interface behaves for your team.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={1.5}>
            <FormControlLabel
              control={<Switch defaultChecked size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>Compact tables</Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                    Use a denser layout for logs and analytics tables.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>Highlight weekends</Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                    Emphasize weekend traffic in charts and reports.
                  </Typography>
                </Box>
              }
            />
          </Stack>
          <Divider sx={{ my: 2, borderColor: "rgba(60, 66, 72, 0.3)" }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label="Dark theme"
              size="small"
              sx={{ bgcolor: "#1A1D23", color: "#FFFFFF", borderRadius: 999, fontFamily: "Inter, sans-serif" }}
            />
            <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
              Theme is controlled by the main app; this panel follows it.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
