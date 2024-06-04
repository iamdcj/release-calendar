import { useState } from "react";
import {
  Box,
  FormControlLabel,
  PaletteMode,
  Switch,
  ThemeProvider,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(
    prefersDarkMode ? "dark" : ("light" as PaletteMode)
  );

  const appTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

  const isDarkMode = theme === "dark";

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        component="header"
        px={4}
        pt={2}
        pb={2}
        display="flex"
        gap={2}
        alignContent="center"
        justifyContent="space-between"
        mb={1}
        borderBottom="1px solid grey"
      >
        <Box display="flex" gap={2} alignItems="center">
          <svg
            xmlSpace="preserve"
            width="50"
            height="21.52845"
            viewBox="0 0 1000 430.569"
          >
            <g fill={`${isDarkMode ? "#fff" : "#000"}`}>
              <path d="M121.476 117.659v55.966h118.293V290.65H121.476v138.642H0V0h258.212l8.27 117.659zM613.28 65.989c40.3 41.136 60.46 90.793 60.46 148.96 0 58.59-20.163 108.45-60.46 149.59-40.307 41.134-88.92 61.701-145.842 61.701-57.34 0-106.17-20.567-146.468-61.7-40.309-41.14-60.458-91.001-60.458-149.59 0-58.17 20.15-107.825 60.458-148.961 40.297-41.136 89.127-61.704 146.468-61.704 56.92 0 105.535 20.568 145.842 61.704zM432.534 300.96c0 9.566 3.526 17.872 10.596 24.933 7.059 7.07 15.582 10.597 25.553 10.597 9.973 0 18.387-3.528 25.243-10.597 6.858-7.061 10.285-15.367 10.285-24.933V127.07c0-9.971-3.427-18.484-10.285-25.554-6.854-7.059-15.268-10.595-25.243-10.595-9.971 0-18.493 3.536-25.553 10.595-7.072 7.07-10.596 15.583-10.596 25.554V300.96z" />
              <path d="m863.26 430.569-61.052-108.758-59.147 108.758H609.503l127.2-222.6L616.498 0h137.375l50.244 92.855L854.996 0h132.92L870.257 206.696 1000 430.567H863.26z" />
            </g>
          </svg>
          <h1>Spark Release Schedule</h1>
        </Box>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} 
          checked={theme === "dark"}
          onChange={() => setTheme(isDarkMode ? "light" : "dark")} />}
          label={`${isDarkMode ? 'Dark' : 'Light'} Mode`}
        />
      </Box>
      <main className={`is--${theme}-theme`}>
        <Calendar />
      </main>
    </ThemeProvider>
  );
}

export default App;
