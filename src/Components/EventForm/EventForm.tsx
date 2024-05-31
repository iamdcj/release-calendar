import Modal from "react-modal";
import "./styles.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
import {
  Box,
  ButtonGroup,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function EventForm({
  event,
  closeHandler,
  confirmEvent,
}: {
  event: any;
  closeHandler: any;
  confirmEvent: any;
}) {
  const onSubmit = () => {
    confirmEvent(event);
  };

  const names = ["David Jones", "Ben Lee", "Madi Jacobs"];

  return (
    <Modal
      isOpen={event}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="wrapper"
    >
      <IconButton
        aria-label="delete"
        onClick={() => closeHandler(null)}
        sx={{
          position: "absolute",
          right: "20px",
          top: "20px",
          color: "#fff"
        }}
      >
        <Close />
      </IconButton>
      <div className="content">
        <Paper elevation={3}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField id="outlined-basic" label="Title" variant="outlined" />
            <TextField
              id="filled-basic"
              label="Fix Version"
              variant="outlined"
            />
            <TextField
              id="standard-basic"
              label="Build Owner(s)"
              variant="standard"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Team</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Team"
              >
                <MenuItem value={10}>SVU</MenuItem>
                <MenuItem value={20}>PLATFORM</MenuItem>
                <MenuItem value={30}>SPORTS</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                input={<OutlinedInput label="Name" />}
                value={["V3 Read API"]}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ButtonGroup
              sx={{ width: "100%" }}
              variant="contained"
              aria-label="Basic button group"
            >
              <Button color="error">Cancel</Button>
              <Button>
                <SaveIcon />
                Schedule Release
              </Button>
            </ButtonGroup>
          </Box>
        </Paper>
      </div>
    </Modal>
  );
}

export default EventForm;
