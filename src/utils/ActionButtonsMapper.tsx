import { IconButton, Tooltip } from "@mui/material";
import MenuButton from "../components/MenuButton";
import { Action } from "../types/ActionInterface";

export const actionButtons = (actionList: Action[]) =>
  actionList.map((action, index) => <MenuButton key={index} action={action} />);

export const actionIconButtons = (actionList: Action[]) =>
  actionList.map((action, index) => (
    <Tooltip key={index} title={action.actionDesc}>
      <IconButton
        aria-label={action.actionDesc}
        color={action.actionColor || "inherit"}
        onClick={action.actionHandler}
      >
        {action.actionIcon}
      </IconButton>
    </Tooltip>
  ));
