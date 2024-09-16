import {
  DataObject,
  Difference,
  Edit,
  ManageSearch,
} from "@mui/icons-material";
import { DifferenceUtility } from "../components/utilities/DifferenceUtility";
import { JSONFormatter } from "../components/utilities/JSONFormatter";
import { JSONPathUtility } from "../components/utilities/JSONPathUtility";
import { JSONTreeViewer } from "../components/utilities/JSONTreeViewer";

export interface Utility {
  component: JSX.Element;
  navIcon: JSX.Element;
  isOpen: boolean;
  tooltip: string;
  toolName: string;
}

export const mainUtilities: { [key: string]: Utility } = {
  FORMAT: {
    component: <JSONFormatter />,
    navIcon: <DataObject />,
    isOpen: true,
    tooltip: "Formatting Utilities",
    toolName: "JSON Formatter",
  },
  EDITOR: {
    component: <JSONTreeViewer />,
    navIcon: <Edit />,
    isOpen: false,
    tooltip: "JSON Editor",
    toolName: "JSON Editor",
  },
  "JSON PATH": {
    component: <JSONPathUtility />,
    navIcon: <ManageSearch />,
    isOpen: false,
    tooltip: "JSON Path Evaluation",
    toolName: "JSON Path Evaluator",
  },
};

export const extraUtilities: { [key: string]: Utility } = {
  DIFFERENCE: {
    component: <DifferenceUtility />,
    navIcon: <Difference />,
    isOpen: false,
    tooltip: "Data Difference Utility",
    toolName: "Difference Checker",
  },
};
