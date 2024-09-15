import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppDrawer from './components/AppDrawer';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { darkTheme } from './common/Themes';

function Home() {
  const [theme, setTheme] = useState(darkTheme)
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

