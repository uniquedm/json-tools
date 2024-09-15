import { DiffEditor } from "@monaco-editor/react"
import { Box, FormControl, Grid2, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack } from "@mui/material"
import React from "react";
import ExtraOptions from "./ExtraOptions";
import { defaultEditorValue, defaultModifiedValue, supportedLanguages } from "../common/Constants";

export const DifferenceUtility = () => {
    const [editorLanguage, setEditorLanguage] = React.useState("json");

    const handleChange = (event: SelectChangeEvent) => {
        setEditorLanguage(event.target.value);
    };

    const languageMenu = supportedLanguages.map(languageName => (
        <MenuItem sx={{}} value={languageName}>{languageName}</MenuItem>
    ))

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid2 container sx={{ mt: 4 }} spacing={4}>
                <Grid2 size={12}>
                    <Stack spacing={2} direction="column">
                        <Paper>
                            <Stack sx={{ m: 1 }} spacing={2} direction="row">
                                <ExtraOptions />
                                <FormControl size="small">
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
                    theme='vs-dark'
                    original={defaultEditorValue}
                    modified={defaultModifiedValue}
                    options={{
                        originalEditable: true,
                    }}
                    height="70vh"
                    loading={<Skeleton variant="rounded" animation="wave" />}
                />
            </Box>
        </Box>
    )
}
