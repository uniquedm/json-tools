import { Editor } from "@monaco-editor/react";
import { FactCheck } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  FormControlLabel,
  Grid2,
  Paper,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Ajv from "ajv";
import * as monacoEditor from "monaco-editor";
import React, { useRef, useState } from "react";
import { useSessionStorage } from "react-use";
import ExtraOptions from "../components/menus/ExtraOptions";
import { darkTheme } from "../data/Themes";
import { UtilityProps } from "../types/DrawerTypes";

// Constants for editor types
const SCHEMA = "SCHEMA";
const DATA = "DATA";
const RESULT = "RESULT";

// Initial JSON schema and data to be validated
const initialSchema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo"],
  additionalProperties: false,
};

const initialData = {
  foo: 12,
  bar: "abc",
};

// Validation success message
const successMessage = {
  result: "Valid JSON",
};

export const JSONSchemaValidator: React.FC<UtilityProps> = ({
  theme = darkTheme,
  setSnackbarConfig,
}) => {
  const monacoTheme = theme === darkTheme ? "vs-dark" : "light";
  const [result, setResult] = useState<string | undefined>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [allErrors, toggleAllErrors] = useState<boolean>(true);

  // References for Schema and Data editors
  const schemaEditorRef =
    useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const dataEditorRef =
    useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  // Function to handle the editor mounting for both Schema and Data editors
  const handleEditorMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    type: typeof SCHEMA | typeof DATA
  ) => {
    if (type === SCHEMA) {
      schemaEditorRef.current = editor;
    } else if (type === DATA) {
      dataEditorRef.current = editor;
    }
  };

  // Instance of Ajv (Another JSON Schema Validator) for validation
  const ajv = new Ajv({ allErrors: allErrors });

  // Function to generate watermark overlay for each editor
  const generateWaterMark = (text: string) => (
    <Box
      sx={{
        position: "absolute",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "rgba(255, 255, 255, 0.1)",
        fontSize: "2rem",
        fontWeight: "bold",
        pointerEvents: "none",
        zIndex: 1,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </Box>
  );

  // Function to extract JSON data from the specified editor
  const getDataFromEditor = (type: typeof SCHEMA | typeof DATA) => {
    const editorRef = type === SCHEMA ? schemaEditorRef : dataEditorRef;
    let rawJson = "";

    if (editorRef.current) {
      rawJson = editorRef.current.getValue();
    }

    try {
      return JSON.parse(rawJson);
    } catch (e) {
      // Display error message if JSON parsing fails
      setSnackbarConfig?.({
        open: true,
        severity: "error",
        message: `Error Parsing "${type}": ${e}`,
        duration: 6000,
      });
      throw e;
    }
  };

  // Function to validate the schema against the data using AJV
  const handleSchemaValidation = () => {
    // Get Schema and Data from respective editors
    try {
      const schema = getDataFromEditor(SCHEMA);
      const validate = ajv.compile(schema);
      const data = getDataFromEditor(DATA);
      // Perform validation
      const isValid = validate(data);
      setIsValid(isValid);
      if (isValid) {
        setSnackbarConfig?.({
          open: true,
          severity: "success",
          message: "Valid!",
          duration: 2000,
        });
      } else {
        setSnackbarConfig?.({
          open: true,
          severity: "warning",
          message: "Not Valid!",
          duration: 2000,
        });
      }

      // Set the result based on validation outcome
      setResult(
        JSON.stringify(
          isValid
            ? successMessage
            : {
                result: "Invalid JSON",
                errors: validate.errors,
              },
          null,
          2
        )
      );
    } catch (e) {
      return;
    }
  };

  const [schemaData, setSchemaData] = useSessionStorage(
    "ajv-schema",
    JSON.stringify(initialSchema, null, 2)
  );

  const handleSchemaChange = (value: string | undefined) => {
    setSchemaData(value ?? "");
  };

  const [jsonData, setJsonData] = useSessionStorage(
    "ajv-data",
    JSON.stringify(initialData, null, 2)
  );

  const handleDataChange = (value: string | undefined) => {
    setJsonData(value ?? "");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Container for buttons and options */}
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper>
              <Stack sx={{ m: 1 }} spacing={2} direction="row">
                <ExtraOptions />
                <Button
                  startIcon={<FactCheck />}
                  color="success"
                  variant="outlined"
                  onClick={handleSchemaValidation}
                >
                  Validate
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      title="Show all errors?"
                      checked={allErrors}
                      onChange={(_e, c) => toggleAllErrors(c)}
                      inputProps={{
                        "aria-label": "Show all errors?",
                      }}
                    />
                  }
                  label={<Typography variant="overline">ALL ERRORS</Typography>}
                />
              </Stack>
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Editors and Validation Result */}
      <Grid2 container sx={{ mt: 2 }}>
        {/* Schema Editor */}
        <Grid2 size={4}>
          <Box sx={{ position: "relative" }}>
            {generateWaterMark(SCHEMA)}
            <Editor
              theme={monacoTheme}
              defaultLanguage="json"
              height={"70vh"}
              loading={<Skeleton variant="rounded" animation="wave" />}
              value={schemaData}
              onChange={handleSchemaChange}
              options={{
                minimap: { enabled: false },
              }}
              onMount={(editor) => handleEditorMount(editor, SCHEMA)}
            />
          </Box>
        </Grid2>

        {/* Data Editor */}
        <Grid2 size={4}>
          <Box sx={{ position: "relative" }}>
            {generateWaterMark(DATA)}
            <Editor
              theme={monacoTheme}
              defaultLanguage="json"
              height={"70vh"}
              loading={<Skeleton variant="rounded" animation="wave" />}
              value={jsonData}
              onChange={handleDataChange}
              options={{
                minimap: { enabled: false },
              }}
              onMount={(editor) => handleEditorMount(editor, DATA)}
            />
          </Box>
        </Grid2>

        {/* Validation Result Display */}
        <Grid2 size={4}>
          <Box sx={{ position: "relative" }}>
            {generateWaterMark(RESULT)}
            <Box
              style={{
                boxShadow: `0 0 25px ${
                  isValid
                    ? alpha(theme.palette.success.main, 1)
                    : alpha(theme.palette.error.main, 1)
                }`,
              }}
            >
              <Editor
                theme={monacoTheme}
                defaultLanguage="json"
                height={"70vh"}
                loading={<Skeleton variant="rounded" animation="wave" />}
                value={result}
                defaultValue={JSON.stringify(successMessage, null, 2)}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  lineNumbers: "off", // Disable line numbers for the result editor
                }}
              />
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};
