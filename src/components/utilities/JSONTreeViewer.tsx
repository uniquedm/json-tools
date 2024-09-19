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
} from "@mui/material";
import { JsonEditor } from "json-edit-react";
import React from "react";
import { defaultEditorJSON } from "../../data/Defaults";
import { UtilityProps } from "../../data/DrawerData";
import {
  darkTheme,
  jsonEditCustomDarkTheme,
  jsonEditCustomTheme,
} from "../../data/Themes";
import ExtraOptions from "../features/ExtraOptions";

interface JSONEditAction {
  actionName: string;
  actionIcon: JSX.Element;
}

export const JSONTreeViewer: React.FC<UtilityProps> = ({
  editorData = defaultEditorJSON,
  theme = darkTheme,
}) => {
  const jsonEditorTheme =
    theme.appTheme.palette.mode === "dark"
      ? jsonEditCustomDarkTheme
      : jsonEditCustomTheme;
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

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid2 container sx={{ mt: 4 }} spacing={4}>
        <Grid2 size={12}>
          <Stack spacing={2} direction="column">
            <Paper>
              <Stack sx={{ m: 1 }} spacing={2} direction="row">
                <ExtraOptions />
                <Divider orientation="vertical" flexItem />
                <ToggleButtonGroup
                  value={options}
                  onChange={handleDevices}
                  aria-label="device"
                  size="small"
                  sx={{ height: 40 }}
                >
                  {toggleList}
                </ToggleButtonGroup>
                <Divider orientation="vertical" flexItem />
                <Stack spacing={-2}>
                  <Typography variant="overline">Collapse Level</Typography>
                  <Slider
                    size="small"
                    sx={{ color: "inherit" }}
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
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Show Item Count?">
                  <ToggleButton
                    value="check"
                    selected={showCount}
                    onChange={() => {
                      toggleShowCount(!showCount);
                    }}
                  >
                    <FormatListNumberedRtl />
                  </ToggleButton>
                </Tooltip>
              </Stack>
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 2, flexGrow: 1 }}>
        <JsonEditor
          showCollectionCount={showCount}
          collapse={collapseLevel}
          enableClipboard
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
      </Box>
    </Box>
  );
};
