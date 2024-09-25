import CssBaseline from "@mui/material/CssBaseline";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { SetStateAction, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { useLocalStorage } from "react-use";
import "./App.css";
import AppDrawer from "./components/drawer/AppDrawer";
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
      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JSON Tools",
            "url": "https://uniquedm.github.io/json-tools/",
            "description": "A powerful tool for formatting, escaping, flattening, repairing, and validating JSON, with features like schema validation, path evaluation, and JWT decoding.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "WEB",
            "author": {
              "@type": "Person",
              "name": "UniqueDM"
            },
            "features": [
              "JSON formatting",
              "Escape/unescape JSON",
              "Flatten/unflatten JSON",
              "Compact JSON",
              "Repair JSON",
              "Sort JSON",
              "Reverse JSON",
              "JSON schema validation",
              "JSON path evaluation with autocompletion",
              "Difference checker",
              "JWT token decoding"
            ]
          }`}
        </script>
        <title>JSON Tools - Comprehensive JSON Formatting and Validation</title>
        <meta
          name="description"
          content="A powerful JSON tool offering formatting, escape/unescape, flatten/unflatten, repair, schema validation, tree view, JWT decoding, and more."
        />
        <meta
          name="keywords"
          content="JSON formatting, JSON tools, escape JSON, unescape JSON, flatten JSON, unflatten JSON, repair JSON, JSON schema validation, JSON path evaluation, JWT token decode, JSON tree view, JSON editing, JSON difference checker"
        />
        <meta
          property="og:title"
          content="JSON Tools - Comprehensive JSON Formatting and Validation"
        />
        <meta
          property="og:description"
          content="Easily format, repair, and validate JSON with advanced tools like schema validation, path evaluation, difference checker, and more."
        />
        <meta
          property="og:url"
          content="https://uniquedm.github.io/json-tools/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="JSON Tools - Manipulate JSON Effortlessly"
        />
        <meta
          property="twitter:description"
          content="Edit and manipulate JSON files effortlessly with our powerful web tool."
        />
        <link rel="canonical" href="https://uniquedm.github.io/json-tools/" />
      </Helmet>
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
