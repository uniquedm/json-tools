import { FileOpen, MoreVert } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

interface ExtraOptionsProps {
  handleFileLoad?: () => void;
  handleCopy?: () => void;
  handleSave?: () => void;
  handlePrint?: () => void;
}

export default function ExtraOptions({
  handleFileLoad,
  handleCopy,
  handleSave,
  handlePrint,
}: ExtraOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  interface Action {
    icon: JSX.Element;
    name: string;
    onClick: (() => void) | undefined;
  }

  const actions: Action[] = [
    { icon: <FileOpen />, name: "Load", onClick: handleFileLoad },
    { icon: <FileCopyIcon />, name: "Copy", onClick: handleCopy },
    { icon: <SaveIcon />, name: "Save", onClick: handleSave },
    { icon: <PrintIcon />, name: "Print", onClick: handlePrint },
  ];

  const menuItems = actions.map((action) => (
    <MenuItem
      key={action.name}
      disabled={!action.onClick}
      onClick={() => {
        handleClose();
        if (action.onClick) action.onClick();
      }}
    >
      {action.icon}
      <Typography variant="overline">{action.name}</Typography>
    </MenuItem>
  ));

  return (
    <div>
      <Tooltip title="Options">
        <IconButton
          aria-controls={open ? "demo-customized-menu" : undefined}
          id="demo-customized-button"
          aria-haspopup="true"
          onClick={handleClick}
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems}
      </StyledMenu>
    </div>
  );
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));
