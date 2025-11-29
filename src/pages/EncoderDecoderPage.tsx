import { Delete, RestartAlt, Transform } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useState } from "react";
import { defaultBase64, defaultURL } from "../data/Defaults";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ height: "100%" }}
        >
            {value === index && (
                <Box sx={{ height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export const EncoderDecoderPage = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [urlInput, setUrlInput] = useState(defaultURL);
    const [urlOutput, setUrlOutput] = useState("");
    const [base64Input, setBase64Input] = useState(defaultBase64);
    const [base64Output, setBase64Output] = useState("");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleUrlEncode = () => {
        try {
            setUrlOutput(encodeURIComponent(urlInput));
        } catch (e) {
            setUrlOutput("Error encoding URL");
        }
    };

    const handleUrlDecode = () => {
        try {
            setUrlOutput(decodeURIComponent(urlInput));
        } catch (e) {
            setUrlOutput("Error decoding URL");
        }
    };

    const handleBase64Encode = () => {
        try {
            setBase64Output(btoa(base64Input));
        } catch (e) {
            setBase64Output("Error encoding Base64");
        }
    };

    const handleBase64Decode = () => {
        try {
            setBase64Output(atob(base64Input));
        } catch (e) {
            setBase64Output("Error decoding Base64");
        }
    };

    const handleUrlReset = () => {
        setUrlInput(defaultURL);
        setUrlOutput("");
    };

    const handleUrlClear = () => {
        setUrlInput("");
        setUrlOutput("");
    };

    const handleBase64Reset = () => {
        setBase64Input(defaultBase64);
        setBase64Output("");
    };

    const handleBase64Clear = () => {
        setBase64Input("");
        setBase64Output("");
    };

    const paperStyles = {
        background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        p: 3,
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid2 container spacing={3}>
                <Grid2 size={12}>
                    <Paper elevation={0} sx={{ ...paperStyles, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="encoder decoder tabs"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    borderRadius: '3px 3px 0 0',
                                }
                            }}
                        >
                            <Tab label="URL" {...a11yProps(0)} sx={{ fontWeight: 600 }} />
                            <Tab label="Base64" {...a11yProps(1)} sx={{ fontWeight: 600 }} />
                        </Tabs>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
                            <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center', mx: 1 }} />
                            <ButtonGroup variant="text" size="small">
                                <Tooltip title="Reset to Default">
                                    <Button onClick={value === 0 ? handleUrlReset : handleBase64Reset} color="primary">
                                        <RestartAlt fontSize="small" />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Clear">
                                    <Button onClick={value === 0 ? handleUrlClear : handleBase64Clear} color="error">
                                        <Delete fontSize="small" />
                                    </Button>
                                </Tooltip>
                            </ButtonGroup>
                        </Stack>
                    </Paper>
                </Grid2>

                <Grid2 size={12}>
                    <Paper elevation={0} sx={{ ...paperStyles, minHeight: '60vh' }}>
                        <CustomTabPanel value={value} index={0}>
                            <Stack spacing={3} sx={{ height: "100%" }}>
                                <TextField
                                    label="Input"
                                    multiline
                                    minRows={6}
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    fullWidth
                                    placeholder="Enter text to encode or decode..."
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button
                                        variant="contained"
                                        onClick={handleUrlEncode}
                                        startIcon={<Transform />}
                                        sx={{ borderRadius: 2, px: 4, py: 1 }}
                                    >
                                        Encode
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleUrlDecode}
                                        startIcon={<Transform />}
                                        sx={{ borderRadius: 2, px: 4, py: 1 }}
                                    >
                                        Decode
                                    </Button>
                                </Stack>
                                <TextField
                                    label="Output"
                                    multiline
                                    minRows={6}
                                    value={urlOutput}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    variant="filled"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            '&:before, &:after': {
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Stack>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Stack spacing={3} sx={{ height: "100%" }}>
                                <TextField
                                    label="Input"
                                    multiline
                                    minRows={6}
                                    value={base64Input}
                                    onChange={(e) => setBase64Input(e.target.value)}
                                    fullWidth
                                    placeholder="Enter text to encode or decode..."
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button
                                        variant="contained"
                                        onClick={handleBase64Encode}
                                        startIcon={<Transform />}
                                        sx={{ borderRadius: 2, px: 4, py: 1 }}
                                    >
                                        Encode
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleBase64Decode}
                                        startIcon={<Transform />}
                                        sx={{ borderRadius: 2, px: 4, py: 1 }}
                                    >
                                        Decode
                                    </Button>
                                </Stack>
                                <TextField
                                    label="Output"
                                    multiline
                                    minRows={6}
                                    value={base64Output}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    variant="filled"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                            '&:before, &:after': {
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Stack>
                        </CustomTabPanel>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
};
