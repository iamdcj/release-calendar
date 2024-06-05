import { Backdrop, CircularProgress } from "@mui/material";
import { useAppContext } from "../../store";

function Loader() {
  const { isLoading } = useAppContext()

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
