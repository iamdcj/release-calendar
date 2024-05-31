import Modal from "react-modal";
import "./styles.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  ButtonGroup,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
          color: "#fff",
        }}
      >
        <Close />
      </IconButton>
      <div className="content">
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField id="filled-basic" label="Fix Version" variant="outlined" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Release Type"
              defaultValue={10}
            >
              <MenuItem value={10}>Verification</MenuItem>
              <MenuItem value={20}>UAT</MenuItem>
              <MenuItem value={30}>Regression</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Environment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Environment"
              defaultValue={10}
            >
              <MenuItem value={10}>Stage</MenuItem>
              <MenuItem value={20}>Stage 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Team"
              defaultValue={10}
            >
              <MenuItem value={10}>SVU</MenuItem>
              <MenuItem value={20}>PLATFORM</MenuItem>
              <MenuItem value={30}>SPORTS</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Start Date & Time" />
            <DateTimePicker label="End Date & Time" />
          </LocalizationProvider>
          <TextField id="standard-basic" label="Build Owner(s)" fullWidth />
          <ButtonGroup
            sx={{ width: "100%" }}
            variant="contained"
            aria-label="Basic button group"
          >
            <Button color="error">Cancel</Button>
            <Button type="submit">
              <SaveIcon />
              Schedule Release
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </Modal>
  );
}

export default EventForm;
