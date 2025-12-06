import { AccountTree, DataObject, Difference } from "@mui/icons-material";
import { Fab, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface EditorFABProps {
  isTreeView: boolean;
  toggleTreeView: () => void;
  isDiffView: boolean;
  toggleDiffView: () => void;
}

const EditorFAB: React.FC<EditorFABProps> = ({
  isTreeView,
  toggleTreeView,
  isDiffView,
  toggleDiffView,
}) => {
  const theme = useTheme();

  const fabStyle = {
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
    backdropFilter: "blur(5px)",
    color: "white",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 1),
      boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.6)}`,
    },
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 10,
        alignItems: "end",
      }}
    >
      <Tooltip title={isDiffView ? "Close Diff View" : "Open Diff View"}>
        <Fab
          color="primary"
          size="medium" // Making it slightly smaller or keep large? The original was large. Let's keep consistent if possible, or maybe medium is better for stack. Original was size="large".
          variant="extended"
          onClick={toggleDiffView}
          sx={fabStyle}
        >
          {isDiffView ? (
            <DataObject sx={{ color: theme.palette.common.white }} />
          ) : (
            <Difference sx={{ color: theme.palette.common.white }} />
          )}
          <Typography
            sx={{
              ml: "0.5rem",
              color: theme.palette.common.white,
            }}
            variant="overline"
          >
            {isDiffView ? "Text Editor" : "Diff View"}
          </Typography>
        </Fab>
      </Tooltip>

      <Tooltip title={isTreeView ? "Close Tree View" : "Open Tree View"}>
        <Fab
          color="primary"
          size="large" // Keeping original size
          variant="extended"
          onClick={toggleTreeView}
          sx={fabStyle}
        >
          {isTreeView ? (
            <DataObject sx={{ color: theme.palette.common.white }} />
          ) : (
            <AccountTree sx={{ color: theme.palette.common.white }} />
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
    </Stack>
  );
};

export default EditorFAB;
