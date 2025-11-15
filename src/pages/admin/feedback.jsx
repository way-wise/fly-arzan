import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

const mockFeedback = [
  {
    id: 1,
    route: "ALA → IST",
    type: "Feature",
    rating: 5,
    comment: "Would love to bookmark favorite routes.",
    createdAt: "Today, 10:23",
  },
  {
    id: 2,
    route: "ALA → DXB",
    type: "Bug",
    rating: 3,
    comment: "One search timed out yesterday evening.",
    createdAt: "Yesterday, 19:42",
  },
];

export default function Feedback() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
          Feedback
        </Typography>
        <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, fontFamily: "Inter, sans-serif" }}>
          Qualitative feedback from users about the flight search experience.
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: 2,
          bgcolor: "#1A1D23",
          background: "linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.02) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader
          title={
            <Typography sx={{ color: "#FFFFFF", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
              Recent feedback
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#71717A", fontFamily: "Inter, sans-serif" }}>
              This is placeholder data — connect it to a real feedback source later.
            </Typography>
          }
          sx={{ px: 2.5, pt: 2.25, pb: 1.5 }}
        />
        <CardContent sx={{ px: 2.5, pb: 2.5 }}>
          <Stack spacing={1.5}>
            {mockFeedback.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "#0B0F16",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography sx={{ color: "#e5e7eb", fontWeight: 500, fontSize: 14 }}>
                    {item.route}
                  </Typography>
                  <Chip
                    size="small"
                    label={item.type}
                    sx={{
                      bgcolor:
                        item.type === "Bug" ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.2)",
                      color: "#e5e7eb",
                      borderRadius: 999,
                      fontSize: 11,
                    }}
                  />
                  <Typography sx={{ color: "#9ca3af", fontSize: 11 }}>
                    {item.createdAt}
                  </Typography>
                </Stack>
                <Typography sx={{ color: "#e5e7eb", fontSize: 13 }}>{item.comment}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
