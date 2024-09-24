import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import { JSONFormatterSettings } from "../../types/JSONFormatSettingInterface";
import TabPanel from "./VerticalTabs";

export const settingTabs = ({
  isLabeled,
  handleLabelChange,
  flattenSafe,
  handleFlattenSafe,
  flattenDepth,
  handleDepthChange,
  flattenDelimiter,
  handleDelimiterChange,
  unflattenOverwrite,
  handleUnflattenOverwrite,
  unflattenObject,
  handleUnflattenObject,
  editorMinimap,
  handleEditorMinimap,
}: JSONFormatterSettings) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (
    _event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setTabIndex(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 256,
        width: 512,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="UI" {...a11yProps(0)} />
        <Tab label="FLATTEN" {...a11yProps(1)} />
        <Tab label="UNFLATTEN" {...a11yProps(2)} />
        <Tab label="EDITOR" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <Box>
          {/* Label */}
          <FormControlLabel
            label="Button Label"
            control={
              <Checkbox
                checked={isLabeled}
                onChange={handleLabelChange}
                value={isLabeled}
              ></Checkbox>
            }
          />
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {/* Safe */}
        <Stack spacing={1}>
          <Tooltip title="When enabled, both flat and unflatten will preserve arrays and their contents">
            <FormControlLabel
              label="Safe"
              control={
                <Checkbox
                  checked={flattenSafe}
                  onChange={handleFlattenSafe}
                  value={flattenSafe}
                ></Checkbox>
              }
            />
          </Tooltip>

          <TextField
            value={flattenDepth || ""} // Use an empty string if flattenDepth is undefined
            onChange={handleDepthChange}
            type="number"
            label="Max Depth"
            fullWidth
            helperText="Max Depth for Flatten"
          />
          <TextField
            value={flattenDelimiter}
            onChange={handleDelimiterChange}
            label="Delimiter"
            fullWidth
            helperText="Default delimiter is a period (.)"
          />
        </Stack>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Tooltip title="When enabled, existing keys in the unflattened object may be overwritten if they cannot hold a newly encountered nested value">
          <FormControlLabel
            label="Overwrite"
            control={
              <Checkbox
                checked={unflattenOverwrite}
                onChange={handleUnflattenOverwrite}
                value={unflattenOverwrite}
              ></Checkbox>
            }
          />
        </Tooltip>
        <Tooltip title="When enabled, arrays will not be created automatically when calling unflatten">
          <FormControlLabel
            label="Object"
            control={
              <Checkbox
                checked={unflattenObject}
                onChange={handleUnflattenObject}
                value={unflattenObject}
              ></Checkbox>
            }
          />
        </Tooltip>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <FormControlLabel
          label="Minimap"
          control={
            <Checkbox
              checked={editorMinimap}
              onChange={handleEditorMinimap}
              value={editorMinimap}
            ></Checkbox>
          }
        />
      </TabPanel>
    </Box>
  );
};