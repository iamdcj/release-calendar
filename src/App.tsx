import { useState } from "react";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const [theme, setTheme] = useState('dark' as PaletteMode);

  const appTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <main className={`is--${theme}-theme`}>
        <Calendar />
      </main>
    </ThemeProvider>
  );
}

export default App;
