import {
  AccountTree,
  DataObject,
  Difference,
  ManageSearch,
  Security,
} from "@mui/icons-material";
import { DifferenceUtility } from "../components/utilities/DifferenceUtility";
import { JSONFormatter } from "../components/utilities/JSONFormatter";
import { JSONPathUtility } from "../components/utilities/JSONPathUtility";
import { JSONTreeViewer } from "../components/utilities/JSONTreeViewer";
import { JWTUtility } from "../components/utilities/JWTUtility";

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
  TREEVIEW: {
    component: <JSONTreeViewer />,
    navIcon: <AccountTree />,
    isOpen: false,
    tooltip: "JSON Tree",
    toolName: "JSON Tree",
  },
  JPATH: {
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
  JWTDECODE: {
    component: <JWTUtility />,
    navIcon: <Security />,
    isOpen: false,
    tooltip: "JWT Decoder",
    toolName: "JWT Decoder",
  },
};
