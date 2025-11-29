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
import ListSubheader from "@mui/material/ListSubheader";
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

  const renderDrawerList = (
    allUtilities: { [key: string]: UtilityDetails },
    open: boolean,
    currentUtility: UtilityDetails,
    setCurrentUtility: (u: UtilityDetails) => void
  ) => {
    const groupedUtilities = Object.values(allUtilities).reduce((acc, utility) => {
      const category = utility.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(utility);
      return acc;
    }, {} as { [key: string]: UtilityDetails[] });

    return (
      <List>
        {Object.entries(groupedUtilities).map(([category, utilities]) => (
          <React.Fragment key={category}>
            {open && (
              <ListSubheader
                sx={{
                  backgroundColor: "transparent",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  lineHeight: "48px",
                  color: theme.palette.text.secondary,
                }}
              >
                {category}
              </ListSubheader>
            )}
            {utilities.map((utilityDetails) => (
              <ListItem key={utilityDetails.toolName} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {
                    // Reset all isOpen flags
                    Object.values(allUtilities).forEach((u) => (u.isOpen = false));

                    utilityDetails.isOpen = true;
                    setCurrentUtility(utilityDetails);
                  }}
                  sx={[
                    {
                      color:
                        currentUtility.toolName === utilityDetails.toolName
                          ? appTheme?.palette.primary.main
                          : appTheme?.palette.text.secondary,
                      minHeight: 48,
                      px: 2.5,
                      mx: 1,
                      borderRadius: 2,
                      mb: 0.5,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: appTheme?.palette.mode === 'dark'
                          ? `${appTheme?.palette.primary.main}15`
                          : `${appTheme?.palette.primary.main}10`,
                        transform: "translateX(4px)",
                        boxShadow: appTheme?.palette.mode === 'dark'
                          ? `0 4px 12px -4px ${appTheme?.palette.primary.main}40`
                          : `0 4px 12px -4px ${appTheme?.palette.primary.main}20`,
                      },
                      ...(currentUtility.toolName === utilityDetails.toolName && {
                        backgroundColor: appTheme?.palette.mode === 'dark'
                          ? `${appTheme?.palette.primary.main}20`
                          : `${appTheme?.palette.primary.main}15`,
                        fontWeight: "bold",
                      })
                    },
                    open
                      ? {
                        justifyContent: "initial",
                      }
                      : {
                        justifyContent: "center",
                        px: 1, // Reduce padding when closed
                      },
                  ]}
                >
                  <Tooltip title={utilityDetails.tooltip} placement="right">
                    <ListItemIcon
                      sx={[
                        {
                          color:
                            currentUtility.toolName === utilityDetails.toolName
                              ? appTheme?.palette.primary.main
                              : "inherit",
                          minWidth: 0,
                          justifyContent: "center",
                          transition: "color 0.2s",
                        },
                        open
                          ? {
                            mr: 3,
                          }
                          : {
                            mr: 0,
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
                          display: "none",
                        },
                    ]}
                    primaryTypographyProps={{
                      variant: "button",
                      fontWeight: currentUtility.toolName === utilityDetails.toolName ? 700 : 500,
                      fontSize: "0.875rem",
                      textTransform: "none", // More modern look
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
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
        {renderDrawerList(
          { ...mainUtilities, ...extraUtilities },
          isDrawerOpen,
          currentUtility,
          setCurrentUtility
        )}
      </Drawer>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <DrawerHeader />
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
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRight: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === 'dark' ? '5px 0 30px rgba(0,0,0,0.5)' : '5px 0 30px rgba(0,0,0,0.05)',
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  ],
}));
