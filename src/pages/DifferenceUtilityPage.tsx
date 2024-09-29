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
  const monacoTheme = theme === darkTheme ? "vs-dark" : "light";
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
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper>
              <Stack sx={{ m: 1 }} spacing={2} direction="row">
                <ExtraOptions />
                <Divider orientation="vertical" flexItem />
                <FormControl size="small">
                  {" "}
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={editorLanguage}
                    onChange={handleChange}
                  >
                    {languageMenu}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 2 }}>
        <DiffEditor
          language={editorLanguage}
          theme={monacoTheme}
          original={originalData}
          modified={modifiedData}
          options={{
            originalEditable: true,
          }}
          height="70vh"
          loading={<Skeleton variant="rounded" animation="wave" />}
        />
      </Box>
    </Box>
  );
};
