import { Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Draggable from "react-draggable";

// Type definitions for the props
interface SettingsDialogProps {
  tabs: JSX.Element;
  open: boolean;
  setOpen: (open: boolean) => void;
  resetSettings: () => void;
}

export function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function SettingsDialog({
  tabs,
  open,
  setOpen,
  resetSettings,
}: SettingsDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme(); // Access the theme
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(1px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.background.default, // Use theme background color
            color: theme.palette.text.primary, // Use theme text color
          },
        }}
      >
        <DialogTitle
          sx={{
            cursor: "move",
            backgroundColor: theme.palette.background.default,
          }}
          id="draggable-dialog-title"
        >
          <Typography fontSize={"1.2rem"} variant="overline">
            Settings
          </Typography>
        </DialogTitle>
        {tabs}
        <DialogActions
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Button onClick={resetSettings}>Reset</Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
