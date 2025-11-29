import { Button, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Action } from "../types/ActionInterface";

interface MenuButtonProps {
  action: Action;
  size?: "small" | "medium" | "large"; // Keep size optional
}

const MenuButton = React.forwardRef<HTMLDivElement, MenuButtonProps>(
  ({ action, size }, ref) => {
    // No default value
    return (
      <div ref={ref}>
        <Tooltip title={action.actionDesc}>
          <Button
            sx={{
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textTransform: "none",
              gap: 0.5,
              minWidth: 64,
              py: 1
            }}
            aria-label={action.actionDesc}
            color={action.actionColor || "inherit"}
            onClick={action.actionHandler}
            size={size}
          >
            {action.actionIcon}
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
              {action.actionName}
            </Typography>
          </Button>
        </Tooltip>
      </div >
    );
  }
);

export default MenuButton;
