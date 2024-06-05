import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { BusinessUnits, businessUnitsArray } from "../../_types";
import { useContext, useEffect, useState } from "react";
import CalendarListing from "./CalendarListing";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { Check } from "@mui/icons-material";
import AppContext from "../../store";

function CalendarToolbar({
  handleFilter,
}: {
  handleFilter: (key: string, value: any) => void;
}) {
  const { showSidebar, events } = useContext(AppContext);
  const [formValues, setFormValues] = useState({} as any);
  const [todaysEvents, setTodaysEvents] = useState([]);

  useEffect(() => {
    dayjs.extend(isToday);
    const todaysEvents = events.filter((event: any) => {
      return dayjs(event.start).isToday();
    });

    setTodaysEvents(todaysEvents);
  }, [events]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <Box
      className="calendar-toolbar"
      component="aside"
      flexDirection="column"
      display="flex"
      position={showSidebar ? "relative" : "absolute"}
      sx={
        showSidebar
          ? null
          : {
              transform: "translateX(-100%)",
            }
      }
      gap={4}
      py={1}
      px={3}
      borderRight="1px solid grey"
    >
      <Box
        display="flex"
        flexDirection="column"
        border="none"
        width="100%"
        gap={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <h3>Filters</h3>
        <Autocomplete
          fullWidth
          multiple
          id="business_units"
          options={businessUnitsArray}
          onChange={(element, values) => {
            setFormValues({ ...formValues, business_unit: values });
          }}
          getOptionLabel={(option) => BusinessUnits[option]}
          value={formValues["business_units"]}
          sx={{ gridArea: "bus" }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                name="business_units"
                variant="outlined"
                label="Business Units"
                fullWidth
              />
            );
          }}
        />
        <Autocomplete
          fullWidth
          multiple
          id="components"
          options={["fe", "cms"]}
          onChange={(element, values) => {
            setFormValues({ ...formValues, components: values });
          }}
          value={formValues["components"]}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                name="components"
                variant="outlined"
                label="Components"
                fullWidth
              />
            );
          }}
        />
        <Autocomplete
          fullWidth
          multiple
          id="team"
          options={["svu", "sports", "platform"]}
          onChange={(element, values) => {
            setFormValues({ ...formValues, team: values });
          }}
          value={formValues["team"]}
          sx={{ gridArea: "bus" }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                name="team"
                variant="outlined"
                label="team"
                fullWidth
              />
            );
          }}
        />
        <Button type="submit" variant="contained" color="success">
          Apply Filters <Check />
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        paddingTop={4}
        gap={3}
        borderTop="1px solid white"
      >
        <h3>Today's Releases</h3>
        {todaysEvents.length > 0 ? (
          todaysEvents
            .sort((eventA: any, eventB: any) => {
              const startA: any = dayjs(eventA.start);
              const startB: any = dayjs(eventB.start);

              return startA - startB;
            })
            .map((event: any) => (
              <CalendarListing key={event.id} event={event} isToday />
            ))
        ) : (
          <p>There are no release scheduled for today</p>
        )}
      </Box>
    </Box>
  );
}

export default CalendarToolbar;
