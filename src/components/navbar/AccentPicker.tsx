import { Box, IconButton, Menu, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { accentColors } from "../../data/Themes";

interface AccentPickerProps {
    setAccentColor?: (color: string) => void;
    accentColor?: string;
}

export default function AccentPicker({ setAccentColor, accentColor }: AccentPickerProps) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorSelect = (color: string) => {
        if (setAccentColor) {
            setAccentColor(color);
        }
        handleClose();
    };

    return (
        <>
            <Tooltip title="Change Accent Color">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        ml: 1,
                        width: 40,
                        height: 40,
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.1)' }
                    }}
                    aria-controls={open ? "accent-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.4)',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                bgcolor: accentColor || "primary.main",
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        />
                    </Box>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="accent-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        borderRadius: 3,
                        p: 1,
                        minWidth: 180,
                        bgcolor: 'background.paper',
                    },
                }}
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                    {Object.entries(accentColors).map(([name, color]) => (
                        <Tooltip title={name} key={name} placement="top">
                            <Box
                                onClick={() => handleColorSelect(color)}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    bgcolor: color,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    border: accentColor === color ? '3px solid white' : '2px solid transparent',
                                    boxShadow: accentColor === color
                                        ? `0 0 0 2px ${color}`
                                        : 'none',
                                    '&:hover': {
                                        transform: 'scale(1.15)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                    }
                                }}
                            >
                                {accentColor === color && (
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            bgcolor: 'white',
                                        }}
                                    />
                                )}
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
            </Menu>
        </>
    );
}
