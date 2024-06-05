import {
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./Components/Calendar/Calendar";
import Header from "./Components/Header/Header";
import { useAppContext } from "./store";

function App() {
  const { theme } = useAppContext()
  const appTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
