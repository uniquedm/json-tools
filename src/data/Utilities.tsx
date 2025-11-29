import {
  AccountTree,
  DataObject,
  Difference,
  FactCheck,
  ManageSearch,
  Security,
  Verified,
} from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import LandingPage from "../pages/LandingPage";
import { DifferenceUtility } from "../pages/DifferenceUtilityPage";
import { JSONFormatter } from "../pages/JSONFormatterPage";
import { JSONPathUtility } from "../pages/JSONPathUtilityPage";
import { JSONSchemaValidator } from "../pages/JSONSchemaPage";
import { JSONTreeViewer } from "../pages/JSONTreeViewerPage";
import JWTNodes from "../pages/JWTNodes";
import { JWTUtility } from "../pages/JWTUtilityPage";
import { Utility } from "../types/UtilityInterace";

export const mainUtilities: { [key: string]: Utility } = {
  HOME: {
    component: <LandingPage setUtility={() => { }} allUtilities={{}} />, // Placeholder prop, will be overwritten by renderUtility
    navIcon: <Home />,
    isOpen: true,
    tooltip: "Home",
    toolName: "Home",
    category: "General",
  },
  FORMAT: {
    component: <JSONFormatter />,
    navIcon: <DataObject />,
    isOpen: true,
    tooltip: "JSON Editor & Formatter",
    toolName: "JSON Editor",
    category: "JSON Tools",
  },
  TREEVIEW: {
    component: <JSONTreeViewer />,
    navIcon: <AccountTree />,
    isOpen: false,
    tooltip: "JSON Tree View / Edit",
    toolName: "JSON Tree",
    category: "JSON Tools",
  },
  JPATH: {
    component: <JSONPathUtility />,
    navIcon: <ManageSearch />,
    isOpen: false,
    tooltip: "JSON Path Evaluation",
    toolName: "JSON Path Evaluator",
    category: "JSON Tools",
  },
  AJV: {
    component: <JSONSchemaValidator />,
    navIcon: <FactCheck />,
    isOpen: false,
    tooltip: "JSON Schema Validator",
    toolName: "JSON Schema Validator",
    category: "JSON Tools",
  },
};

export const extraUtilities: { [key: string]: Utility } = {
  DIFFERENCE: {
    component: <DifferenceUtility />,
    navIcon: <Difference />,
    isOpen: false,
    tooltip: "Difference Checker",
    toolName: "Difference Checker",
    category: "Utilities",
  },
  JWTNODEEDITOR: {
    component: <JWTNodes />,
    navIcon: <Verified />,
    isOpen: false,
    tooltip: "JWT Sign / Verify",
    toolName: "JWT Sign / Verify",
    category: "JWT Tools",
  },
  JWTDECODE: {
    component: <JWTUtility />,
    navIcon: <Security />,
    isOpen: false,
    tooltip: "JWT Decoder",
    toolName: "JWT Decoder",
    category: "JWT Tools",
  },
};
