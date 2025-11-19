# Admin Panel Design System

## Color Palette

- **Background**: `#0F172A` (main app background)
- **Card Background**: `#1A1D23`
- **Card Border**: `rgba(255, 255, 255, 0.08)`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#71717A`
- **Text Muted**: `#9ca3af`

## Accent Colors

- **Blue**: `#3b82f6` (primary actions)
- **Green**: `#22c55e` (success, positive trends)
- **Orange**: `#f97316` (warnings)
- **Red**: `#ef4444` (errors, critical)
- **Purple**: `#a855f7` (special highlights)

## Typography

- **Font Family**: `Inter` (all text)
- **H5 (Page Title)**: `fontWeight: 600`, `fontSize: 1.5rem`
- **Subtitle**: `fontWeight: 600`, `fontSize: 1rem`
- **Body**: `fontSize: 0.875rem`
- **Caption**: `fontSize: 0.75rem`

## Components

### Cards

```jsx
<Card
  sx={{
    height: "100%",
    borderRadius: 2,
    bgcolor: "#1A1D23",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  }}
>
  <CardContent sx={{ p: 2.5 }}>{/* Content */}</CardContent>
</Card>
```

### Buttons

```jsx
<Button
  variant="outlined"
  size="small"
  sx={{
    borderColor: "rgba(59, 130, 246, 0.3)",
    color: "#3B82F6",
    fontFamily: "Inter",
    textTransform: "none",
    height: 36,
    "&:hover": {
      borderColor: "#3B82F6",
      bgcolor: "rgba(59, 130, 246, 0.1)",
    },
  }}
>
  Button Text
</Button>
```

### Select/Dropdown

```jsx
<Select
  value={value}
  onChange={handleChange}
  size="small"
  sx={{
    bgcolor: "rgba(59, 130, 246, 0.1)",
    color: "#3B82F6",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    borderRadius: 2,
    fontFamily: "Inter",
    fontSize: "0.875rem",
    minWidth: 140,
    height: 36,
    "& .MuiOutline-notchedOutline": { border: "none" },
    "& .MuiSelect-icon": { color: "#3B82F6" },
  }}
>
  <MenuItem value="option">Option</MenuItem>
</Select>
```

### Tables

```jsx
<table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
      <th
        style={{
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: "Inter",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#9ca3af",
        }}
      >
        Header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
      <td
        style={{
          padding: "12px 16px",
          fontFamily: "Inter",
          fontSize: "0.875rem",
          color: "#e5e7eb",
        }}
      >
        Data
      </td>
    </tr>
  </tbody>
</table>
```

### Chips/Badges

```jsx
<Chip
  label="Status"
  size="small"
  sx={{
    bgcolor: "rgba(34, 197, 94, 0.1)",
    color: "#22c55e",
    fontFamily: "Inter",
    fontSize: "0.75rem",
    fontWeight: 500,
  }}
/>
```

### Grid Spacing

- Use `spacing={2.5}` for all Grid containers
- Use `gap: 3` for Box flex containers

### Chart Containers

```jsx
<Box sx={{ width: "100%", height: 280 }}>
  <ResponsiveContainer width="100%" height="100%">
    {/* Chart */}
  </ResponsiveContainer>
</Box>
```

## Consistency Checklist

- [ ] All cards use dark background (#1A1D23)
- [ ] All text uses Inter font family
- [ ] All buttons have consistent height (36px for small)
- [ ] All selects have consistent styling
- [ ] All tables use consistent border and text colors
- [ ] All grids use spacing={2.5}
- [ ] All charts have explicit dimensions
