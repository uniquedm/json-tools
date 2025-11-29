import { Editor, OnMount } from "@monaco-editor/react";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid2,
    Paper,
    Stack,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import * as monacoEditor from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { UtilityProps } from "../types/DrawerTypes";
import yaml from 'js-yaml';
import { XMLValidator } from 'fast-xml-parser';
import { defaultEditorValue, defaultXML, defaultYAML } from "../data/Defaults";
import { Delete, RestartAlt } from "@mui/icons-material";

export const ValidatorPage: React.FC<UtilityProps> = ({
    theme: propTheme,
}) => {
    const muiTheme = useTheme();
    const theme = propTheme || muiTheme;
    const monacoTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<typeof monacoEditor | null>(null);

    const [language, setLanguage] = useLocalStorage<"json" | "xml" | "yaml">("validator-language", "json");

    // Separate storage for each language to persist content when switching tabs
    const [jsonContent, setJsonContent] = useLocalStorage<string>("validator-content-json", defaultEditorValue);
    const [xmlContent, setXmlContent] = useLocalStorage<string>("validator-content-xml", defaultXML);
    const [yamlContent, setYamlContent] = useLocalStorage<string>("validator-content-yaml", defaultYAML);

    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getCurrentContent = () => {
        switch (language) {
            case "xml": return xmlContent || "";
            case "yaml": return yamlContent || "";
            default: return jsonContent || "";
        }
    };

    const setCurrentContent = (value: string) => {
        switch (language) {
            case "xml": setXmlContent(value); break;
            case "yaml": setYamlContent(value); break;
            default: setJsonContent(value); break;
        }
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
        validateContent(getCurrentContent(), language || "json");
    };

    const handleLanguageChange = (_event: React.SyntheticEvent, newValue: "json" | "xml" | "yaml") => {
        setLanguage(newValue);
        // Validation happens in useEffect when language changes
    };

    const handleEditorChange = (value: string | undefined) => {
        const newContent = value || "";
        setCurrentContent(newContent);
        validateContent(newContent, language || "json");
    };

    const validateContent = (value: string, lang: string) => {
        if (!value.trim()) {
            setIsValid(true);
            setErrorMessage("");
            if (monacoRef.current && editorRef.current) {
                monacoRef.current.editor.setModelMarkers(editorRef.current.getModel()!, "owner", []);
            }
            return;
        }

        let errorMsg = "";
        let markers: monacoEditor.editor.IMarkerData[] = [];

        try {
            if (lang === "json") {
                JSON.parse(value);
            } else if (lang === "yaml") {
                yaml.load(value);
            } else if (lang === "xml") {
                const result = XMLValidator.validate(value);
                if (result !== true) {
                    throw new Error(result.err.msg);
                }
            }
            setIsValid(true);
            setErrorMessage("");
        } catch (e: any) {
            setIsValid(false);
            errorMsg = e.message;
            setErrorMessage(errorMsg);

            let startLineNumber = 1;
            let startColumn = 1;

            if (lang === "yaml" && e.mark) {
                startLineNumber = e.mark.line + 1;
                startColumn = e.mark.column + 1;
            } else if (lang === "xml") {
                if (e.line) startLineNumber = e.line;
                if (e.col) startColumn = e.col;
            }

            markers.push({
                startLineNumber: startLineNumber,
                startColumn: startColumn,
                endLineNumber: startLineNumber,
                endColumn: startColumn + 10,
                message: errorMsg,
                severity: monacoRef.current?.MarkerSeverity.Error || 8,
            });
        }

        if (monacoRef.current && editorRef.current) {
            monacoRef.current.editor.setModelMarkers(editorRef.current.getModel()!, "owner", markers);
        }
    };

    // Re-validate when language changes
    useEffect(() => {
        if (editorRef.current && monacoRef.current) {
            validateContent(getCurrentContent(), language || "json");
        }
    }, [language, jsonContent, xmlContent, yamlContent]);

    const handleReset = () => {
        switch (language) {
            case "xml": setXmlContent(defaultXML); break;
            case "yaml": setYamlContent(defaultYAML); break;
            default: setJsonContent(defaultEditorValue); break;
        }
    };

    const handleClear = () => {
        setCurrentContent("");
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 3,
                        }}
                    >
                        <Tabs
                            value={language}
                            onChange={handleLanguageChange}
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{ minHeight: 48 }}
                        >
                            <Tab value="json" label="JSON" sx={{ textTransform: 'none', fontWeight: 600 }} />
                            <Tab value="xml" label="XML" sx={{ textTransform: 'none', fontWeight: 600 }} />
                            <Tab value="yaml" label="YAML" sx={{ textTransform: 'none', fontWeight: 600 }} />
                        </Tabs>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" color={isValid ? "success.main" : "error.main"} fontWeight="bold">
                                    {isValid ? "Valid" : "Invalid"}
                                </Typography>
                            </Box>

                            <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center' }} />

                            <ButtonGroup variant="text" size="small">
                                <Tooltip title="Reset to Default">
                                    <Button onClick={handleReset} color="primary">
                                        <RestartAlt fontSize="small" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Clear">
                                    <Button onClick={handleClear} color="error">
                                        <Delete fontSize="small" />
                                    </Button>
                                </Tooltip>
                            </ButtonGroup>
                        </Stack>
                    </Paper>
                </Grid2>

                <Grid2 size={12} sx={{ height: 'calc(75vh - 100px)' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            height: '100%',
                            overflow: 'hidden',
                            borderRadius: 3,
                            background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Editor
                            theme={monacoTheme}
                            value={getCurrentContent()}
                            language={language}
                            onChange={handleEditorChange}
                            onMount={handleEditorDidMount}
                            options={{
                                minimap: { enabled: true },
                                padding: { top: 24, bottom: 24 },
                                fontFamily: 'monospace',
                                fontSize: 14,
                                lineHeight: 24,
                                automaticLayout: true,
                            }}
                        />
                    </Paper>
                </Grid2>

                {!isValid && (
                    <Grid2 size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                background: theme.palette.mode === 'dark' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)',
                                border: `1px solid ${theme.palette.error.main}`,
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="subtitle2" color="error" fontWeight="bold" gutterBottom>
                                Error Details:
                            </Typography>
                            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'error.main', m: 0 }}>
                                {errorMessage}
                            </Typography>
                        </Paper>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
};
