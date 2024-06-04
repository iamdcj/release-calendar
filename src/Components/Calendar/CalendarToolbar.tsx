import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { BusinessUnits, businessUnitsArray } from "../../_types";
import { useState } from "react";
import CalendarListing from "./CalendarListing";
import dayjs from "dayjs";

function CalendarToolbar({ events }: { events: any }) {
  const [selectBusinessUnits, setSelectBusinessUnits] = useState(
    [] as string[]
  );

  const handleBuChange = (event: any) => {
    setSelectBusinessUnits(event.target.value);
  };

  return (
    <Box component="aside" display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <h3>Filters</h3>
        <FormControl sx={{ gridArea: "type" }} fullWidth>
          <InputLabel id="demo-simple-select-label">Release Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="release_type"
            name="release_type"
            label="Release Type"
            required
            fullWidth
          >
            <MenuItem value="verification">Verification</MenuItem>
            <MenuItem value="uat">UAT</MenuItem>
            <MenuItem value="regression">Regression</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ gridArea: "type" }} fullWidth>
          <InputLabel id="demo-simple-select-label">Components</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="release_type"
            name="release_type"
            label="Release Type"
            required
          >
            <MenuItem value="verification">Verification</MenuItem>
            <MenuItem value="uat">UAT</MenuItem>
            <MenuItem value="regression">Regression</MenuItem>
            <MenuItem value="regression">Production</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ gridArea: "team" }} fullWidth>
          <InputLabel id="demo-simple-select-label">Team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="team"
            name="team"
            label="Team"
            required
          >
            <MenuItem value="spark video unit">SVU</MenuItem>
            <MenuItem value="platform">PLATFORM</MenuItem>
            <MenuItem value="sports">SPORTS</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ gridArea: "bus" }} fullWidth>
          <InputLabel id="businessUnits">Business Units</InputLabel>
          <Select
            labelId="businessUnits"
            id="business_units"
            name="business_units"
            multiple
            input={<OutlinedInput label="Name" />}
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
      </Box>
      {events.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          paddingTop={4}
          gap={3}
          borderTop="1px solid white"
        >
          <h3>Upcoming Releases</h3>
          {events
            .sort((eventA: any, eventB: any) => {
              const startA: any = dayjs(eventA.start);
              const startB: any = dayjs(eventB.start);

              return startA - startB;
            })
            .map((event: any) => (
              <CalendarListing key={event.id} {...event} isToday />
            ))}
        </Box>
      )}
    </Box>
  );
}

export default CalendarToolbar;
