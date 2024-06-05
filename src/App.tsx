import { Alert, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./Components/Calendar/Calendar";
import Header from "./Components/Header/Header";
import Slide from "@mui/material/Slide";
import { useAppContext } from "./store";

function App() {
  const { theme, notice, dispatch } = useAppContext();
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

      <Snackbar
        open={notice?.isVisible}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={() => dispatch({ type: "CLEAR_NOTICE" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notice?.type} variant="filled" sx={{ width: "100%", color: "#fff" }}>
          {notice?.content}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
