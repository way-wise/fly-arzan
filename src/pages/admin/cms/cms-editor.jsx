import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { useCmsPage, useSaveCmsPage } from "@/hooks/useCms";

const pretty = (v) => JSON.stringify(v, null, 2);

export default function CmsEditor({ slug, titleHint }) {
  const { data, isLoading, isError } = useCmsPage(slug);
  const saveMutation = useSaveCmsPage();

  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("{}");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      try {
        setContentText(pretty(data.content ?? {}));
      } catch {
        setContentText("{}");
      }
    }
  }, [data]);

  const onSave = () => {
    setErrorText("");
    let parsed;
    try {
      parsed = contentText.trim() ? JSON.parse(contentText) : {};
    } catch (e) {
      setErrorText("Content must be valid JSON");
      return;
    }
    saveMutation.mutate({
      slug,
      payload: { slug, title, content: parsed, status: "published" },
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>
        {titleHint || "Edit Page"}
      </Typography>

      {isError && <Alert severity="error">Failed to load page</Alert>}

      <Paper
        sx={{
          p: 2,
          bgcolor: "#0B0F16",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Slug"
              value={slug}
              disabled
              InputLabelProps={{ sx: { color: "#9ca3af" } }}
              inputProps={{ sx: { color: "#e5e7eb" } }}
            />
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{ sx: { color: "#9ca3af" } }}
              inputProps={{ sx: { color: "#e5e7eb" } }}
            />
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Typography variant="body2" sx={{ color: "#9ca3af" }}>
            Content (JSON)
          </Typography>
          <TextField
            multiline
            minRows={16}
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder={`{\n  "sections": []\n}`}
            InputProps={{
              sx: {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                color: "#e5e7eb",
              },
            }}
          />
          {errorText && <Alert severity="warning">{errorText}</Alert>}

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={onSave}
              disabled={saveMutation.isLoading}
            >
              {saveMutation.isLoading ? "Saving..." : "Save"}
            </Button>
            {saveMutation.isError && (
              <Alert severity="error">Save failed</Alert>
            )}
            {saveMutation.isSuccess && <Alert severity="success">Saved</Alert>}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
