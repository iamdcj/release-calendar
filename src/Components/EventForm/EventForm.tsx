import { useForm, SubmitHandler } from "react-hook-form";

import Modal from "react-modal";
import "./styles.css";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import {
  CalendarIcon,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { BusinessUnits, businessUnitsArray } from "../../_types";

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
    event.event?.extendedProps?.business_units.split(",") || ([] as string[])
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

  return (
    <Modal
      isOpen={event}
      onRequestClose={() => closeHandler(null)}
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
          <Box
            component="h2"
            mb={4}
            px={2}
            py={1}
            display="flex"
            alignItems="center"
            bgcolor="#f44336"
            borderRadius={1}
          >
            <CalendarIcon /> Schedule a release
          </Box>
          <Box
            padding={2}
            display="grid"
            gridTemplateAreas={`
            "version version"
            "env env"
            "type type"
            "team team"
            "bus bus"
            "start end"
            "owners owners"
           `}
            gap={3}
            mb={3}
          >
            <TextField
              id="version"
              name="version"
              label="Fix Version"
              variant="outlined"
              defaultValue={event.event?.extendedProps?.version}
              required
              sx={{ gridArea: "version" }}
              fullWidth
            />
              <FormControl sx={{ gridArea: "team" }}>
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
            <FormControl sx={{ gridArea: "type" }} fullWidth>
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
                <MenuItem value="regression">Production</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ gridArea: "env" }}>
              <InputLabel id="environment">Environment</InputLabel>
              <Select
                labelId="environment"
                id="environment"
                name="environment"
                label="Environment"
                defaultValue={
                  event.event?.extendedProps?.environment || "stage"
                }
                required
              >
                <MenuItem value="stage">Stage</MenuItem>
                <MenuItem value="stage2">Stage 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ gridArea: "bus" }}>
              <InputLabel id="businessUnits">Business Units</InputLabel>
              <Select
                labelId="businessUnits"
                id="business_units"
                name="business_units"
                multiple
                input={<OutlinedInput label="Name" />}
                defaultValue={
                  event.event?.extendedProps?.business_units.split(",") || []
                }
                value={selectBusinessUnits}
                onChange={(value) => handleBuChange(value)}
                required
                fullWidth
              >
                {businessUnitsArray.map((bu: string) => (
                  <MenuItem key={bu} value={bu}>
                    {BusinessUnits[bu]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="build_owner"
              name="build_owner"
              label="Build Owner(s)"
              defaultValue={event.event?.extendedProps?.build_owner}
              sx={{ gridArea: "owners" }}
              fullWidth
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                name="start"
                defaultValue={dayjs(event.event?.start || event.date)}
                sx={{ gridArea: "start" }}
              />
              <DateTimePicker
                label="End Date & Time"
                name="end"
                defaultValue={dayjs(event.event?.end || event.date)}
                sx={{ gridArea: "end" }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            px={2}
            pb={4}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={() => closeHandler(null)}
            >
              <Close /> Cancel
            </Button>
            <Button type="submit" variant="outlined">
              Confirm <Check />
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
}

export default EventForm;
