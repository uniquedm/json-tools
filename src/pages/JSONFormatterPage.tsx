import { Editor, OnMount } from "@monaco-editor/react";
import { Settings } from "@mui/icons-material";
import {
  Box,
  ButtonGroup,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
} from "@mui/material";
import * as monacoEditor from "monaco-editor";
import React, { useState } from "react";
import { useLocalStorage } from "react-use";
import ExtraOptions from "../components/menus/ExtraOptions";
import { settingTabs } from "../components/menus/JSONFormatterSettings";
import SettingsDialog from "../components/menus/SettingsDialog";
import { createActionList } from "../data/ActionsList";
import { defaultEditorJSON } from "../data/Defaults";
import { darkTheme } from "../data/Themes";
import { UtilityProps } from "../types/DrawerTypes";
import { JSONFormatterSettings } from "../types/JSONFormatSettingInterface";
import { actionButtons, actionIconButtons } from "../utils/ActionButtonsMapper";
import {
  copyToClipboard,
  loadFile,
  printDocument,
  saveFile,
} from "../utils/EditorOptions";
import {
  compactJSON,
  escapeJSON,
  flattenJSON,
  formatJSON,
  removeNullValuesJSON,
  repairJSON,
  reverseJSON,
  sortJSON,
  unescapeJSONFunction,
  unflattenJSON,
} from "../utils/JSONFormatUtils";

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

  const [settings, toggleSettings] = useState<boolean>(false);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleRemoveNullValues = () => {
    removeNullValuesJSON(editorRef, setSnackbarConfig);
  };

  const handleRepairValues = () => {
    repairJSON(editorRef, setSnackbarConfig);
  };

  const handleUnescapeJSON = () => {
    unescapeJSONFunction(editorRef, setSnackbarConfig);
  };

  const handleEscapeJSON = () => {
    escapeJSON(editorRef, setSnackbarConfig);
  };

  const handleCompactJSON = () => {
    compactJSON(editorRef, setSnackbarConfig);
  };

  const handleFlattenJSON = () => {
    flattenJSON(
      editorRef,
      setSnackbarConfig,
      flattenSafe,
      flattenDepth,
      flattenDelimiter
    );
  };

  const handleUnflattenJSON = () => {
    unflattenJSON(
      editorRef,
      setSnackbarConfig,
      unflattenObject,
      unflattenOverwrite,
      flattenDelimiter
    );
  };

  const handleFormatJSON = () => {
    formatJSON(editorRef, setSnackbarConfig);
  };

  const handleSortJSON = () => {
    sortJSON(editorRef, setSnackbarConfig);
  };

  const handleReverseJSON = () => {
    reverseJSON(editorRef, setSnackbarConfig);
  };

  const handleCopy = () => {
    copyToClipboard(editorRef, setSnackbarConfig);
  };

  const handleSave = () => {
    saveFile(editorRef, setSnackbarConfig);
  };

  const handleLoadFile = () => {
    loadFile(editorRef, setSnackbarConfig, setEditorData);
  };

  const handlePrint = () => {
    printDocument();
  };

  const actionList = createActionList({
    handleFormatJSON,
    handleCompactJSON,
    handleFlattenJSON,
    handleUnflattenJSON,
    handleSortJSON,
    handleReverseJSON,
    handleRepairValues,
    handleUnescapeJSON,
    handleEscapeJSON,
    handleRemoveNullValues,
  });

  const handleSettingsReset = () => {
    // Default Values
    toggleLabel(true);
    setFlattenDelimiter(".");
    toggleFlattenSafe(false);
    removeFlattenDepth();
    setFlattenDepth(undefined);
    toggleUnflattenObject(false);
    toggleUnflattenOverwrite(false);
    toggleEditorMinimap(true);
  };

  const [isLabeled, toggleLabel, _removeLabelConfig] = useLocalStorage(
    "buttonLabels",
    true
  );

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleLabel(event.target.checked);
  };

  // Flatten / Unflatten
  const [flattenDelimiter, setFlattenDelimiter, _removeFlattenDelimiter] =
    useLocalStorage("flat-delimiter", "."); // Default delimiter is a period (.)

  const handleDelimiterChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setFlattenDelimiter(event.target.value); // Update delimiter based on user input
  };

  const [flattenSafe, toggleFlattenSafe, _removeFlattenSafe] = useLocalStorage(
    "flat-safe",
    false
  );

  const handleFlattenSafe = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleFlattenSafe(event.target.checked);
  };

  const [flattenDepth, setFlattenDepth, removeFlattenDepth] = useLocalStorage<
    undefined | number
  >("flat-max-depth");

  const handleDepthChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setFlattenDepth(value === "" ? undefined : Number(value));
  };

  const [unflattenObject, toggleUnflattenObject, _removeUnflattenObject] =
    useLocalStorage("flat-object", false);

  const handleUnflattenObject = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toggleUnflattenObject(event.target.checked);
  };

  const [
    unflattenOverwrite,
    toggleUnflattenOverwrite,
    _removeUnflattenOverwrite,
  ] = useLocalStorage("flat-overwrite", false);

  const handleUnflattenOverwrite = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toggleUnflattenOverwrite(event.target.checked);
  };

  const [editorMinimap, toggleEditorMinimap, _removeEditorMinimap] =
    useLocalStorage("editor-minimap", true);
  const handleEditorMinimap = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleEditorMinimap(event.target.checked);
  };

  const handleSettingsOpen = () => {
    toggleSettings(true);
  };

  const settingsProps: JSONFormatterSettings = {
    isLabeled: isLabeled, // Initial value
    handleLabelChange: handleLabelChange,
    flattenSafe: flattenSafe,
    handleFlattenSafe: handleFlattenSafe,
    flattenDepth: flattenDepth,
    handleDepthChange: handleDepthChange,
    flattenDelimiter: flattenDelimiter,
    handleDelimiterChange: handleDelimiterChange,
    unflattenOverwrite: unflattenOverwrite,
    handleUnflattenOverwrite: handleUnflattenOverwrite,
    unflattenObject: unflattenObject,
    handleUnflattenObject: handleUnflattenObject,
    editorMinimap: editorMinimap,
    handleEditorMinimap: handleEditorMinimap,
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <SettingsDialog
        tabs={settingTabs(settingsProps)}
        open={settings}
        setOpen={toggleSettings}
        resetSettings={handleSettingsReset}
      />
      <Grid2 container sx={{ mt: 4 }} spacing={2}>
        <Grid2 size={12}>
          <Paper>
            <Stack sx={{ m: 0, p: 0.5 }} spacing={1} direction="row">
              <ExtraOptions
                handleFileLoad={handleLoadFile}
                handleCopy={handleCopy}
                handlePrint={handlePrint}
                handleSave={handleSave}
              />
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Settings">
                <IconButton
                  sx={{ height: "40px", width: "40px" }}
                  onClick={handleSettingsOpen}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <ButtonGroup
                sx={{
                  "& .MuiButton-root": {
                    border: "none", // Remove border from each button
                  },
                  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    borderRight: "none", // Remove the dividing line between buttons
                  },
                }}
                disableElevation
                variant="text"
                size="small"
              >
                {isLabeled
                  ? actionButtons(actionList)
                  : actionIconButtons(actionList)}
              </ButtonGroup>
            </Stack>
          </Paper>
        </Grid2>
        <Grid2 size={12}>
          <Editor
            theme={monacoTheme}
            height={"70vh"}
            defaultLanguage="json"
            options={{ minimap: { enabled: editorMinimap } }}
            loading={<Skeleton variant="rounded" animation="wave" />}
            defaultValue={JSON.stringify(editorData, null, 2)}
            onMount={handleEditorDidMount}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};
