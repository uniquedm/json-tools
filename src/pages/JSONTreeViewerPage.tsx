import {
  Add,
  Close,
  ContentCopy,
  Delete,
  Done,
  Edit,
  FormatListNumberedRtl,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid2,
  Paper,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { JsonEditor } from "json-edit-react";
import React from "react";
import { useSessionStorage } from "react-use";
import ExtraOptions from "../components/menus/ExtraOptions";
import { defaultEditorJSON } from "../data/Defaults";
import {
  darkTheme,
  jsonEditCustomDarkTheme,
  jsonEditCustomTheme,
} from "../data/Themes";
import { UtilityProps } from "../types/DrawerTypes";

interface JSONEditAction {
  actionName: string;
  actionIcon: JSX.Element;
}

export const JSONTreeViewer: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  theme = darkTheme,
}) => {
  const muiTheme = useTheme();
  const jsonEditorTheme =
    theme.palette.mode === "dark" ? jsonEditCustomDarkTheme : jsonEditCustomTheme;
  const [options, setOptions] = React.useState(() => ["Add", "Edit", "Delete"]);
  const actionList: JSONEditAction[] = [
    {
      actionName: "Delete",
      actionIcon: <Delete color="error" />,
    },
    {
      actionName: "Edit",
      actionIcon: <Edit color="secondary" />,
    },
    {
      actionName: "Add",
      actionIcon: <Add color="primary" />,
    },
  ];

  const toggleList = actionList.map((action) => (
    <Tooltip key={action.actionName} title={`Toogle ${action["actionName"]}`}>
      <ToggleButton
        key={action.actionName}
        value={action["actionName"]}
        aria-label={action["actionName"]}
      >
        {action["actionIcon"]}
      </ToggleButton>
    </Tooltip>
  ));

  const handleDevices = (
    _event: React.MouseEvent<HTMLElement>,
    newDevices: string[]
  ) => {
    setOptions(newDevices);
  };

  const [collapseLevel, setCollapseLevel] = React.useState<number>(1);
  const [showCount, toggleShowCount] = React.useState<boolean>(false);

  const [editorContent, _setEditorContent] = useSessionStorage(
    "editorContent",
    JSON.stringify(editorData, null, 2)
  );

  try {
    editorData = JSON.parse(editorContent);
  } catch (err) {
    console.warn("Invalid Editor Content, switching to default.");
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }} spacing={3}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper
              elevation={0}
              sx={{
                background: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${muiTheme.palette.divider}`,
                borderRadius: 3,
                p: 1
              }}
            >
              <Stack sx={{ m: 1 }} spacing={2} direction="row" alignItems="center">
                <ExtraOptions />
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
                <ToggleButtonGroup
                  value={options}
                  onChange={handleDevices}
                  aria-label="device"
                  size="small"
                  sx={{
                    height: 40,
                    '& .MuiToggleButton-root': {
                      border: 'none',
                      borderRadius: 2,
                      mx: 0.5,
                      '&:hover': {
                        background: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      },
                      '&.Mui-selected': {
                        background: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                      }
                    }
                  }}
                >
                  {toggleList}
                </ToggleButtonGroup>
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
                <Stack spacing={0} direction="row" alignItems="center" sx={{ gap: 2, width: 200 }}>
                  <Typography variant="caption" sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>Collapse Level</Typography>
                  <Slider
                    size="small"
                    sx={{ color: "primary.main" }}
                    aria-labelledby="collapse-level-slider-label"
                    aria-label="Collapse Level"
                    defaultValue={collapseLevel}
                    value={collapseLevel}
                    onChange={(_event, value) => {
                      setCollapseLevel(value as number);
                    }}
                    valueLabelDisplay="auto"
                    shiftStep={3}
                    step={1}
                    marks
                    min={0}
                    max={10}
                  />
                </Stack>
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
                <Tooltip title="Show Item Count?">
                  <ToggleButton
                    value="check"
                    selected={showCount}
                    onChange={() => {
                      toggleShowCount(!showCount);
                    }}
                    sx={{
                      border: 'none',
                      borderRadius: 2,
                      '&:hover': {
                        background: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      },
                      '&.Mui-selected': {
                        background: muiTheme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                      }
                    }}
                  >
                    <FormatListNumberedRtl />
                  </ToggleButton>
                </Tooltip>
              </Stack>
            </Paper>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              background: muiTheme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${muiTheme.palette.divider}`,
            }}
          >
            {jsonTreeEditor(
              showCount,
              collapseLevel,
              options,
              jsonEditorTheme,
              editorData
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export function jsonTreeEditor(
  showCount: boolean,
  collapseLevel: number,
  options: string[],
  jsonEditorTheme: {
    displayName: string;
    styles: {
      container: {
        backgroundColor: string;
        fontFamily: string;
        borderRadius: number;
      };
    };
  },
  editorData:
    | Record<string, any>
    | {
      stringField: string;
      numberField: number;
      booleanField: boolean;
      nullField: null;
      arrayField: (
        | string
        | number
        | boolean
        | { nestedObject: string }
        | null
      )[];
      objectField: {
        nestedString: string;
        nestedNumber: number;
        nestedBoolean: boolean;
        nestedArray: number[];
        nestedObject: { deepNestedField: string };
      };
    }
) {
  return (
    <JsonEditor
      showCollectionCount={showCount}
      collapse={collapseLevel}
      enableClipboard
      minWidth={"100%"}
      icons={{
        add: <Add />,
        edit: <Edit />,
        delete: <Delete />,
        copy: <ContentCopy />,
        ok: <Done />,
        cancel: <Close />,
      }}
      restrictEdit={!options.includes("Edit")}
      restrictAdd={!options.includes("Add")}
      restrictDelete={!options.includes("Delete")}
      theme={jsonEditorTheme}
      data={editorData}
    />
  );
}
