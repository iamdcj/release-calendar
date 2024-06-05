import { PaletteMode, useMediaQuery } from "@mui/material";
import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";
import { Event } from "../_types";

interface State {
  events: any[];
  showSidebar: boolean;
  isLoading: boolean;
  theme: PaletteMode;
  release: null | Event;
  currentView: string;
}

const initialState: State = {
  events: [],
  showSidebar: true,
  isLoading: true,
  theme: "light",
  release: null,
  currentView: "timeGridWeek",
};

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: any }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, dispatch] = useReducer(reducer, initialState, (state) => ({
    ...state,
    theme: prefersDarkMode ? "dark" : "light",
  }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
