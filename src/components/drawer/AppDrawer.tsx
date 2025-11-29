import { HomeRepairService, MenuOpen } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { defaultEditorJSON } from "../../data/Defaults";
import { ThemeInput } from "../../data/Themes";
import { extraUtilities, mainUtilities } from "../../data/Utilities";
import { UtilityDetails } from "../../types/DrawerTypes";
import renderUtility from "../../utils/CommonUtils";
import DarkModeSwitch from "../navbar/DarkModeSwitch";
import AccentPicker from "../navbar/AccentPicker";
import GithubStarCount from "../navbar/GithubStarCount";
import SnackbarAlert, { SnackbarConfig } from "../SnackbarAlert";

export default function AppDrawer({ toggleThemeMode, appTheme, setAccentColor, accentColor }: ThemeInput) {
  const theme = useTheme();
  const [isDrawerOpen, toggleDrawer] = React.useState(true);
  const [editorData, setEditorData] = React.useState(defaultEditorJSON);
  const [currentUtility, setCurrentUtility] = React.useState(
    mainUtilities.HOME
  );
  // Snackbar Configuration
  const [snackbarConfig, setSnackbarConfig] = React.useState<SnackbarConfig>({
    open: false,
  });

  const handleDrawerOpen = () => {
    toggleDrawer(true);
  };

  const handleDrawerClose = () => {
    toggleDrawer(false);
  };

  const drawerListItems = (
    utilityMap: { [key: string]: UtilityDetails },
    open: any,
    currentUtility: any,
    setCurrentUtility: any
  ) => {
    return (
      <List>
        {Object.entries(utilityMap).map(([utilityName, utilityDetails]) => (
          <ListItem key={utilityName} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                // Reset all isOpen flags
                Object.values(mainUtilities).forEach(u => u.isOpen = false);
                Object.values(extraUtilities).forEach(u => u.isOpen = false);

                utilityDetails.isOpen = true;
                setCurrentUtility(utilityDetails);
              }}
              sx={[
                {
                  color: currentUtility.toolName === utilityDetails.toolName
                    ? appTheme?.palette.primary.main
                    : appTheme?.palette.text.disabled,
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <Tooltip title={utilityDetails.tooltip}>
                <ListItemIcon
                  sx={[
                    {
                      color: currentUtility.toolName === utilityDetails.toolName
                        ? appTheme?.palette.primary.main
                        : appTheme?.palette.text.disabled,
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: "auto",
                      },
                  ]}
                >
                  {utilityDetails.navIcon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={utilityDetails.toolName}
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
                primaryTypographyProps={{
                  variant: "button", // Apply your desired typography variant
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1, flexBasis: 0 }}>
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              isDrawerOpen && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {currentUtility["navIcon"]}
          <Typography
            sx={{ ml: "1rem" }}
            variant="button"
            fontSize={16}
            noWrap
            component="h6"
          >
            {currentUtility["toolName"]}
          </Typography>
          <Stack sx={{ ml: "auto" }} direction="row" alignItems="center">
            <DarkModeSwitch toggleThemeMode={toggleThemeMode} />
            <AccentPicker setAccentColor={setAccentColor} accentColor={accentColor} />
            <GithubStarCount owner="uniquedm" repo="json-tools" />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader sx={isDrawerOpen ? { opacity: 1 } : { opacity: 0 }}>
          <HomeRepairService fontSize="medium" color="inherit" />
          <Box sx={{ ml: 1 }}>
            {" "}
            <Typography
              variant="h6"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                letterSpacing: ".1rem",
              }}
            >
              JSON TOOLS
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <MenuOpen />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {drawerListItems(
          mainUtilities,
          isDrawerOpen,
          currentUtility,
          setCurrentUtility
        )}
        <Divider />
        {drawerListItems(
          extraUtilities,
          isDrawerOpen,
          currentUtility,
          setCurrentUtility
        )}
      </Drawer>
      <Box sx={{ flexGrow: 1, width: '100%', pt: (theme) => theme.spacing(3) }}>
        {renderUtility(currentUtility, {
          editorData: editorData,
          setEditorData: setEditorData,
          theme: appTheme,
          snackbarConfig: snackbarConfig,
          setSnackbarConfig: setSnackbarConfig,
          setUtility: setCurrentUtility,
          allUtilities: { ...mainUtilities, ...extraUtilities },
        })}
      </Box>
      <SnackbarAlert
        snackbarConfig={snackbarConfig}
        setSnackbarConfig={setSnackbarConfig}
      />
    </Box>
  );
}

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  ],
}));
