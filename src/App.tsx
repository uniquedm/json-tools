import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { darkTheme } from "./common/Themes";
import AppDrawer from "./components/AppDrawer";

function Home() {
  const [theme, setTheme] = useState(darkTheme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDrawer setTheme={setTheme} />
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
