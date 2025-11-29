import { DiffEditor } from "@monaco-editor/react";
import {
  Box,
  Divider,
  FormControl,
  Grid2,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSessionStorage } from "react-use";
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

  const handleChange = (event: SelectChangeEvent) => {
    setEditorLanguage(event.target.value);
  };

  const languageMenu = supportedLanguages.map((languageName) => (
    <MenuItem key={languageName} value={languageName}>
      <Typography variant="overline">{languageName}</Typography>
    </MenuItem>
  ));

  const [originalData, _setOriginalData] = useSessionStorage(
    "diff-original",
    defaultEditorValue
  );

  const [modifiedData, _setModifiedData] = useSessionStorage(
    "diff-modified",
    defaultModifiedValue
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }} spacing={3}>
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
              <Stack sx={{ m: 1 }} spacing={2} direction="row" alignItems="center">
                <ExtraOptions />
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
                <FormControl size="small">
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={editorLanguage}
                    onChange={handleChange}
                    sx={{
                      height: 40,
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      background: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    {languageMenu}
                  </Select>
                </FormControl>
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
