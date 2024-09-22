import CssBaseline from "@mui/material/CssBaseline";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { SetStateAction, useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { useLocalStorage } from "react-use";
import "./App.css";
import AppDrawer from "./components/AppDrawer";
import { darkTheme, lightTheme } from "./data/Themes";

function Home() {
  const [savedTheme, setSavedTheme] = useLocalStorage("app-theme", "dark");
  const [theme, setAppTheme] = useState(
    savedTheme == "light" ? lightTheme : darkTheme
  );

  // Custom function to set theme and update savedTheme
  const setTheme = (newTheme: SetStateAction<Theme>) => {
    setAppTheme(newTheme);
    setSavedTheme(newTheme === lightTheme ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDrawer setTheme={setTheme} appTheme={theme} />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
