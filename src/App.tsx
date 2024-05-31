import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Calendar />
      </main>
    </ThemeProvider>
  );
}

export default App;
