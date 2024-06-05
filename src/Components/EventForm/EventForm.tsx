import Modal from "react-modal";
import "./styles.css";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
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
import { useEffect, useState } from "react";
import { BusinessUnits, businessUnitsArray } from "../../_types";
import { useAppContext } from "../../store";
import { v4 as uuidv4 } from "uuid";

function EventForm() {
  const { events, release, theme, dispatch } = useAppContext();
  const isDarkTheme = theme === "dark";
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState([] as string[]);

  useEffect(() => {
    setSelectedBusinessUnits(
      release?.event?.extendedProps?.business_units.split(",")
    );
  }, []);

  if (!release) {
    return null;
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    var data = new FormData(event.target);

    const eventData: any = {};

    for (let [key, value] of data.entries()) {
      if (key === "start" || key === "end") {
        value = dayjs(value as string).format();
      }

      if (key === "business_units") {
        value = selectedBusinessUnits.join(",");
      }

      eventData[key] = value;
    }

    dispatch({
      type: "SET_EVENTS",
      value: [
        ...events,
        {
          id: uuidv4(),
         ...eventData,
        },
      ],
    });
    setSelectedBusinessUnits([]);
  };

  const closeHandler = () => {
    dispatch({ type: "CLEAR_EVENT" });
  }

  return (
    <Modal
      isOpen={release ? true : false}
      onRequestClose={closeHandler}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="wrapper"
    >
      <IconButton
        aria-label="delete"
        onClick={closeHandler}
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
        <Box
          component="form"
          autoComplete="off"
          onSubmit={onSubmit}
          bgcolor={isDarkTheme ? "#000" : "#fff"}
          border={isDarkTheme ? "1px solid grey" : "none"}
          borderRadius="10px"
        >
          <Box
            component="h2"
            mb={1}
            px={1}
            py={1}
            display="flex"
            alignItems="center"
            bgcolor="#007A33" // let's go celtics!
            borderRadius="10px 10px 0 0"
            color="#fff"
          >
            <CalendarIcon sx={{ mr: 1 }} /> Schedule a release
          </Box>
          <Box
            padding={1}
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
            gap={1}
            mb={1}
          >
            <Autocomplete
              fullWidth
              multiple
              id="business_units"
              options={businessUnitsArray}
              onChange={(_, values) => {
                setSelectedBusinessUnits(values);
              }}
              getOptionLabel={(option) => BusinessUnits[option]}
              value={selectedBusinessUnits}
              defaultValue={selectedBusinessUnits}
              sx={{ gridArea: "bus" }}
              renderInput={(params) => {
                console.log(params);

                return (
                  <TextField
                    {...params}
                    value={selectedBusinessUnits}
                    name="business_units"
                    variant="outlined"
                    label="Business Units"
                    required={!selectedBusinessUnits?.length}
                    fullWidth
                  />
                );
              }}
            />

            <TextField
              id="version"
              name="version"
              label="Fix Version"
              variant="outlined"
              defaultValue={release.event?.extendedProps?.version}
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
                defaultValue={
                  release.event?.extendedProps?.team || "spark video unit"
                }
                required
              >
                <MenuItem value="spark video unit">Spark Video Unit</MenuItem>
                <MenuItem value="platform">Platform</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
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
                  release.event?.extendedProps?.release_type || "verification"
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
                  release.event?.extendedProps?.environment || "stage"
                }
                required
              >
                <MenuItem value="stage">Stage</MenuItem>
                <MenuItem value="stage2">Stage 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="build_owner"
              name="build_owner"
              label="Build Owner(s)"
              defaultValue={release.event?.extendedProps?.build_owner}
              sx={{ gridArea: "owners" }}
              fullWidth
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                name="start"
                defaultValue={dayjs(release.event?.start || release.date)}
                sx={{ gridArea: "start" }}
              />
              <DateTimePicker
                label="End Date & Time"
                name="end"
                defaultValue={dayjs(release.event?.end || release.date)}
                sx={{ gridArea: "end" }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            px={1}
            pb={2}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button color="error" variant="outlined" onClick={closeHandler}>
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
