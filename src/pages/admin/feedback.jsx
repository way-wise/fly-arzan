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
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
          Feedback
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
          Qualitative feedback from users about the flight search experience.
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
              Recent feedback
            </Typography>
          }
          subheader={
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
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
                  p: 1.75,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,1)",
                  border: "1px solid rgba(31,41,55,0.9)",
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
