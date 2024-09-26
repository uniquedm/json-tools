import {
  AutoFixHigh,
  Compress,
  DataObject,
  Dehaze,
  FormatPaint,
  LinearScale,
  PlaylistRemove,
  SortByAlpha,
  SwapVert,
} from "@mui/icons-material";
import { Action } from "../types/ActionInterface";

export const createActionList = (handlers: {
  handleFormatJSON: () => void;
  handleCompactJSON: () => void;
  handleFlattenJSON: () => void;
  handleUnflattenJSON: () => void;
  handleSortJSON: () => void;
  handleReverseJSON: () => void;
  handleRepairValues: () => void;
  handleUnescapeJSON: () => void;
  handleEscapeJSON: () => void;
  handleRemoveNullValues: () => void;
}): Action[] => {
  return [
    {
      actionName: "Format",
      actionDesc: "Format JSON",
      actionIcon: <DataObject />,
      actionHandler: handlers.handleFormatJSON,
      actionColor: "primary",
    },
    {
      actionName: "Compact",
      actionDesc: "Compact JSON",
      actionIcon: <Compress />,
      actionHandler: handlers.handleCompactJSON,
      actionColor: "primary",
    },
    {
      actionName: "Flatten",
      actionDesc: "Flatten JSON",
      actionIcon: <LinearScale />,
      actionHandler: handlers.handleFlattenJSON,
      actionColor: "primary",
    },
    {
      actionName: "Unflatten",
      actionDesc: "Unflatten JSON",
      actionIcon: <Dehaze />,
      actionHandler: handlers.handleUnflattenJSON,
      actionColor: "primary",
    },
    {
      actionName: "Repair",
      actionDesc: "Repair JSON",
      actionIcon: <AutoFixHigh />,
      actionHandler: handlers.handleRepairValues,
      actionColor: "warning",
    },
    {
      actionName: "Unescape",
      actionDesc: "Remove Escape Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handlers.handleUnescapeJSON,
      actionColor: "warning",
    },
    {
      actionName: "Escape",
      actionDesc: "Escape Meta Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handlers.handleEscapeJSON,
      actionColor: "success",
    },
    {
      actionName: "Sort",
      actionDesc: "Sort JSON",
      actionIcon: <SortByAlpha />,
      actionHandler: handlers.handleSortJSON,
      actionColor: "secondary",
    },
    {
      actionName: "Reverse",
      actionDesc: "Reverse JSON",
      actionIcon: <SwapVert />,
      actionHandler: handlers.handleReverseJSON,
      actionColor: "secondary",
    },
    {
      actionName: "Remove Null",
      actionDesc: "Remove Null Values",
      actionIcon: <PlaylistRemove />,
      actionHandler: handlers.handleRemoveNullValues,
      actionColor: "inherit",
    },
  ];
};
