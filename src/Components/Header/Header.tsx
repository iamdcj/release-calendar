import { ViewSidebar } from "@mui/icons-material";
import {
  Box,
  IconButton
} from "@mui/material";
import { useAppContext } from "../../store";
import SwitchControl from "../Controls/Switch";

function Header() {
  const version = process.env.REACT_APP_VERSION;
  const { showSidebar, theme: appTheme, dispatch } = useAppContext();
  const isDarkMode = appTheme === "dark";

  return (
    <Box
      component="header"
      px={2}
      pt={2}
      pb={2}
      display="flex"
      gap={2}
      alignContent="center"
      justifyContent="space-between"
      borderBottom="1px solid grey"
    >
      <Box display="flex" gap={2} alignItems="center">
        <svg xmlSpace="preserve" width="70" viewBox="0 0 1000 430.569">
          <g fill={`${isDarkMode ? "#fff" : "#000"}`}>
            <path d="M121.476 117.659v55.966h118.293V290.65H121.476v138.642H0V0h258.212l8.27 117.659zM613.28 65.989c40.3 41.136 60.46 90.793 60.46 148.96 0 58.59-20.163 108.45-60.46 149.59-40.307 41.134-88.92 61.701-145.842 61.701-57.34 0-106.17-20.567-146.468-61.7-40.309-41.14-60.458-91.001-60.458-149.59 0-58.17 20.15-107.825 60.458-148.961 40.297-41.136 89.127-61.704 146.468-61.704 56.92 0 105.535 20.568 145.842 61.704zM432.534 300.96c0 9.566 3.526 17.872 10.596 24.933 7.059 7.07 15.582 10.597 25.553 10.597 9.973 0 18.387-3.528 25.243-10.597 6.858-7.061 10.285-15.367 10.285-24.933V127.07c0-9.971-3.427-18.484-10.285-25.554-6.854-7.059-15.268-10.595-25.243-10.595-9.971 0-18.493 3.536-25.553 10.595-7.072 7.07-10.596 15.583-10.596 25.554V300.96z" />
            <path d="m863.26 430.569-61.052-108.758-59.147 108.758H609.503l127.2-222.6L616.498 0h137.375l50.244 92.855L854.996 0h132.92L870.257 206.696 1000 430.567H863.26z" />
          </g>
        </svg>
        <Box display="flex" flexDirection="column" gap={0.5}>
          <h1>Spark Release Schedule</h1>
          <Box component="span" fontSize={8} color="#ff6025">
            v{version} BETA
          </Box>
        </Box>
        {!showSidebar && (
          <IconButton
            aria-label="view-sidebar"
            onClick={() =>
              dispatch({
                type: "SHOW_SIDEBAR",
                value: true,
              })
            }
          >
            <ViewSidebar />
          </IconButton>
        )}
      </Box>
      <SwitchControl
        sx={{ m: 1 }}
        checked={isDarkMode}
        onChange={() =>
          dispatch({
            type: "SET_THEME",
            value: isDarkMode ? "light" : "dark",
          })
        }
      />
    </Box>
  );
}

export default Header;
