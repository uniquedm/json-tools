import { createTheme, Theme } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

export const accentColors = {
  DeepPurple: "#6200ea",
  OceanBlue: "#0069c0",
  CrimsonRed: "#d50000",
  Teal: "#00bfa5",
  Amber: "#ffab00",
  Graphite: "#37474f",
};

export const getTheme = (mode: "light" | "dark", accentColor: string): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main:
          mode === "dark"
            ? accentColor === accentColors.DeepPurple
              ? "#B388FF"
              : accentColor === accentColors.CrimsonRed
                ? "#FF5252"
                : accentColor === accentColors.Graphite
                  ? "#90A4AE"
                  : accentColor
            : accentColor,
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
};

// Backward compatibility
export const darkTheme = getTheme("dark", accentColors.DeepPurple);
export const lightTheme = getTheme("light", accentColors.DeepPurple);

export interface ThemeInput {
  setTheme?: Dispatch<SetStateAction<Theme>>; // Optional now, or deprecated
  toggleThemeMode?: () => void;
  appTheme?: Theme;
  setAccentColor?: (color: string) => void;
  accentColor?: string;
}

export const jsonEditCustomTheme = {
  displayName: "CustomDark",
  styles: {
    container: {
      backgroundColor: "#ffffff",
      fontFamily: "monospace",
      borderRadius: 0,
    },
  },
};

export const jsonEditCustomDarkTheme = {
  displayName: "CustomDark",
  fragments: { edit: "rgb(42, 161, 152)" },
  styles: {
    container: {
      backgroundColor: "#1e1e1e",
      fontFamily: "monospace",
      borderRadius: 0,
    },
    collection: {},
    collectionInner: {},
    collectionElement: {},
    dropZone: { color: "#aaaaaa" },
    property: "#9cdcfe",
    bracket: { color: "#f1d710", fontWeight: "normal" },
    itemCount: { color: "#707070", fontStyle: "italic" },
    string: "#ce9178",
    number: "#a7ce9b",
    boolean: "#a7ce9b",
    null: {
      color: "rgb(220, 50, 47)",
      fontVariant: "small-caps",
      fontWeight: "bold",
    },
    input: ["#000000", { fontSize: "90%" }],
    inputHighlight: "#555555",
    error: { fontSize: "0.8em", color: "red", fontWeight: "bold" },
    iconCollection: {
      color: "#ffffff",
      fontSize: "0.8em",
      fontWeight: "normal",
    },
    iconEdit: "edit",
    iconDelete: "rgb(244, 67, 54)",
    iconAdd: "edit",
    iconCopy: "rgb(38, 139, 210)",
    iconOk: "green",
    iconCancel: "rgb(203, 75, 22)",
  },
};

export const githubDarkEdited = ["githubDark", jsonEditCustomTheme];
export const githubLightEdited = ["githubLight", jsonEditCustomTheme];
