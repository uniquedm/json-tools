import { Editor, OnMount } from "@monaco-editor/react";
import { Close, ContentCopy, Done, Help } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { JsonData, JsonEditor } from "json-edit-react";
import { JSONPath } from "jsonpath-plus";
import * as monacoEditor from "monaco-editor";
import React, { useEffect, useState } from "react";
import { jsonPathHelpData } from "../../data/Constants";
import { defaultEditorJSON, defaultEditorValue } from "../../data/Defaults";
import { UtilityProps } from "../../data/DrawerData";
import {
  darkTheme,
  jsonEditCustomDarkTheme,
  jsonEditCustomTheme,
} from "../../data/Themes";
import ExtraOptions from "../features/ExtraOptions";
import SnackbarAlert, { SnackbarConfig } from "../features/SnackbarAlert";

function generateJsonPaths(
  obj: any,
  currentPath = "$",
  includeWildcard = true
) {
  const paths = new Set();

  function traverse(obj: any, currentPath: any) {
    paths.add(currentPath);

    if (typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        // Add wildcard path for the array
        if (includeWildcard) {
          const wildcardPath = `${currentPath}[*]`;
          paths.add(wildcardPath);

          // Generate paths for each element using both wildcard and specific index
          for (let i = 0; i < obj.length; i++) {
            const indexedPath = `${currentPath}[${i}]`;
            traverse(obj[i], indexedPath);
            traverse(obj[i], wildcardPath);
          }
        } else {
          // Generate paths only for each specific index
          for (let i = 0; i < obj.length; i++) {
            const indexedPath = `${currentPath}[${i}]`;
            traverse(obj[i], indexedPath);
          }
        }
      } else {
        // Iterate through each key for objects
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newPath = `${currentPath}.${key}`;
            traverse(obj[key], newPath);
          }
        }
      }
    }
  }

  traverse(obj, currentPath);
  return Array.from(paths).map((path) => ({ path })); // Convert set to array of objects with 'path'
}

export const JSONPathUtility: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  theme = darkTheme,
}) => {
  const monacoTheme = theme === darkTheme ? "vs-dark" : "light";
  const jsonEditorTheme =
    theme === darkTheme ? jsonEditCustomDarkTheme : jsonEditCustomTheme;
  // Initialize state for the input value
  const [pathValue, setPathValue] = useState<any>("$");
  const [queries, setQueries] = React.useState(
    generateJsonPaths(defaultEditorJSON, "$", true)
  );

  // Initialize state for the input value
  const [help, toggleHelp] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [previousJSON, setPreviousJSON] = useState<string>(defaultEditorValue); // Store the previous JSON state

  const handleOpen = () => {
    setOpen(true);

    (async () => {
      setLoading(true);
      if (!editorRef.current) {
        console.warn("Editor is not ready.");
        setLoading(false);
        return;
      }

      const rawJson = editorRef.current.getValue();

      // Compare with previous JSON state to check if it has changed
      if (rawJson !== previousJSON) {
        return;
      }
      try {
        let currentJSON = JSON.parse(rawJson);
        if (!currentJSON) currentJSON = {};

        // Generate new queries based on the updated JSON content
        const newQueries = generateJsonPaths(currentJSON, "$", true);
        setQueries(newQueries);

        // Update the previous JSON state
        setPreviousJSON(rawJson);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  // Handle input change for text field
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setPathValue(value);
    handleEvaluateWithInput(value);
  };

  // Handle input change for autocomplete selection
  const handleAutocompleteChange = (
    _event: React.SyntheticEvent,
    newValue: unknown,
    _reason:
      | "createOption"
      | "selectOption"
      | "removeOption"
      | "clear"
      | "blur"
      | "focus" = "selectOption",
    _details?: any // You can type this more specifically if needed
  ) => {
    const value = newValue as string | null; // Type assertion
    setPathValue(value);
    handleEvaluateWithInput(value);
  };

  // Correctly type the editorRef to be a monaco editor instance or null
  const editorRef =
    React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const [outputJSON, setOutputJSON] = React.useState<JsonData>({});

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleEvaluateWithInput = (input: any) => {
    if (!input) {
      setOutputJSON({});
      return;
    }
    let rawJson;
    if (!editorRef.current) {
      rawJson = defaultEditorValue;
    } else {
      rawJson = editorRef.current.getValue();
    }
    const json = JSON.parse(rawJson);
    const result = JSONPath({ path: input, json });
    setOutputJSON(result);
  };

  const handleEvaluate = () => {
    if (!pathValue) {
      return;
    }
    try {
      handleEvaluateWithInput(pathValue);
    } catch (error) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid JSON: ${error}`,
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    handleEvaluate();
  }, []);

  function handleHelpClose(): void {
    toggleHelp(false);
  }

  const handleCopyExpression = () => {
    navigator.clipboard
      .writeText(pathValue)
      .then(() => {
        setSnackbarConfig({
          open: true,
          severity: "info",
          message: "Expression Copied!",
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

  // Snackbar Configuration
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    open: false,
  });

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2} direction="column">
            <Stack spacing={2} direction="row">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ExtraOptions />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Autocomplete
                  id="JSON Path Query"
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onFocus={handleOpen} // Trigger on focus
                  onAbort={handleClose}
                  clearOnEscape={true}
                  onClick={handleOpen} // Trigger on click
                  loading={loading}
                  freeSolo
                  defaultValue={"$"}
                  fullWidth
                  PaperComponent={StyledPaper} // Apply custom Paper component for dropdown
                  options={queries.map((option) => option.path)}
                  onChange={handleAutocompleteChange} // Use dedicated handler
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={handleTextFieldChange} // Use dedicated handler for text input
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none", // Remove the border
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
                <Tooltip title="Copy Expression">
                  <IconButton onClick={handleCopyExpression}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip title="How to use?">
                  <IconButton
                    onClick={() => toggleHelp(true)}
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <Help color="primary" />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Stack>
            <Grid2 container sx={{ alignItems: "stretch" }}>
              <Grid2 size={6}>
                <Editor
                  height={"70vh"}
                  theme={monacoTheme}
                  defaultLanguage="json"
                  loading={<Skeleton variant="rounded" animation="wave" />}
                  defaultValue={JSON.stringify(editorData, null, 2)}
                  onMount={handleEditorDidMount}
                />
              </Grid2>
              <Grid2 size={6}>
                <JsonEditor
                  rootName="result"
                  minWidth={"100%"}
                  restrictAdd={true}
                  restrictDelete={true}
                  restrictEdit={true}
                  icons={{
                    copy: <ContentCopy />,
                    ok: <Done />,
                    cancel: <Close />,
                  }}
                  theme={jsonEditorTheme}
                  data={outputJSON}
                />
              </Grid2>
            </Grid2>
          </Stack>
        </Box>
      </Grid2>
      <Modal
        open={help}
        onClose={handleHelpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            JSONPath Syntax Overview
          </Typography>
          <Button
            size="small"
            href="#"
            onClick={() =>
              window.open("https://goessner.net/articles/JsonPath/", "_blank")
            }
          >
            Learn More
          </Button>
          <TableContainer component={Paper}>
            <Table
              size="small"
              stickyHeader
              sx={{ minWidth: "auto", overflowX: "auto", maxWidth: "100%" }}
              aria-label="xpath to jsonpath info table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>XPath</TableCell>
                  <TableCell>JSONPath</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonPathHelpData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.xpath}
                    </TableCell>
                    <TableCell>{row.jsonpath}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <SnackbarAlert
        snackbarConfig={snackbarConfig}
        setSnackbarConfig={setSnackbarConfig}
      />
    </Box>
  );
};

const StyledPaper = styled(Paper)(({}) => ({
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowX: "auto", // Enables horizontal scrolling
  maxWidth: "100%", // Ensures the box doesn't exceed its parent's width
};
