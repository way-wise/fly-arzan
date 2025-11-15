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
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
          Configure notifications and workspace preferences for the admin panel.
        </Typography>
      </Box>

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
              Notification preferences
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
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
                  <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>Email alerts</Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
                    Receive daily analytics summaries and critical system alerts.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch defaultChecked size="small" color="primary" />}
              label={
                <Box>
                  <Typography sx={{ color: "#e5e7eb", fontSize: 14 }}>Slack notifications</Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>
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
          borderRadius: 3,
          bgcolor: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(51,65,85,0.9)",
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
              Interface
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
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
          <Divider sx={{ my: 2, borderColor: "#111827" }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label="Dark theme"
              size="small"
              sx={{ bgcolor: "rgba(15,23,42,0.9)", color: "#e5e7eb", borderRadius: 999 }}
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
