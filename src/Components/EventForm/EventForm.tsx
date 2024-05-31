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
import dayjs from "dayjs";

function EventForm({
  event,
  closeHandler,
  confirmEvent,
}: {
  event: any;
  closeHandler: any;
  confirmEvent: any;
}) {
  const onSubmit = (event: any) => {
    event.preventDefault();
    var data = new FormData(event.target);

    const eventData: any = {};

    for (let [key, value] of data.entries()) {
      if(key === 'start' || key === 'end') {
        debugger
        value = dayjs(value as string).format() 
      }
      eventData[key] = value;
    }

    confirmEvent(eventData);
  };

  console.log(event);

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
          <h1>Schedule a release</h1>
          <TextField
            id="version"
            name="version"
            label="Fix Version"
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="release_type"
              name="release_type"
              label="Release Type"
              defaultValue="verification"
            >
              <MenuItem value="verification">Verification</MenuItem>
              <MenuItem value="uat">UAT</MenuItem>
              <MenuItem value="regression">Regression</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Environment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Environment"
              defaultValue="stage"
            >
              <MenuItem value="stage">Stage</MenuItem>
              <MenuItem value="stage2">Stage 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="team"
              name="team"
              label="Team"
              defaultValue="svu"
            >
              <MenuItem value="svu">SVU</MenuItem>
              <MenuItem value="ptf">PLATFORM</MenuItem>
              <MenuItem value="fs">SPORTS</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date & Time"
              name="start"
              defaultValue={dayjs(event.date)}
            />
            <DateTimePicker
              label="End Date & Time"
              name="end"
              defaultValue={dayjs(event.date)}
            />
          </LocalizationProvider>
          <TextField
            id="build_owner"
            name="build_owner"
            label="Build Owner(s)"
            fullWidth
          />
          <ButtonGroup
            sx={{ width: "100%" }}
            variant="contained"
            aria-label="Basic button group"
          >
            <Button color="error" onClick={() => closeHandler(null)}>
              Cancel
            </Button>
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
