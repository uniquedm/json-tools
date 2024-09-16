import { createTheme, Theme } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

export interface ThemeInput {
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const jsonEditorCustomTheme = {
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
    input: ["#ffffff", { fontSize: "90%" }],
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

export const githubDarkEdited = ["githubDark", jsonEditorCustomTheme];
