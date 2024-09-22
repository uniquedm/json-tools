import { flatten, FlattenOptions, unflatten, UnflattenOptions } from "flat";
import { jsonrepair } from "jsonrepair";
import { Dispatch, SetStateAction } from "react";
import { SnackbarConfig } from "../components/SnackbarAlert";

const handleJSONOperation = (
  editorRef: React.RefObject<any>,
  operation: (parsedJson: any) => any,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>,
  successMessage: string = "Operation successful!",
  parseRequired: boolean = true,
  resultStringify: boolean = true
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  const rawJson = editorRef.current.getValue();
  if (!rawJson.trim()) {
    console.warn("Editor content is empty.");
    return;
  }

  try {
    const parsedJson = parseRequired ? JSON.parse(rawJson) : {};
    const resultJson = operation(parseRequired ? parsedJson : rawJson);
    editorRef.current.setValue(
      resultStringify ? JSON.stringify(resultJson, null, 2) : resultJson
    );
    if (setSnackbarConfig) {
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: successMessage,
        duration: 2000,
      });
    }
  } catch (error) {
    if (setSnackbarConfig) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid JSON: ${error}`,
        duration: 4000,
      });
    }
    editorRef.current.setValue(rawJson);
  }
};

const removeNullValues = (json: any): any => {
  if (Array.isArray(json)) {
    return json
      .map((item) => removeNullValues(item))
      .filter((item) => item !== null);
  } else if (json !== null && typeof json === "object") {
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

export const sortJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => {
      return Object.keys(parsedJson)
        .sort()
        .reduce((acc: Record<string, any>, key: string) => {
          acc[key] = parsedJson[key];
          return acc;
        }, {});
    },
    setSnackbarConfig,
    "JSON sorted alphabetically!"
  );
};

export const formatJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => parsedJson,
    setSnackbarConfig,
    "Formatted!"
  );
};

export const unflattenJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>,
  unflattenObject: boolean = false,
  unflattenOverwrite: boolean = false,
  flattenDelimiter: string = "."
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => {
      const unflattenOptions: UnflattenOptions = {
        object: unflattenObject,
        overwrite: unflattenOverwrite,
        delimiter: flattenDelimiter,
      };
      return unflatten(parsedJson, unflattenOptions);
    },
    setSnackbarConfig,
    "Unflattened!"
  );
};

export const flattenJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>,
  flattenSafe: boolean = false,
  flattenDepth?: number,
  flattenDelimiter: string = "."
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => {
      const flattenOptions: FlattenOptions = {
        safe: flattenSafe,
        maxDepth: flattenDepth,
        delimiter: flattenDelimiter,
      };
      return flatten(parsedJson, flattenOptions);
    },
    setSnackbarConfig,
    "Flattened!"
  );
};

export const compactJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => JSON.stringify(parsedJson, null, 0),
    setSnackbarConfig,
    "Compacted!",
    true,
    false
  );
};

export const removeNullValuesJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    removeNullValues,
    setSnackbarConfig,
    "Removed null values!"
  );
};

export const repairJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => {
      console.log("JSON Before:", parsedJson);
      const repairedJson = jsonrepair(parsedJson);
      console.log("JSON After:", repairedJson);
      return JSON.parse(repairedJson);
    },
    setSnackbarConfig,
    "Repaired JSON!",
    false
  );
};

const unescapeJSON = (
  escapedJsonString: string,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
): Record<string, any> | null => {
  try {
    const unescapedString = JSON.parse(escapedJsonString);
    return JSON.parse(unescapedString);
  } catch (error) {
    if (setSnackbarConfig) {
      setSnackbarConfig({
        open: true,
        severity: "error",
        message: `Invalid escaped JSON string: ${error}`,
        duration: 4000,
      });
    }
    return null;
  }
};

export const unescapeJSONFunction = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  const escapedJsonString = editorRef.current.getValue();
  const normalJson = unescapeJSON(escapedJsonString, setSnackbarConfig);

  if (normalJson !== null) {
    editorRef.current.setValue(JSON.stringify(normalJson, null, 2)); // Optionally format the JSON
    if (setSnackbarConfig) {
      setSnackbarConfig({
        open: true,
        severity: "success",
        message: "Unescaped JSON!",
        duration: 2000,
      });
    }
  }
};

export const escapeJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  if (!editorRef.current) {
    console.warn("Editor is not ready.");
    return;
  }

  const jsonString = editorRef.current.getValue();
  editorRef.current.setValue(JSON.stringify(jsonString)); // Escape JSON
  if (setSnackbarConfig) {
    setSnackbarConfig({
      open: true,
      severity: "success",
      message: "Escaped JSON!",
      duration: 2000,
    });
  }
};

export const reverseJSON = (
  editorRef: React.RefObject<any>,
  setSnackbarConfig?: Dispatch<SetStateAction<SnackbarConfig>>
) => {
  handleJSONOperation(
    editorRef,
    (parsedJson) => {
      return Object.keys(parsedJson)
        .reverse()
        .reduce((acc: Record<string, any>, key: string) => {
          acc[key] = parsedJson[key];
          return acc;
        }, {});
    },
    setSnackbarConfig,
    "JSON keys reversed!"
  );
};
