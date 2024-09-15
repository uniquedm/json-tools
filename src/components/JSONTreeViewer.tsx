import { Box, Grid2, Paper, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material"
import { JsonEditor } from "json-edit-react"
import ExtraOptions from "./ExtraOptions"
import { defaultEditorJSON } from "../common/Constants"
import React from "react"
import { Add, Edit, Delete, Close, Done, ContentCopy } from "@mui/icons-material"

interface JSONEditAction {
    actionName: string;
    actionIcon: JSX.Element;
}

export const JSONTreeViewer = () => {
    const [options, setOptions] = React.useState(() => ['Add', 'Edit', 'Delete']);

    const actionList: JSONEditAction[] = [
        {
            actionName: "Delete",
            actionIcon: <Delete color="error" />
        },
        {
            actionName: "Edit",
            actionIcon: <Edit color="secondary" />
        },
        {
            actionName: "Add",
            actionIcon: <Add color="primary" />
        }
    ]

    const toggleList = actionList.map((action) => (
        <Tooltip title={`Toogle ${action["actionName"]}`} >
            <ToggleButton value={action["actionName"]} aria-label={action["actionName"]}>
                {action["actionIcon"]}
            </ToggleButton>
        </Tooltip>
    ))

    const handleDevices = (
        _event: React.MouseEvent<HTMLElement>,
        newDevices: string[],
    ) => {
        setOptions(newDevices);
    };
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid2 container sx={{ mt: 4 }} spacing={4}>
                <Grid2 size={12}>
                    <Stack spacing={2} direction="column">
                        <Paper>
                            <Stack sx={{ m: 1 }} spacing={2} direction="row">
                                <ExtraOptions />
                                <ToggleButtonGroup
                                    value={options}
                                    onChange={handleDevices}
                                    aria-label="device"
                                    size="small"
                                >
                                    {toggleList}
                                </ToggleButtonGroup>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid2>
            </Grid2>
            <Box sx={{ mt: 2, flexGrow: 1 }}>
                <JsonEditor
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
                    theme="githubDark"
                    data={defaultEditorJSON} />
            </Box>
        </Box>
    )
}