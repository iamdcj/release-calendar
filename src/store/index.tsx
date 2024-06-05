import { PaletteMode, useMediaQuery } from "@mui/material";
import { createContext, useReducer } from "react";

interface State {
  events: any[];
  showSidebar: boolean;
  isLoading: boolean;
  theme: PaletteMode;
}

const initialState: State = {
  events: [],
  showSidebar: true,
  isLoading: true,
  theme: "light",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SHOW_SIDEBAR":
      return {
        ...state,
        showSidebar: action.value,
      };
    case "SET_THEME":
      return {
        ...state,
        showSidebar: action.value,
      };
    case "SET_EVENTS":
      return {
        ...state,
        events: action.value,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
};

const store = {
  ...initialState,
};

const AppContext = createContext(store);

export const AppProvider = ({ children }: { children: any }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        theme: prefersDarkMode ? "dark" : "light",
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
