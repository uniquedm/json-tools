import { AccountTree, DataObject } from "@mui/icons-material";
import { Fab, Tooltip, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface EditorFABProps {
  isTreeView: boolean;
  toggleTreeView: () => void;
}

const EditorFAB: React.FC<EditorFABProps> = ({
  isTreeView,
  toggleTreeView,
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={isTreeView ? "JSON Editor" : "Tree Viewer"}>
      <Fab
        color="primary"
        size="large"
        variant="extended"
        onClick={toggleTreeView}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: alpha(theme.palette.primary.main, 0.8),
          backdropFilter: "blur(5px)", // Optional: Add blur effect to background
          color: "white", // Ensure text/icon color contrasts well
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 1),
            boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.6)}`, // Add primary color glow effect
          },
        }}
      >
        {isTreeView ? (
          <DataObject
            sx={{
              color: theme.palette.common.white,
            }}
          />
        ) : (
          <AccountTree
            sx={{
              color: theme.palette.common.white,
            }}
          />
        )}
        <Typography
          sx={{
            ml: "0.5rem",
            color: theme.palette.common.white,
          }}
          variant="overline"
        >
          {isTreeView ? "Text Editor" : "Tree View"}
        </Typography>
      </Fab>
    </Tooltip>
  );
};

export default EditorFAB;
