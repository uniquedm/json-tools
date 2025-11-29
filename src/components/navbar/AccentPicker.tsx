import { Circle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { accentColors } from "../../data/Themes";

interface AccentPickerProps {
    setAccentColor?: (color: string) => void;
    accentColor?: string;
}

export default function AccentPicker({ setAccentColor, accentColor }: AccentPickerProps) {
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
                    sx={{ ml: 1, width: 40, height: 40 }} // Ensure perfect circle on hover
                    aria-controls={open ? "accent-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: accentColor || "primary.main",
                            border: "2px solid",
                            borderColor: "background.paper", // Contrast border
                            boxShadow: 1,
                        }}
                    />
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
            >
                {Object.entries(accentColors).map(([name, color]) => (
                    <MenuItem key={name} onClick={() => handleColorSelect(color)}>
                        <Circle sx={{ color: color, mr: 2 }} fontSize="small" />
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
