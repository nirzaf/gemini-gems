import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type Label = { id: number; name: string; color: string };

interface Props {
  categories: string[];
  labels?: Label[];
  initialCount: number;
}

const normalize = (s: string | null) => (s || "").toLowerCase();

const useModeTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    const current = html.classList.contains("dark") ? "dark" : "light";
    setMode(current as "light" | "dark");

    const observer = new MutationObserver(() => {
      const m = html.classList.contains("dark") ? "dark" : "light";
      setMode(m as "light" | "dark");
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return useMemo(
    () => {
      const darkText = { primary: "#ffffff", secondary: "#f3f4f6" };
      const lightText = { primary: "#111827", secondary: "#374151" };
      return createTheme({
        palette: { mode, text: mode === "dark" ? darkText : lightText },
        shape: { borderRadius: 12 },
      });
    },
    [mode]
  );
};

export default function MuiSearchFilter({
  categories,
  labels = [],
  initialCount,
}: Props) {
  const theme = useModeTheme();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLabel, setSelectedLabel] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("default");
  const [visibleCount, setVisibleCount] = useState<number>(initialCount);

  const matchesQuery = (el: HTMLElement, q: string) => {
    if (!q) return true;
    const title = normalize(el.getAttribute("data-title"));
    const desc = normalize(el.getAttribute("data-description"));
    const feats = normalize(el.getAttribute("data-features"));
    return title.includes(q) || desc.includes(q) || feats.includes(q);
  };

  const matchesCategory = (el: HTMLElement, cat: string) => {
    if (!cat || cat === "All") return true;
    return normalize(el.getAttribute("data-category")) === normalize(cat);
  };

  const matchesLabel = (el: HTMLElement, labelId: string) => {
    if (!labelId || labelId === "all") return true;
    const labelBadges = el.querySelectorAll(
      ".inline-block.px-2.py-0\\.5.text-xs.font-semibold.rounded.text-white.border"
    );
    return Array.from(labelBadges).some((badge) => {
      const badgeText = badge.textContent?.trim();
      const labelButtons = document.querySelectorAll(
        `[data-label="${labelId}"]`
      );
      return Array.from(labelButtons).some(
        (btn) => btn.textContent?.trim() === badgeText
      );
    });
  };

  const applyFilterAndSort = () => {
    const cards = Array.from(
      document.querySelectorAll(".gem-card")
    ) as HTMLElement[];
    let visible = 0;
    const visibleCards: HTMLElement[] = [];

    cards.forEach((card) => {
      const show =
        matchesCategory(card, selectedCategory) &&
        matchesQuery(card, query) &&
        matchesLabel(card, selectedLabel);
      card.style.display = show ? "" : "none";
      if (show) {
        visible++;
        visibleCards.push(card);
      }
    });

    setVisibleCount(visible);

    const grid = document.getElementById("gemsGrid");
    if (!grid) return;

    if (sortValue === "most-copied") {
      visibleCards.sort((a, b) => {
        const aCount = parseInt(a.dataset.copyCount || "0", 10);
        const bCount = parseInt(b.dataset.copyCount || "0", 10);
        return bCount - aCount;
      });
    } else if (sortValue === "alphabetical") {
      visibleCards.sort((a, b) => {
        const aTitle = a.getAttribute("data-title") || "";
        const bTitle = b.getAttribute("data-title") || "";
        return aTitle.localeCompare(bTitle);
      });
    }

    visibleCards.forEach((card) => grid.appendChild(card));
  };

  useEffect(() => {
    applyFilterAndSort();

    // Re-apply sort when gem data is loaded (badges added)
    const handleDataLoad = () => applyFilterAndSort();
    document.addEventListener("gems-data-loaded", handleDataLoad);
    return () => document.removeEventListener("gems-data-loaded", handleDataLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedCategory, selectedLabel, sortValue]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box maxWidth={864} mx="auto" mb={2}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            fullWidth
            size="medium"
            variant="outlined"
            placeholder="Search gems by name, description, features..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <Select
            size="medium"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="default">Sort: Default</MenuItem>
            <MenuItem value="most-copied">Most Copied</MenuItem>
            <MenuItem value="alphabetical">A-Z</MenuItem>
          </Select>
        </Stack>

        <Paper elevation={0} sx={{ p: 1.5, mb: 1.5 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
            <Chip
              label="All"
              color={selectedCategory === "All" ? "primary" : "default"}
              onClick={() => setSelectedCategory("All")}
            />
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                color={selectedCategory === cat ? "primary" : "default"}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </Stack>
        </Paper>

        {labels.length > 0 && (
          <Paper elevation={0} sx={{ p: 1.5, mb: 1.5 }}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" sx={{ color: "text.secondary", mr: 1 }}>
                Filter by label:
              </Typography>
              <Chip
                label="All Labels"
                onClick={() => setSelectedLabel("all")}
                color={selectedLabel === "all" ? "primary" : "default"}
              />
              {labels.map((label) => (
                <Chip
                  key={label.id}
                  label={label.name}
                  onClick={() => setSelectedLabel(String(label.id))}
                  sx={{
                    borderColor: label.color,
                    borderWidth: 1,
                    borderStyle: "solid",
                    backgroundColor: `${label.color}30`,
                  }}
                  color={selectedLabel === String(label.id) ? "primary" : "default"}
                />
              ))}
            </Stack>
          </Paper>
        )}

        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          Showing {visibleCount} of {initialCount} gems
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
