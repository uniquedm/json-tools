import {
  AccountTree,
  DataObject,
  Difference,
  FactCheck,
  ManageSearch,
  Security,
} from "@mui/icons-material";
import { DifferenceUtility } from "../pages/DifferenceUtilityPage";
import { JSONFormatter } from "../pages/JSONFormatterPage";
import { JSONPathUtility } from "../pages/JSONPathUtilityPage";
import { JSONSchemaValidator } from "../pages/JSONSchemaPage";
import { JSONTreeViewer } from "../pages/JSONTreeViewerPage";
import { JWTUtility } from "../pages/JWTUtilityPage";
import { Utility } from "../types/UtilityInterace";

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
  AJV: {
    component: <JSONSchemaValidator />,
    navIcon: <FactCheck />,
    isOpen: false,
    tooltip: "JSON Schema Validator",
    toolName: "JSON Schema Validator",
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
