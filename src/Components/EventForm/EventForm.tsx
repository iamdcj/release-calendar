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
import { Check, Close, Edit, EventBusyOutlined } from "@mui/icons-material";
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
  const { release, events, theme, dispatch } = useAppContext();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const isDarkTheme = theme === "dark";
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState(
    [] as string[]
  );

  const businessUnits =
    release?.business_units || release?.event?.extendedProps?.business_units;
  const version = release?.version || release?.event?.extendedProps?.version;
  const team = release?.team || release?.event?.extendedProps?.team;
  const releaseType =
    release?.release_type || release?.event?.extendedProps?.release_type;
  const environment =
    release?.environment || release?.event?.extendedProps?.environment;
  const buildOwners =
    release?.build_owners || release?.event?.extendedProps?.build_owners;
  const start = release?.start || release?.event?.start;
  const end = release?.end || release?.event?.end;

  useEffect(() => {
    if (!businessUnits) {
      return;
    }

    setSelectedBusinessUnits(businessUnits.split(","));
  }, []);

  useEffect(() => {
    if (!showDeleteWarning) {
      return;
    }

    setTimeout(() => {
      setShowDeleteWarning(false);
    }, 10000);
  }, [showDeleteWarning]);

  if (!release) {
    return null;
  }

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (release.id) {
      const filteredEvents = events.filter(
        ({ id }: { id: number }) => id !== release.id
      );

      debugger;
      dispatch({
        type: "SET_EVENTS",
        value: filteredEvents,
      });
    }

    const data = new FormData(event.target);
    const eventData: any = {};

    for (let [key, value] of data.entries()) {
      switch (key) {
        case "start":
        case "end":
          eventData[key] = value = dayjs(value as string).format();
          break;
        case "business_units":
          eventData[key] = value = selectedBusinessUnits.join(",");
          break;
        default:
          eventData[key] = value;
          break;
      }
    }

    dispatch({
      type: "SET_EVENT",
      value: {
        id: uuidv4(),
        friendlyDate: dayjs(eventData.start).format("MMM D - h:mma"),
        ...eventData,
      },
    });

    setSelectedBusinessUnits([]);
  };

  const handleCancelRelease = () => {
    if (!showDeleteWarning) {
      setShowDeleteWarning(true);
    } else {
      dispatch({
        type: "CANCEL_EVENT",
        value: release,
      });
    }
  };

  const closeHandler = () => {
    setShowDeleteWarning(false);
    dispatch({ type: "CLEAR_EVENT" });
  };

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
              disabled={release.readOnly}
              options={businessUnitsArray}
              onChange={(_, values) => {
                setSelectedBusinessUnits(values);
              }}
              getOptionLabel={(option) => BusinessUnits[option]}
              defaultValue={selectedBusinessUnits}
              sx={{ gridArea: "bus" }}
              renderInput={(params) => {
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
              disabled={release.readOnly}
              defaultValue={version}
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
                disabled={release.readOnly}
                label="Team"
                defaultValue={team || "spark video unit"}
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
                disabled={release.readOnly}
                label="Release Type"
                defaultValue={releaseType || "verification"}
                required
              >
                <MenuItem value="verification">Verification</MenuItem>
                <MenuItem value="uat">UAT</MenuItem>
                <MenuItem value="regression">Regression</MenuItem>
                <MenuItem value="production">Production</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ gridArea: "env" }}>
              <InputLabel id="environment">Environment</InputLabel>
              <Select
                labelId="environment"
                id="environment"
                name="environment"
                disabled={release.readOnly}
                label="Environment"
                defaultValue={environment || "stage"}
                required
              >
                <MenuItem value="stage">Stage</MenuItem>
                <MenuItem value="stage2">Stage 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="build_owners"
              name="build_owners"
              label="Build Owner(s)"
              disabled={release.readOnly}
              defaultValue={buildOwners}
              sx={{ gridArea: "owners" }}
              fullWidth
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                name="start"
                views={["year", "day", "hours", "minutes"]}
                disablePast
                disabled={release.readOnly}
                defaultValue={start ? dayjs(start) : dayjs(release?.date)}
                sx={{ gridArea: "start" }}
              />
              <DateTimePicker
                label="End Date & Time"
                views={["year", "day", "hours", "minutes"]}
                disablePast
                disabled={release.readOnly}
                name="end"
                defaultValue={
                  end ? dayjs(end) : dayjs(release?.date).add(4, "hour")
                }
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
            {release.readOnly ? (
              <>
                <Button
                  color="error"
                  variant={showDeleteWarning ? "contained" : "outlined"}
                  onClick={handleCancelRelease}
                >
                  {!showDeleteWarning ? (
                    <>
                      <EventBusyOutlined sx={{ mr: 1 }} />
                      Cancel Release
                    </>
                  ) : (
                    <>
                      Are you sure? <Check />
                    </>
                  )}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => dispatch({ type: "EDIT_EVENT" })}
                >
                  Edit <Edit />
                </Button>
              </>
            ) : (
              <>
                <Button color="error" variant="outlined" onClick={closeHandler}>
                  <Close /> Cancel
                </Button>
                <Button type="submit" variant="outlined">
                  Confirm <Check />
                </Button>
              </>
            )}
          </Box>
        </Box>
      </div>
    </Modal>
  );
}

export default EventForm;
