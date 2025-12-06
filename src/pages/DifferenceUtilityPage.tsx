import { DiffEditor } from "@monaco-editor/react";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, Lock, LockOpen, RestartAlt } from "@mui/icons-material";
import React from "react";
import { useLocalStorage, useSessionStorage } from "react-use";
import ExtraOptions from "../components/menus/ExtraOptions";
import { supportedLanguages } from "../data/Constants";
import { defaultEditorValue, defaultModifiedValue } from "../data/Defaults";
import { darkTheme } from "../data/Themes";
import { UtilityProps } from "../types/DrawerTypes";

export const DifferenceUtility: React.FC<UtilityProps> = ({
  theme = darkTheme,
}) => {
  const muiTheme = useTheme();
  const monacoTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";
  const [editorLanguage, setEditorLanguage] = React.useState("json");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const commonLanguages = ["json", "xml", "yaml", "plaintext"];
  const otherLanguages = supportedLanguages.filter(lang => !commonLanguages.includes(lang));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setEditorLanguage(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (lang: string) => {
    setEditorLanguage(lang);
    handleMenuClose();
  };

  // Lock State
  const [isLocked, setIsLocked] = useLocalStorage("diff-is-locked", false);

  // Session Storage (Volatile)
  const [sessionOriginal, setSessionOriginal] = useSessionStorage("diff-original", defaultEditorValue);
  const [sessionModified, setSessionModified] = useSessionStorage("diff-modified", defaultModifiedValue);

  // Local Storage (Persistent)
  const [localOriginal, setLocalOriginal] = useLocalStorage("diff-original-saved", defaultEditorValue);
  const [localModified, setLocalModified] = useLocalStorage("diff-modified-saved", defaultModifiedValue);

  // Derived State
  const originalData = isLocked ? localOriginal : sessionOriginal;
  const modifiedData = isLocked ? localModified : sessionModified;

  const handleToggleLock = () => {
    if (!isLocked) {
      // Locking: Save current session data to local
      setLocalOriginal(sessionOriginal || "");
      setLocalModified(sessionModified || "");
    } else {
      // Unlocking: Restore local data to session (optional, keeps continuity)
      setSessionOriginal(localOriginal || "");
      setSessionModified(localModified || "");
    }
    setIsLocked(!isLocked);
  };

  const handleReset = () => {
    if (isLocked) {
      setLocalOriginal(defaultEditorValue);
      setLocalModified(defaultModifiedValue);
    } else {
      setSessionOriginal(defaultEditorValue);
      setSessionModified(defaultModifiedValue);
    }
  };


  // Update storage when lock state changes to ensure listeners use correct setter
  // Actually, the listeners capture the scope. We need refs or effect to handle dynamic isLocked.
  // Better: Use a ref for isLocked in the listener, or update state in useEffect.
  // However, Monaco listeners are added once.
  // Let's use a Ref for isLocked to access current value in callbacks.
  const isLockedRef = React.useRef(isLocked);
  React.useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // We also need refs for setters to avoid stale closures if we re-bind listeners (which we shouldn't do)
  // But simpler: just use the ref in the callback.

  // Re-implement handleEditorDidMount to use refs
  const handleEditorDidMountWithRef = (editor: any) => {
    const originalEditor = editor.getOriginalEditor();
    const modifiedEditor = editor.getModifiedEditor();

    originalEditor.onDidChangeModelContent(() => {
      const value = originalEditor.getValue();
      if (isLockedRef.current) {
        setLocalOriginal(value);
      } else {
        setSessionOriginal(value);
      }
    });

    modifiedEditor.onDidChangeModelContent(() => {
      const value = modifiedEditor.getValue();
      if (isLockedRef.current) {
        setLocalModified(value);
      } else {
        setSessionModified(value);
      }
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper
              elevation={0}
              sx={{
                p: 1,
                background: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${muiTheme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <Stack sx={{ m: 1 }} spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <ExtraOptions />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />

                  <Tabs
                    value={commonLanguages.includes(editorLanguage) ? editorLanguage : false}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontWeight: 600 } }}
                  >
                    {commonLanguages.map((lang) => (
                      <Tab key={lang} value={lang} label={lang.toUpperCase()} />
                    ))}
                  </Tabs>

                  <Box>
                    <Button
                      endIcon={<KeyboardArrowDown />}
                      onClick={handleMenuOpen}
                      variant={!commonLanguages.includes(editorLanguage) ? "contained" : "text"}
                      disableElevation
                      color={!commonLanguages.includes(editorLanguage) ? "primary" : "inherit"}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        minHeight: 40,
                        px: 2
                      }}
                    >
                      {!commonLanguages.includes(editorLanguage) ? editorLanguage.toUpperCase() : "More"}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        style: {
                          maxHeight: 300,
                          width: '20ch',
                        },
                      }}
                    >
                      {otherLanguages.map((lang) => (
                        <MenuItem
                          key={lang}
                          selected={lang === editorLanguage}
                          onClick={() => handleMenuSelect(lang)}
                        >
                          {lang.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Tooltip title="Reset to Default">
                    <Button onClick={handleReset} color="primary" sx={{ minWidth: 40 }}>
                      <RestartAlt />
                    </Button>
                  </Tooltip>
                  <Tooltip title={isLocked ? "Locked: Data persists in local storage" : "Unlocked: Data is temporary (session storage)"}>
                    <Button
                      onClick={handleToggleLock}
                      variant={isLocked ? "contained" : "outlined"}
                      color={isLocked ? "warning" : "primary"}
                      startIcon={isLocked ? <Lock /> : <LockOpen />}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      {isLocked ? "Locked" : "Unlocked"}
                    </Button>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 0,
            overflow: 'hidden',
            borderRadius: 3,
            background: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${muiTheme.palette.divider}`,
          }}
        >
          <DiffEditor
            language={editorLanguage}
            theme={monacoTheme}
            original={originalData}
            modified={modifiedData}
            onMount={handleEditorDidMountWithRef}
            options={{
              originalEditable: true,
              padding: { top: 16, bottom: 16 },
            }}
            height="70vh"
            loading={<Skeleton variant="rounded" animation="wave" />}
          />
        </Paper>
      </Box>
    </Box>
  );
};
