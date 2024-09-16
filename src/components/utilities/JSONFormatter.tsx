import { Editor, OnMount } from "@monaco-editor/react";
import {
  DataObject,
  FormatPaint,
  PlaylistRemove,
  ReadMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import * as monacoEditor from "monaco-editor";
import React, { useState } from "react";
import { defaultEditorValue } from "../../data/Constants";
import ExtraOptions from "../features/ExtraOptions";
import SnackbarAlert, { SnackbarConfig } from "../features/SnackbarAlert";

export const JSONFormatter = () => {
  // Snackbar Configuration
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    open: false,
  });

  // Correctly type the editorRef to be a monaco editor instance or null
  const editorRef =
    React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const removeNullValues = (json: any): any => {
    if (Array.isArray(json)) {
      return json
        .map((item) => removeNullValues(item))
        .filter((item) => item !== null);
    } else if (json !== null && typeof json === "object") {
      return Object.entries(json).reduce((acc, [key, value]) => {
        const cleanedValue = removeNullValues(value);
        if (cleanedValue !== null) {
          acc[key] = cleanedValue;
        }
        return acc;
      }, {} as Record<string, any>);
    }
    return json;
  };

  const unescapeJSON = (escapedJsonString: string): any => {
    try {
      const unescapedString = JSON.parse(escapedJsonString);
      return JSON.parse(unescapedString);
    } catch (error) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid escaped JSON string: ${error}`,
        duration: 4000,
      });
      return null;
    }
  };

  // Function to handle removing null values from the JSON in the editor
  const handleRemoveNullValues = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    const rawJson = editorRef.current.getValue();

    try {
      const parsedJson = JSON.parse(rawJson);
      const cleanedJson = removeNullValues(parsedJson);
      editorRef.current.setValue(JSON.stringify(cleanedJson, null, 2)); // Set cleaned JSON without formatting
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: "Removed null values!",
        duration: 2000,
      });
    } catch (error) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid JSON: ${error}`,
        duration: 4000,
      });
    }
  };

  // Function to handle unescaping an escaped JSON string and setting it in the editor
  const handleUnescapeJSON = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    const escapedJsonString = editorRef.current.getValue();
    const normalJson = unescapeJSON(escapedJsonString);

    if (normalJson !== null) {
      editorRef.current.setValue(JSON.stringify(normalJson, null, 2)); // Optionally format the JSON
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: "Unescaped JSON!",
        duration: 2000,
      });
    }
  };

  // Function to handle unescaping an escaped JSON string and setting it in the editor
  const handleEscapeJSON = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    const jsonString = editorRef.current.getValue();
    editorRef.current.setValue(JSON.stringify(jsonString));
    setSnackbarConfig({
      open: true,
      severity: "success",
      message: "Escape JSON!",
      duration: 2000,
    });
  };

  const formatJSON = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    const rawJson = editorRef.current.getValue(); // Get the raw JSON string

    if (!rawJson.trim()) {
      console.warn("Editor content is empty.");
      return;
    }

    try {
      const parsedJson = JSON.parse(rawJson); // Parse the JSON string to an object
      const prettyJson = JSON.stringify(parsedJson, null, 2); // Convert the object back to a pretty-printed JSON string
      editorRef.current.setValue(prettyJson); // Set the pretty-printed JSON in the editor
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: "Formatted!",
        duration: 2000,
      });
    } catch (error) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid JSON: ${error}`,
        duration: 4000,
      });
      editorRef.current.setValue(rawJson);
    }
  };

  const handleCopy = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }
    const rawJson = editorRef.current.getValue();
    navigator.clipboard
      .writeText(rawJson)
      .then(() => {
        setSnackbarConfig({
          open: true,
          severity: "info",
          message: "Text copied to clipboard",
          duration: 2000,
        });
      })
      .catch((err) => {
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Failed to copy text: ${err}`,
          duration: 4000,
        });
      });
  };

  const handleSave = async () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }
    const data = editorRef.current.getValue();
    const jsonString = JSON.stringify(data);

    try {
      // Request file handle from user
      const fileHandle = await window.showSaveFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });

      // Create a writable stream
      const writable = await fileHandle.createWritable();

      // Write the JSON data to the stream
      await writable.write(JSON.parse(jsonString));

      // Close the stream
      await writable.close();
    } catch (err) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Error saving file: ${err}`,
        duration: 4000,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Define the Action interface
  interface Action {
    actionName: string;
    actionDesc: string;
    actionIcon: React.ReactNode;
    actionHandler: () => void;
    actionColor?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
  }

  // Define the actionList with correct typing
  const actionList: Action[] = [
    {
      actionName: "Format",
      actionDesc: "Format JSON",
      actionIcon: <DataObject />,
      actionHandler: formatJSON,
      actionColor: "primary", // valid color
    },
    {
      actionName: "Remove Null",
      actionDesc: "Remove Null Values",
      actionIcon: <PlaylistRemove />,
      actionHandler: handleRemoveNullValues,
      actionColor: "error", // valid color
    },
    {
      actionName: "Unescape",
      actionDesc: "Remove Escape Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleUnescapeJSON,
      actionColor: "warning", // valid color
    },
    {
      actionName: "Escape",
      actionDesc: "Escape Meta Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleEscapeJSON,
      actionColor: "success", // valid color
    },
  ];

  // Map the actionList to JSX elements
  const actionButtons = actionList.map((action, index) => (
    <Tooltip key={index} title={action.actionDesc}>
      <Button
        startIcon={action.actionIcon}
        aria-label={action.actionDesc}
        color={action.actionColor || "inherit"} // Use a valid color
        onClick={action.actionHandler}
      >
        {action.actionName}
      </Button>
    </Tooltip>
  ));

  const actionIconButtons = actionList.map((action, index) => (
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

  const [isLabeled, toggleLabel] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleLabel(event.target.checked);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper>
              <Stack sx={{ m: 1 }} spacing={1} direction="row">
                <ExtraOptions
                  handleCopy={handleCopy}
                  handlePrint={handlePrint}
                  handleSave={handleSave}
                />
                <Divider orientation="vertical" flexItem />
                <Stack direction={"column"}>
                  <Stack direction={"row"}>
                    <ReadMore fontSize="small" />
                    <Typography variant="overline" fontSize={8}>
                      LABELS
                    </Typography>
                  </Stack>
                  <Tooltip title="Button Label?">
                    <Switch
                      size="small"
                      onChange={handleChange}
                      checked={isLabeled}
                    />
                  </Tooltip>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <ButtonGroup variant="text" size="small">
                  {isLabeled ? actionButtons : actionIconButtons}
                </ButtonGroup>
              </Stack>
            </Paper>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1, height: "70vh" }}>
                <Editor
                  theme="vs-dark"
                  defaultLanguage="json"
                  loading={<Skeleton variant="rounded" animation="wave" />}
                  defaultValue={defaultEditorValue}
                  onMount={handleEditorDidMount}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <SnackbarAlert
        snackbarConfig={snackbarConfig}
        setSnackbarConfig={setSnackbarConfig}
      />
    </Box>
  );
};
