import { createTheme } from "@mui/material";
import { useState, useEffect } from "react";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export function isDarkTheme() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark");
    const handleChange = (e) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return isDark;
}
