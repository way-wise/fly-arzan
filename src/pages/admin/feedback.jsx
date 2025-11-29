import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BugReportIcon from "@mui/icons-material/BugReport";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
  cardStyles,
  typographyStyles,
  chipStyles,
} from "./styles/dashboard-styles";

// Placeholder - This would be connected to a real feedback system
const mockFeedback = [
  {
    id: 1,
    type: "feature",
    subject: "Bookmark favorite routes",
    message: "Would love to be able to bookmark my favorite flight routes for quick access.",
    userEmail: "user@example.com",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "new",
  },
  {
    id: 2,
    type: "bug",
    subject: "Search timeout issue",
    message: "One of my searches timed out yesterday evening around 7 PM.",
    userEmail: "another@example.com",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "in_progress",
  },
  {
    id: 3,
    type: "general",
    subject: "Great service!",
    message: "Really enjoying the flight search experience. Fast and accurate results.",
    userEmail: "happy@example.com",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "resolved",
  },
];

const getTypeIcon = (type) => {
  switch (type) {
    case "bug":
      return <BugReportIcon sx={{ fontSize: 16, color: "#EF4444" }} />;
    case "feature":
      return <LightbulbIcon sx={{ fontSize: 16, color: "#F59E0B" }} />;
    default:
      return <FeedbackIcon sx={{ fontSize: 16, color: "#3B82F6" }} />;
  }
};

const getTypeChipStyle = (type) => {
  switch (type) {
    case "bug":
      return { bgcolor: "rgba(239, 68, 68, 0.1)", color: "#EF4444" };
    case "feature":
      return { bgcolor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B" };
    default:
      return { bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" };
  }
};

const getStatusChipStyle = (status) => {
  switch (status) {
    case "new":
      return { bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" };
    case "in_progress":
      return { bgcolor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B" };
    case "resolved":
      return { bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22C55E" };
    default:
      return { bgcolor: "rgba(113, 113, 122, 0.1)", color: "#71717A" };
  }
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
};

export default function Feedback() {
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
            Feedback
          </Typography>
          <Typography variant="body2" sx={typographyStyles.pageSubtitle}>
            User feedback and suggestions for the flight search experience.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            size="small"
            label={`${mockFeedback.length} items`}
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
        This is placeholder data. Connect to a real feedback collection system (e.g., database table, third-party service) for production use.
      </Alert>

      <Card sx={cardStyles.base}>
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <FeedbackIcon sx={{ fontSize: 20, color: "#3B82F6" }} />
              <Typography sx={typographyStyles.cardTitle}>Recent Feedback</Typography>
            </Stack>
          }
          subheader={
            <Typography variant="caption" sx={typographyStyles.cardSubtitle}>
              User-submitted feedback, bug reports, and feature requests.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          {mockFeedback.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography sx={{ color: "#71717A", fontFamily: "Inter" }}>
                No feedback yet
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {mockFeedback.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: "#0B0F16",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "border-color 0.15s ease",
                    "&:hover": {
                      borderColor: "rgba(59, 130, 246, 0.3)",
                    },
                  }}
                >
                  {/* Header row */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                    sx={{ mb: 1.5 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getTypeIcon(item.type)}
                      <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontSize: 14, fontFamily: "Inter" }}>
                        {item.subject}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        size="small"
                        label={item.type}
                        sx={{
                          ...getTypeChipStyle(item.type),
                          fontSize: 11,
                          fontFamily: "Inter",
                          textTransform: "capitalize",
                        }}
                      />
                      <Chip
                        size="small"
                        label={item.status.replace("_", " ")}
                        sx={{
                          ...getStatusChipStyle(item.status),
                          fontSize: 11,
                          fontFamily: "Inter",
                          textTransform: "capitalize",
                        }}
                      />
                    </Stack>
                  </Stack>

                  {/* Message */}
                  <Typography sx={{ color: "#E5E7EB", fontSize: 13, fontFamily: "Inter", mb: 1.5, lineHeight: 1.6 }}>
                    {item.message}
                  </Typography>

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                      From: {item.userEmail}
                    </Typography>
                    <Typography sx={{ color: "#71717A", fontSize: 12, fontFamily: "Inter" }}>
                      {formatDate(item.createdAt)}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
