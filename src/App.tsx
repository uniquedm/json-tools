import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { useLocalStorage } from "react-use";
import "./App.css";
import AppDrawer from "./components/drawer/AppDrawer";
import { getTheme } from "./data/Themes";

function Home() {
  const [savedThemeMode, setSavedThemeMode] = useLocalStorage<"light" | "dark">("app-theme-mode", "dark");
  const [savedAccentColor, setSavedAccentColor] = useLocalStorage("app-accent-color", "#00B0FF");

  const themeMode = savedThemeMode || "dark";
  const accentColor = savedAccentColor || "#00B0FF";

  const theme = getTheme(themeMode, accentColor);

  const toggleThemeMode = () => {
    setSavedThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const handleSetAccentColor = (color: string) => {
    setSavedAccentColor(color);
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
          content="Edit and manipulate JSON files effortlessly with our powerful web tool."
        />
        <meta
          property="og:image"
          content="https://uniquedm.github.io/json-tools/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://uniquedm.github.io/json-tools/og-image.png"
        />
        <link rel="canonical" href="https://uniquedm.github.io/json-tools/" />
      </Helmet>
      <CssBaseline />
      <AppDrawer
        toggleThemeMode={toggleThemeMode}
        appTheme={theme}
        setAccentColor={handleSetAccentColor}
        accentColor={accentColor}
      />
    </ThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
