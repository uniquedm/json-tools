import { Editor, OnMount } from "@monaco-editor/react";
import {
  AutoFixHigh,
  Compress,
  DataObject,
  FormatPaint,
  PlaylistRemove,
  ReadMore,
  SortByAlpha,
  SwapVert,
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
import { jsonrepair } from "jsonrepair";
import * as monacoEditor from "monaco-editor";
import React from "react";
import { defaultEditorJSON } from "../../data/Defaults";
import { UtilityProps } from "../../data/DrawerData";
import { darkTheme } from "../../data/Themes";
import { removeNullValues } from "../commons/JSONUtilities";
import ExtraOptions from "../features/ExtraOptions";

export const JSONFormatter: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  setEditorData,
  theme = darkTheme,
  setSnackbarConfig,
}) => {
  const monacoTheme = theme === darkTheme ? "vs-dark" : "light";
  // Correctly type the editorRef to be a monaco editor instance or null
  const editorRef =
    React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const unescapeJSON = (escapedJsonString: string): any => {
    try {
      const unescapedString = JSON.parse(escapedJsonString);
      return JSON.parse(unescapedString);
    } catch (error) {
      if (setSnackbarConfig)
        if (setSnackbarConfig)
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
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "Removed null values!",
          duration: 2000,
        });
    } catch (error) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`,
          duration: 4000,
        });
    }
  };

  // Function to handle removing null values from the JSON in the editor
  const handleRepairValues = () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    const rawJson = editorRef.current.getValue();

    try {
      const repairedJson = jsonrepair(rawJson);
      const parsedJson = JSON.parse(repairedJson);
      editorRef.current.setValue(JSON.stringify(parsedJson, null, 2)); // Set cleaned JSON without formatting
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "Repaired JSON!",
          duration: 2000,
        });
    } catch (error) {
      if (setSnackbarConfig)
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
      if (setSnackbarConfig)
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
    if (setSnackbarConfig)
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: "Escape JSON!",
        duration: 2000,
      });
  };

  const handleCompactJSON = () => {
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
      const prettyJson = JSON.stringify(parsedJson, null, 0); // Convert the object back to a compacted JSON string
      editorRef.current.setValue(prettyJson); // Set the pretty-printed JSON in the editor
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "Compacted!",
          duration: 2000,
        });
    } catch (error) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`,
          duration: 4000,
        });
      editorRef.current.setValue(rawJson);
    }
  };

  const handleFormatJSON = () => {
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
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "Formatted!",
          duration: 2000,
        });
    } catch (error) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`,
          duration: 4000,
        });
      editorRef.current.setValue(rawJson);
    }
  };

  const handleSortJSON = () => {
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
      // Parse the JSON string into an object and assert it has string keys and any values
      const parsedJson = JSON.parse(rawJson) as Record<string, any>;

      // Check if the parsed JSON is an object (can only sort keys of an object)
      if (
        typeof parsedJson === "object" &&
        parsedJson !== null &&
        !Array.isArray(parsedJson)
      ) {
        // Sort the keys of the object alphabetically
        const sortedJson = Object.keys(parsedJson)
          .sort() // Sort the keys array
          .reduce((acc: Record<string, any>, key: string) => {
            acc[key] = parsedJson[key]; // Rebuild the object with sorted keys
            return acc;
          }, {});

        // Convert the sorted object back to a pretty-printed JSON string
        const prettyJson = JSON.stringify(sortedJson, null, 2); // 2 spaces for formatting

        // Set the sorted JSON in the editor
        editorRef.current.setValue(prettyJson);

        // Show success message
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "JSON sorted alphabetically!",
            duration: 2000,
          });
      } else {
        // If it's not an object, show a warning
        console.warn(
          "JSON is not an object. Sorting is only applicable to objects."
        );
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "warning",
            message: "Sorting only applies to JSON objects.",
            duration: 2000,
          });
      }
    } catch (error) {
      // Handle errors (e.g., invalid JSON)
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`,
          duration: 4000,
        });

      // Optionally, set the original raw JSON back in the editor in case of error
      editorRef.current.setValue(rawJson);
    }
  };

  const handleReverseJSON = () => {
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
      // Parse the JSON string into an object and assert it has string keys and any values
      const parsedJson = JSON.parse(rawJson) as Record<string, any>;

      // Check if the parsed JSON is an object (can only reverse keys of an object)
      if (
        typeof parsedJson === "object" &&
        parsedJson !== null &&
        !Array.isArray(parsedJson)
      ) {
        // Get the keys, reverse them, and reduce them back into an object
        const reversedJson = Object.keys(parsedJson)
          .reverse() // Reverse the order of keys
          .reduce((acc: Record<string, any>, key: string) => {
            acc[key] = parsedJson[key]; // Rebuild the object with reversed keys
            return acc;
          }, {});

        // Convert the reversed object back to a pretty-printed JSON string
        const prettyJson = JSON.stringify(reversedJson, null, 2); // 2 spaces for formatting

        // Set the reversed JSON in the editor
        editorRef.current.setValue(prettyJson);

        // Show success message
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "JSON keys reversed!",
            duration: 2000,
          });
      } else {
        // If it's not an object, show a warning
        console.warn(
          "JSON is not an object. Reversing is only applicable to objects."
        );
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "warning",
            message: "Reversing only applies to JSON objects.",
            duration: 2000,
          });
      }
    } catch (error) {
      // Handle errors (e.g., invalid JSON)
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`, // Use error.message for a cleaner message
          duration: 4000,
        });

      // Optionally, set the original raw JSON back in the editor in case of error
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
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "info",
            message: "Text copied to clipboard",
            duration: 2000,
          });
      })
      .catch((err) => {
        if (setSnackbarConfig)
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
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Error saving file: ${err}`,
          duration: 4000,
        });
    }
  };

  const handleLoadFile = async () => {
    if (!editorRef.current) {
      console.warn("Editor is not ready.");
      return;
    }

    try {
      // Request file handle from the user
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
        multiple: false, // Only allow loading one file
      });

      // Get the file object from the file handle
      const file = await fileHandle.getFile();

      // Read the file contents as text
      const fileContent = await file.text();

      // Parse the file content and set it in the editor
      try {
        const parsedJson = JSON.parse(fileContent); // Ensure it's valid JSON

        // Set the loaded JSON in the editor
        editorRef.current.setValue(JSON.stringify(parsedJson, null, 2)); // Pretty print with 2 spaces
        if (setEditorData) setEditorData(parsedJson);

        // Show success message
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "success",
            message: "JSON file loaded successfully!",
            duration: 2000,
          });
      } catch (parseError) {
        if (setSnackbarConfig)
          setSnackbarConfig({
            open: true,
            severity: "error",
            message: "Invalid JSON file. Please check the file content.",
            duration: 4000,
          });
      }
    } catch (error) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Error loading file: ${error}`,
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
      actionHandler: handleFormatJSON,
      actionColor: "primary",
    },
    {
      actionName: "Compact",
      actionDesc: "Compact JSON",
      actionIcon: <Compress />,
      actionHandler: handleCompactJSON,
      actionColor: "primary",
    },
    {
      actionName: "Sort",
      actionDesc: "Sort JSON",
      actionIcon: <SortByAlpha />,
      actionHandler: handleSortJSON,
      actionColor: "secondary",
    },
    {
      actionName: "Reverse",
      actionDesc: "Reverse JSON",
      actionIcon: <SwapVert />,
      actionHandler: handleReverseJSON,
      actionColor: "secondary",
    },
    {
      actionName: "Repair",
      actionDesc: "Repair JSON",
      actionIcon: <AutoFixHigh />,
      actionHandler: handleRepairValues,
      actionColor: "warning",
    },
    {
      actionName: "Unescape",
      actionDesc: "Remove Escape Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleUnescapeJSON,
      actionColor: "warning",
    },
    {
      actionName: "Escape",
      actionDesc: "Escape Meta Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleEscapeJSON,
      actionColor: "success",
    },
    {
      actionName: "Remove Null",
      actionDesc: "Remove Null Values",
      actionIcon: <PlaylistRemove />,
      actionHandler: handleRemoveNullValues,
      actionColor: "inherit",
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

  const [isLabeled, toggleLabel] = React.useState(true);

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
                  handleFileLoad={handleLoadFile}
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
                <ButtonGroup disableElevation variant="text" size="small">
                  {isLabeled ? actionButtons : actionIconButtons}
                </ButtonGroup>
              </Stack>
            </Paper>
            <Stack direction="row">
              <Editor
                theme={monacoTheme}
                height={"70vh"}
                defaultLanguage="json"
                loading={<Skeleton variant="rounded" animation="wave" />}
                defaultValue={JSON.stringify(editorData, null, 2)}
                onMount={handleEditorDidMount}
              />
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};
