import { Dispatch, SetStateAction } from "react";
import { SnackbarConfig } from "../components/SnackbarAlert";

export const printDocument = () => {
  window.print();
};

export const loadFile = async (
  editorRef: React.RefObject<any>, // Adjust type based on your editor ref type
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>,
  setEditorData?: Dispatch<SetStateAction<any>> // Adjust as per your state management
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      multiple: false,
    });

    const file = await fileHandle.getFile();
    const fileContent = await file.text();

    try {
      const parsedJson = JSON.parse(fileContent);
      editorRef.current.setValue(JSON.stringify(parsedJson, null, 2)); // Pretty print
      if (setEditorData) setEditorData(parsedJson);

      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "success",
          message: "JSON file loaded successfully!",
          duration: 2000,
        });
    } catch (parseError) {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: "Invalid JSON file. Please check the file content.",
          duration: 4000,
        });
    }
  } catch (error) {
    if (setSnackbarConfig)
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Error loading file: ${error}`,
        duration: 4000,
      });
  }
};

export const saveFile = async (
  editorRef: React.RefObject<any>, // Adjust type based on your editor ref type
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  const data = editorRef.current.getValue();
  const jsonString = JSON.stringify(data);

  try {
    const fileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    });

    const writable = await fileHandle.createWritable();
    await writable.write(JSON.parse(jsonString));
    await writable.close();
  } catch (err) {
    if (setSnackbarConfig)
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Error saving file: ${err}`,
        duration: 4000,
      });
  }
};

export const copyToClipboard = (
  editorRef: React.RefObject<any>, // Adjust type based on your editor ref type
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  const rawJson = editorRef.current.getValue();
  navigator.clipboard
    .writeText(rawJson)
    .then(() => {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "info",
          message: "Text copied to clipboard",
          duration: 2000,
        });
    })
    .catch((err) => {
      if (setSnackbarConfig)
        setSnackbarConfig({
          open: true,
          severity: "error",
          message: `Failed to copy text: ${err}`,
          duration: 4000,
        });
    });
};
