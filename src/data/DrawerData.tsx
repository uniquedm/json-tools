import { Theme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { SnackbarConfig } from "../components/features/SnackbarAlert";

export interface Utility<Props = any> {
  component: React.ReactElement<Props>; // Component that can accept props dynamically
  navIcon: JSX.Element; // Icon for the navigation
  isOpen: boolean; // Whether the utility is open
  tooltip: string; // Tooltip text for the utility
  toolName: string; // Display name of the tool
  props?: Props; // Optional props to pass to the component
}

export interface UtilityProps {
  editorData?: Record<string, any>; // JSON object to be passed into the editor
  setEditorData?: Dispatch<SetStateAction<Record<string, any>>>;
  theme?: Theme; // Optional theme with default of "vs-dark"
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>;
}
