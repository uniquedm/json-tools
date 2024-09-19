import { Editor, OnMount } from "@monaco-editor/react";
import { Close, ContentCopy, Done, Help } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

export const JSONPathUtility: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  theme = darkTheme,
}) => {
  const monacoTheme =
    theme.appTheme.palette.mode === "dark" ? "vs-dark" : "light";
  const jsonEditorTheme =
    theme.appTheme.palette.mode === "dark"
      ? jsonEditCustomDarkTheme
      : jsonEditCustomTheme;
  // Initialize state for the input value
  const [pathValue, setPathValue] = useState("$.objectField.nestedObject");

  // Initialize state for the input value
  const [help, toggleHelp] = useState(false);

  // Handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPathValue(event.target.value);
    handleEvaluateWithInput(event.target.value);
  };

  // Correctly type the editorRef to be a monaco editor instance or null
  const editorRef =
    React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const [outputJSON, setOutputJSON] = React.useState<JsonData>({});

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleEvaluateWithInput = (input: string): JsonData => {
    let rawJson;
    if (!editorRef.current) {
      rawJson = defaultEditorValue;
    } else {
      rawJson = editorRef.current.getValue();
    }
    const json = JSON.parse(rawJson);
    const result = JSONPath({ path: input, json });
    setOutputJSON(result);
    return result;
  };

  const handleEvaluate = () => {
    try {
      const result = handleEvaluateWithInput(pathValue);
      setOutputJSON(result);
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
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Stack spacing={2} direction="row">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <ExtraOptions />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  required
                  placeholder="JSON Path Evaluate"
                  value={pathValue}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "json path evaluate" }}
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
        </Grid2>
      </Grid2>
      <Modal
        open={help}
        onClose={handleHelpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              sx={{ minWidth: 800 }}
              aria-label="xpath to jsonpath table"
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

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
