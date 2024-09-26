import { Button, Stack, Tooltip, Typography } from "@mui/material";
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
        <Stack direction={"column"}>
          <Tooltip title={action.actionDesc}>
            <Button
              startIcon={action.actionIcon}
              aria-label={action.actionDesc}
              color={action.actionColor || "inherit"}
              onClick={action.actionHandler}
              size={size} // size remains optional and can be undefined
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "none",
              }}
            >
              <Typography variant="button" fontSize={10}>
                {action.actionName}
              </Typography>
            </Button>
          </Tooltip>
        </Stack>
      </div>
    );
  }
);

export default MenuButton;
