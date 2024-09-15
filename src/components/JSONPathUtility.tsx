import { Box, Stack, Skeleton, Grid2, Divider, IconButton, InputBase, Paper, Tooltip, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Editor, OnMount } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import { Close, ContentCopy, Done, Help, Search } from '@mui/icons-material';
import { JsonData, JsonEditor } from 'json-edit-react';
import { JSONPath } from 'jsonpath-plus';
import ExtraOptions from './ExtraOptions';
import { defaultEditorValue } from '../common/Constants';

export const JSONPathUtility = () => {
    // Initialize state for the input value
    const [pathValue, setPathValue] = useState('$.objectField.nestedObject');

    // Initialize state for the input value
    const [help, toggleHelp] = useState(false);

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPathValue(event.target.value);
        handleEvaluateWithInput(event.target.value);
    };

    // Correctly type the editorRef to be a monaco editor instance or null
    const editorRef = React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

    const [outputJSON, setOutputJSON] = React.useState<JsonData>({});

    const handleEditorDidMount: OnMount = (editor, _monaco) => {
        editorRef.current = editor;
    };

    const handleEvaluateWithInput = (input:string) => {
        let rawJson;
        if (!editorRef.current) {
            rawJson = defaultEditorValue;
        }
        else {
            rawJson = editorRef.current.getValue();
        }
        const json = JSON.parse(rawJson);
        const result = JSONPath({ path: input, json });
        setOutputJSON(result)
    };

    const handleEvaluate = () => {
        let rawJson;
        if (!editorRef.current) {
            rawJson = defaultEditorValue;
        }
        else {
            rawJson = editorRef.current.getValue();
        }
        const json = JSON.parse(rawJson);
        const result = JSONPath({ path: pathValue, json });
        setOutputJSON(result)
    };

    useEffect(() => {
        handleEvaluate();
    }, []);


    function handleHelpClose(): void {
        toggleHelp(false)
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid2 container sx={{ mt: 4 }} spacing={4}>
                <Grid2 size={12}>
                    <Stack spacing={2} direction="column">
                        <Stack spacing={2} direction="row">
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                                <ExtraOptions />
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="JSON Path Evaluate"
                                    value={pathValue}
                                    onChange={handleInputChange}
                                    inputProps={{ 'aria-label': 'json path evaluate' }}
                                />
                                <IconButton onClick={handleEvaluate}>
                                    <Search />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <Tooltip title="How to use?">
                                    <IconButton onClick={() => toggleHelp(true)} type="button" sx={{ p: '10px' }} aria-label="search">
                                        <Help />
                                    </IconButton>
                                </Tooltip>

                            </Paper>
                        </Stack>
                        <Grid2 container sx={{ alignItems: "stretch" }}>
                            <Grid2 size={6}>
                                <Editor
                                    height={"70vh"}
                                    theme='vs-dark'
                                    defaultLanguage="json"
                                    loading={<Skeleton variant="rounded" animation="wave" />}
                                    defaultValue={defaultEditorValue}
                                    onMount={handleEditorDidMount}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <JsonEditor
                                    rootName='result'
                                    restrictAdd={true}
                                    restrictDelete={true}
                                    restrictEdit={true}
                                    icons={{
                                        copy: <ContentCopy />,
                                        ok: <Done />,
                                        cancel: <Close />,
                                    }}
                                    theme="githubDark"
                                    data={outputJSON} />
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
                    <Button size="small" href="#" onClick={() => window.open('https://goessner.net/articles/JsonPath/', '_blank')}>Learn More</Button>
                    <TableContainer component={Paper}>
                        <Table size="small" stickyHeader sx={{ minWidth: 800 }} aria-label="xpath to jsonpath table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>XPath</TableCell>
                                    <TableCell>JSONPath</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {helpTableRows.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
        </Box>
    )
}

const helpTableRows = [
    { xpath: '/', jsonpath: '$', description: 'the root object/element' },
    { xpath: '.', jsonpath: '@', description: 'the current object/element' },
    { xpath: '/', jsonpath: '. or []', description: 'child operator' },
    { xpath: '..', jsonpath: 'n/a', description: 'parent operator' },
    { xpath: '//', jsonpath: '..', description: 'recursive descent. JSONPath borrows this syntax from E4X.' },
    { xpath: '*', jsonpath: '*', description: 'wildcard. All objects/elements regardless their names.' },
    { xpath: '@', jsonpath: 'n/a', description: "attribute access. JSON structures don't have attributes." },
    { xpath: '[]', jsonpath: '[]', description: 'subscript operator. XPath uses it to iterate over element collections and for predicates. In Javascript and JSON it is the native array operator.' },
    { xpath: '|', jsonpath: '[,]', description: 'Union operator in XPath results in a combination of node sets. JSONPath allows alternate names or array indices as a set.' },
    { xpath: 'n/a', jsonpath: '[start:end:step]', description: 'array slice operator borrowed from ES4.' },
    { xpath: '[]', jsonpath: '?()', description: 'applies a filter (script) expression.' },
    { xpath: 'n/a', jsonpath: '()', description: 'script expression, using the underlying script engine.' },
    { xpath: '()', jsonpath: 'n/a', description: 'grouping in Xpath' },
];

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};