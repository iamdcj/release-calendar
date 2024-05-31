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
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { BusinessUnits } from "../Calendar/Calendar";

function EventForm({
  event,
  closeHandler,
  confirmEvent,
}: {
  event: any;
  closeHandler: any;
  confirmEvent: any;
}) {
  const [selectBusinessUnits, setSelectBusinessUnits] = useState(
    [] as string[]
  );
  const onSubmit = (event: any) => {
    event.preventDefault();
    var data = new FormData(event.target);

    const eventData: any = {};

    for (let [key, value] of data.entries()) {
      if (key === "start" || key === "end") {
        value = dayjs(value as string).format();
      }
      eventData[key] = value;
    }

    confirmEvent(eventData);
  };

  const handleBuChange = (event: any) => {
    setSelectBusinessUnits(event.target.value);
  };

  const businessUnits = ["fs", "fnc", "fbn", "fts", "fw", "otk"];

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
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <h1>Schedule a release</h1>
          <TextField
            id="version"
            name="version"
            label="Fix Version"
            variant="outlined"
            defaultValue={event.event?.extendedProps?.version}
            required
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="release_type"
              name="release_type"
              label="Release Type"
              defaultValue={
                event.event?.extendedProps?.release_type || "verification"
              }
              required
            >
              <MenuItem value="verification">Verification</MenuItem>
              <MenuItem value="uat">UAT</MenuItem>
              <MenuItem value="regression">Regression</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="environment">Environment</InputLabel>
            <Select
              labelId="environment"
              id="environment"
              name="environment"
              label="Environment"
              defaultValue={event.event?.extendedProps?.environment || "stage"}
              required
            >
              <MenuItem value="stage">Stage</MenuItem>
              <MenuItem value="stage2">Stage 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="businessUnits">Business Units</InputLabel>
            <Select
              labelId="businessUnits"
              id="business_units"
              name="business_units"
              multiple
              input={<OutlinedInput label="Name" />}
              defaultValue={event.event?.extendedProps?.business_units || []}
              value={selectBusinessUnits}
              onChange={(value) => handleBuChange(value)}
              required
            >
              {businessUnits.map((bu: string) => (
                <MenuItem key={bu} value={bu}>
                  {BusinessUnits[bu]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="team"
              name="team"
              label="Team"
              defaultValue={event.event?.extendedProps?.team || "svu"}
              required
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
              defaultValue={dayjs(event.event?.start || event.date)}
            />
            <DateTimePicker
              label="End Date & Time"
              name="end"
              defaultValue={dayjs(event.event?.end || event.date)}
            />
          </LocalizationProvider>
          <TextField
            id="build_owner"
            name="build_owner"
            label="Build Owner(s)"
            defaultValue={event.event?.extendedProps?.build_owner}
            fullWidth
            required
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
