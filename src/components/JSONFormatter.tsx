import { Box, Stack, Button, ButtonGroup, Skeleton, Grid2, Tooltip, Paper, IconButton, Switch, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { Editor, OnMount } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import { DataObject, FormatPaint, PlaylistRemove } from '@mui/icons-material';
import ExtraOptions from './ExtraOptions';
import { defaultEditorValue } from '../common/Constants';

export const JSONFormatter = () => {

  // Correctly type the editorRef to be a monaco editor instance or null
  const editorRef = React.useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const removeNullValues = (json: any): any => {
    if (Array.isArray(json)) {
      return json
        .map(item => removeNullValues(item))
        .filter(item => item !== null);
    } else if (json !== null && typeof json === 'object') {
      return Object.entries(json).reduce((acc, [key, value]) => {
        const cleanedValue = removeNullValues(value);
        if (cleanedValue !== null) {
          acc[key] = cleanedValue;
        }
        return acc;
      }, {} as Record<string, any>);
    }
    return json;
  };

  const unescapeJSON = (escapedJsonString: string): any => {
    try {
      const unescapedString = JSON.parse(escapedJsonString);
      return JSON.parse(unescapedString);
    } catch (error) {
      console.error("Invalid escaped JSON string:", error);
      return null;
    }
  };

  // Function to handle removing null values from the JSON in the editor
  const handleRemoveNullValues = () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }

    const rawJson = editorRef.current.getValue();

    try {
      const parsedJson = JSON.parse(rawJson);
      const cleanedJson = removeNullValues(parsedJson);
      editorRef.current.setValue(JSON.stringify(cleanedJson, null, 2)); // Set cleaned JSON without formatting
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  // Function to handle unescaping an escaped JSON string and setting it in the editor
  const handleUnescapeJSON = () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }

    const escapedJsonString = editorRef.current.getValue();
    const normalJson = unescapeJSON(escapedJsonString);

    if (normalJson !== null) {
      editorRef.current.setValue(JSON.stringify(normalJson, null, 2)); // Optionally format the JSON
    }
  };

  // Function to handle unescaping an escaped JSON string and setting it in the editor
  const handleEscapeJSON = () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }

    const jsonString = editorRef.current.getValue();
    editorRef.current.setValue(JSON.stringify(jsonString));
  };

  const formatJSON = () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }

    const rawJson = editorRef.current.getValue(); // Get the raw JSON string

    if (!rawJson.trim()) {
      console.warn('Editor content is empty.');
      return;
    }

    try {
      const parsedJson = JSON.parse(rawJson); // Parse the JSON string to an object
      const prettyJson = JSON.stringify(parsedJson, null, 2); // Convert the object back to a pretty-printed JSON string
      editorRef.current.setValue(prettyJson); // Set the pretty-printed JSON in the editor
    } catch (error) {
      console.error("Invalid JSON:", error);
      editorRef.current.setValue(rawJson); // Optionally, keep the raw content in the editor
      // Optionally, you can display an error message in the UI if the JSON is invalid
    }
  };

  const handleCopy = () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }
    const rawJson = editorRef.current.getValue();
    navigator.clipboard.writeText(rawJson)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleSave = async () => {
    if (!editorRef.current) {
      console.warn('Editor is not ready.');
      return;
    }
    const data = editorRef.current.getValue();
    const jsonString = JSON.stringify(data);

    try {
      // Request file handle from user
      const fileHandle = await window.showSaveFilePicker({
        types: [{
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
          },
        }],
      });

      // Create a writable stream
      const writable = await fileHandle.createWritable();

      // Write the JSON data to the stream
      await writable.write(JSON.parse(jsonString));

      // Close the stream
      await writable.close();

    } catch (err) {
      console.error('Error saving file:', err);
      // Handle error appropriately (e.g., display an error message to the user)
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Define the Action interface
  interface Action {
    actionName: string;
    actionDesc: string;
    actionIcon: React.ReactNode;
    actionHandler: () => void;
    actionColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  }

  // Define the actionList with correct typing
  const actionList: Action[] = [
    {
      actionName: "Format",
      actionDesc: "Format JSON",
      actionIcon: <DataObject />,
      actionHandler: formatJSON,
      actionColor: 'primary'  // valid color
    },
    {
      actionName: "Remove Null",
      actionDesc: "Remove Null Values",
      actionIcon: <PlaylistRemove />,
      actionHandler: handleRemoveNullValues,
      actionColor: 'error'  // valid color
    },
    {
      actionName: "Unescape",
      actionDesc: "Remove Escape Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleUnescapeJSON,
      actionColor: 'warning'  // valid color
    },
    {
      actionName: "Escape",
      actionDesc: "Escape Meta Characters",
      actionIcon: <FormatPaint />,
      actionHandler: handleEscapeJSON,
      actionColor: 'success'  // valid color
    }
  ];

  // Map the actionList to JSX elements
  const actionButtons = actionList.map((action, index) => (
    <Tooltip key={index} title={action.actionDesc}>
      <Button
        startIcon={action.actionIcon}
        aria-label={action.actionDesc}
        color={action.actionColor || 'inherit'}  // Use a valid color
        onClick={action.actionHandler}
      >
        {action.actionName}
      </Button>
    </Tooltip>
  ));

  const actionIconButtons = actionList.map((action, index) => (
    <Tooltip key={index} title={action.actionDesc}>
      <IconButton
        aria-label={action.actionDesc}
        color={action.actionColor || 'inherit'}
        onClick={action.actionHandler}>
        {action.actionIcon}
      </IconButton>
    </Tooltip>
  ));

  const [isLabeled, toggleLabel] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleLabel(event.target.checked);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper>
              <Stack sx={{ m: 1 }} spacing={2} direction="row">
                <ExtraOptions
                  handleCopy={handleCopy}
                  handlePrint={handlePrint}
                  handleSave={handleSave}
                />
                <ButtonGroup variant="text" size="small">
                  {isLabeled ? actionButtons : actionIconButtons}
                </ButtonGroup>
                <Tooltip title="Button Label?">
                  <FormGroup>
                    <FormControlLabel control={<Switch onChange={handleChange} checked={isLabeled} />} label="" />
                  </FormGroup>
                </Tooltip>
              </Stack>
            </Paper>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1, height: "70vh" }}>
                <Editor
                  theme='vs-dark'
                  defaultLanguage="json"
                  loading={<Skeleton variant="rounded" animation="wave" />}
                  defaultValue={defaultEditorValue}
                  onMount={handleEditorDidMount}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  )
}
