import {
  AccountTree,
  DataObject,
  Difference,
  FactCheck,
  ManageSearch,
  Security,
  Verified,
} from "@mui/icons-material";
import { DifferenceUtility } from "../pages/DifferenceUtilityPage";
import { JSONFormatter } from "../pages/JSONFormatterPage";
import { JSONPathUtility } from "../pages/JSONPathUtilityPage";
import { JSONSchemaValidator } from "../pages/JSONSchemaPage";
import { JSONTreeViewer } from "../pages/JSONTreeViewerPage";
import JWTNodes from "../pages/JWTNodes";
import { JWTUtility } from "../pages/JWTUtilityPage";
import { Utility } from "../types/UtilityInterace";

export const mainUtilities: { [key: string]: Utility } = {
  FORMAT: {
    component: <JSONFormatter />,
    navIcon: <DataObject />,
    isOpen: true,
    tooltip: "JSON Formatting Tools",
    toolName: "JSON Formatter",
  },
  TREEVIEW: {
    component: <JSONTreeViewer />,
    navIcon: <AccountTree />,
    isOpen: false,
    tooltip: "JSON Tree View / Edit",
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
    tooltip: "Difference Checker",
    toolName: "Difference Checker",
  },
  JWTNODEEDITOR: {
    component: <JWTNodes />,
    navIcon: <Verified />,
    isOpen: false,
    tooltip: "JWT Sign / Verify",
    toolName: "JWT Sign / Verify",
  },
  JWTDECODE: {
    component: <JWTUtility />,
    navIcon: <Security />,
    isOpen: false,
    tooltip: "JWT Decoder",
    toolName: "JWT Decoder",
  },
};
