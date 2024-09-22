import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

// Define the prop types for the Snackbar configuration
export interface SnackbarConfig {
  open: boolean;
  severity?: "error" | "warning" | "info" | "success";
  message?: string;
  duration?: number;
}

interface SnackbarAlertProps {
  snackbarConfig: SnackbarConfig;
  setSnackbarConfig: React.Dispatch<React.SetStateAction<SnackbarConfig>>;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  snackbarConfig,
  setSnackbarConfig,
}) => {
  const {
    open,
    severity = "success",
    message = "This is a success Alert inside a Snackbar!",
    duration = 6000,
  } = snackbarConfig;

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarConfig((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
