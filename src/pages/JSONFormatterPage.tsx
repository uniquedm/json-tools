import { Editor, OnMount } from "@monaco-editor/react";
import { Add, Close, Edit, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import * as monacoEditor from "monaco-editor";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import EditorFAB from "../components/EditorFAB";
import ExtraOptions from "../components/menus/ExtraOptions";
import { settingTabs } from "../components/menus/JSONFormatterSettings";
import SettingsDialog from "../components/menus/SettingsDialog";
import { createActionList } from "../data/ActionsList";
import { defaultEditorJSON } from "../data/Defaults";
import {
  darkTheme,
  jsonEditCustomDarkTheme,
  jsonEditCustomTheme,
} from "../data/Themes";
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
import { jsonTreeEditor } from "./JSONTreeViewerPage";

interface EditorTab {
  id: string;
  name: string;
  content: string;
}

export const JSONFormatter: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  setEditorData: _setEditorData,
  theme = darkTheme,
  setSnackbarConfig,
}) => {
  const monacoTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";
  const editorRef =
    React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const [isTreeView, setTreeView] = useState(false);
  const [settings, toggleSettings] = useState<boolean>(false);

  // --- Tab Management State ---
  const [tabs, setTabs] = useLocalStorage<EditorTab[]>("json-editor-tabs", [
    { id: "1", name: "JSON 1", content: JSON.stringify(editorData, null, 2) },
  ]);
  const [activeTabId, setActiveTabId] = useLocalStorage<string>(
    "json-editor-active-tab",
    "1"
  );

  // Ensure there's always at least one tab
  useEffect(() => {
    if (!tabs || tabs.length === 0) {
      const initialTab = {
        id: "1",
        name: "JSON 1",
        content: JSON.stringify(defaultEditorJSON, null, 2),
      };
      setTabs([initialTab]);
      setActiveTabId("1");
    }
  }, [tabs, setTabs, setActiveTabId]);

  const activeTab = tabs?.find((t) => t.id === activeTabId) || tabs?.[0];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabId(newValue);
    setTreeView(false);
  };

  const handleAddTab = () => {
    if (!tabs) return;
    const newId = (Math.max(...tabs.map((t) => parseInt(t.id))) + 1).toString();
    const newTab = { id: newId, name: `JSON ${newId}`, content: "" };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setTreeView(false);
  };

  // --- Context Menu (Rename) ---
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    tabId: string;
  } | null>(null);

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);

  const handleContextMenu = (event: React.MouseEvent, tabId: string) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
          tabId: tabId,
        }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleRenameClick = () => {
    if (contextMenu) {
      const tab = tabs?.find((t) => t.id === contextMenu.tabId);
      if (tab) {
        setNewName(tab.name);
        setRenamingTabId(contextMenu.tabId); // Store the ID separately
        setRenameDialogOpen(true);
      }
    }
    handleCloseContextMenu();
  };

  const handleRenameSubmit = () => {
    if (tabs && renamingTabId) {
      const updatedTabs = tabs.map((t) =>
        t.id === renamingTabId ? { ...t, name: newName } : t
      );
      setTabs(updatedTabs);
    }
    setRenameDialogOpen(false);
    setRenamingTabId(null);
  };

  // --- Close Warning ---
  const [closeWarningOpen, setCloseWarningOpen] = useState(false);
  const [tabToClose, setTabToClose] = useState<string | null>(null);

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    if (!tabs || tabs.length <= 1) return;

    const tab = tabs.find((t) => t.id === tabId);
    // Check if tab has meaningful content
    const hasContent =
      tab?.content &&
      tab.content.trim() !== "" &&
      tab.content.trim() !== "{}" &&
      tab.content.trim() !== "[]";

    if (hasContent) {
      setTabToClose(tabId);
      setCloseWarningOpen(true);
    } else {
      confirmCloseTab(tabId);
    }
  };

  const confirmCloseTab = (tabId: string) => {
    if (!tabs) return;
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
    setCloseWarningOpen(false);
    setTabToClose(null);
  };

  const updateActiveTabContent = (newContent: string) => {
    if (!tabs) return;
    const updatedTabs = tabs.map((tab) =>
      tab.id === activeTabId ? { ...tab, content: newContent } : tab
    );
    setTabs(updatedTabs);
  };

  // ---------------------------

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleRemoveNullValues = () => {
    setTreeView(false);
    removeNullValuesJSON(editorRef, setSnackbarConfig);
  };

  const handleRepairValues = () => {
    setTreeView(false);
    repairJSON(editorRef, setSnackbarConfig);
  };

  const handleUnescapeJSON = () => {
    setTreeView(false);
    unescapeJSONFunction(editorRef, setSnackbarConfig);
  };

  const handleEscapeJSON = () => {
    setTreeView(false);
    escapeJSON(editorRef, setSnackbarConfig);
  };

  const handleCompactJSON = () => {
    setTreeView(false);
    compactJSON(editorRef, setSnackbarConfig);
  };

  const handleFlattenJSON = () => {
    setTreeView(false);
    flattenJSON(
      editorRef,
      setSnackbarConfig,
      flattenSafe,
      flattenDepth,
      flattenDelimiter
    );
  };

  const handleUnflattenJSON = () => {
    setTreeView(false);
    unflattenJSON(
      editorRef,
      setSnackbarConfig,
      unflattenObject,
      unflattenOverwrite,
      flattenDelimiter
    );
  };

  const handleFormatJSON = () => {
    setTreeView(false);
    formatJSON(editorRef, setSnackbarConfig);
  };

  const handleSortJSON = () => {
    setTreeView(false);
    sortJSON(editorRef, setSnackbarConfig);
  };

  const handleReverseJSON = () => {
    setTreeView(false);
    reverseJSON(editorRef, setSnackbarConfig);
  };

  const handleCopy = () => {
    copyToClipboard(editorRef, setSnackbarConfig);
  };

  const handleSave = () => {
    saveFile(editorRef, setSnackbarConfig);
  };

  const handleLoadFile = () => {
    setTreeView(false);
    const setContentWrapper = (data: any) => {
      updateActiveTabContent(JSON.stringify(data, null, 2));
    };
    loadFile(editorRef, setSnackbarConfig, setContentWrapper);
  };

  const handlePrint = () => {
    printDocument();
  };

  const toggleTreeView = () => {
    setTreeView((prevValue) => !prevValue);
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

  const [flattenDelimiter, setFlattenDelimiter, _removeFlattenDelimiter] =
    useLocalStorage("flat-delimiter", ".");

  const handleDelimiterChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setFlattenDelimiter(event.target.value);
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
    isLabeled: isLabeled,
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

  const jsonEditorTheme =
    theme.palette.mode === "dark"
      ? jsonEditCustomDarkTheme
      : jsonEditCustomTheme;

  const getTreeView = () => {
    if (!activeTab?.content || !activeTab.content.trim()) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "warning",
          message: "Empty Content",
          duration: 4000,
        });
      toggleTreeView();
      return;
    }

    try {
      const parsedJson = JSON.parse(activeTab.content);
      return jsonTreeEditor(true, 99, [], jsonEditorTheme, parsedJson);
    } catch (error) {
      if (setSnackbarConfig) {
        setTreeView(false);
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Invalid JSON: ${error}`,
          duration: 4000,
        });
      }
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    updateActiveTabContent(value ?? "");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <SettingsDialog
        tabs={settingTabs(settingsProps)}
        open={settings}
        setOpen={toggleSettings}
        resetSettings={handleSettingsReset}
      />

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
        <DialogTitle>Rename Tab</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tab Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRenameSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRenameSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Close Warning Dialog */}
      <Dialog
        open={closeWarningOpen}
        onClose={() => setCloseWarningOpen(false)}
      >
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This tab contains data. Are you sure you want to close it? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCloseWarningOpen(false)}>Cancel</Button>
          <Button onClick={() => tabToClose && confirmCloseTab(tabToClose)} color="error" variant="contained" autoFocus>
            Close Tab
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleRenameClick}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Rename
        </MenuItem>
      </Menu>

      <Grid2 container sx={{ mt: 4 }} spacing={2}>
        <Grid2 size={12}>
          <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
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
                    border: "none",
                  },
                  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    borderRight: "none",
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

        {/* Main Content Area with Vertical Tabs */}
        <Grid2 size={12} sx={{ display: 'flex', flexDirection: 'row', height: '70vh', gap: 2 }}>
          {/* Editor Area */}
          <Paper elevation={3} sx={{ flexGrow: 1, position: "relative", overflow: 'hidden', borderRadius: 2 }}>
            {!isTreeView && (
              <Editor
                theme={monacoTheme}
                value={activeTab?.content || ""}
                onChange={handleEditorChange}
                height={"100%"}
                defaultLanguage="json"
                options={{ minimap: { enabled: editorMinimap }, padding: { top: 16 } }}
                loading={<Skeleton variant="rounded" animation="wave" />}
                onMount={handleEditorDidMount}
              />
            )}
            {isTreeView && getTreeView()}
            <EditorFAB
              isTreeView={isTreeView}
              toggleTreeView={toggleTreeView}
            />
          </Paper>

          {/* Vertical Tabs Area */}
          <Paper elevation={3} sx={{ width: 280, display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  Open Files
                </Typography>
                <Tooltip title="New File">
                  <IconButton onClick={handleAddTab} size="small" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                    <Add fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTabId}
              onChange={handleTabChange}
              sx={{
                flexGrow: 1,
                '& .MuiTabs-indicator': {
                  left: 0,
                  width: 4,
                  borderRadius: '0 4px 4px 0'
                }
              }}
            >
              {tabs?.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 180, fontWeight: activeTabId === tab.id ? 600 : 400 }}>
                        {tab.name}
                      </Typography>
                      {tabs.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={(e) => handleCloseTab(e, tab.id)}
                          sx={{
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            padding: 0.5,
                            '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' }
                          }}
                          className="close-btn"
                        >
                          <Close fontSize="small" sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      )}
                    </Box>
                  }
                  onContextMenu={(e) => handleContextMenu(e, tab.id)}
                  sx={{
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    minHeight: 56,
                    borderBottom: 1,
                    borderColor: 'divider',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      '& .close-btn': { opacity: 0.7 }
                    },
                    '&.Mui-selected': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      '& .close-btn': { opacity: 1 }
                    }
                  }}
                />
              ))}
            </Tabs>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};
