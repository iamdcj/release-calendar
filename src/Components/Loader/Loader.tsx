import { Backdrop, CircularProgress } from "@mui/material";
import AppContext from "../../store";
import { useContext } from "react";

function Loader() {
  const { isLoading } = useContext(AppContext);

  return isLoading ? (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : null;
}

export default Loader;
