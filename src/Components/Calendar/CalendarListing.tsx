import dayjs from "dayjs";
import { nameToCode } from "../../_types";
import { clsx } from "clsx";
import { Box } from "@mui/material";

const generateFriendlyTime = (startTime: string, endTime: string) => {
  const start = dayjs(startTime).format("MMM DD HH:mm");
  const end = dayjs(endTime).format("HH:mm");

  return `${start} to ${end}`;
};

function CalendarListing({
  event,
  isToday = false,
}: {
  event: any;
  isToday: boolean;
}) {
  if (!event) {
    return null;
  }

  const time = event.timeText || generateFriendlyTime(event.start, event.end);
  const teamCode = event.team || event?.extendedProps?.team;
  const releaseType = event.release_type || event?.extendedProps?.release_type;
  const businessUnits =
    event.business_units ||
    event?.extendedProps?.business_units.split(",").join(",");

  const classes = clsx({
    "event-content ": true,
    [`bg--${nameToCode[teamCode]}`]: isToday,
  });

  debugger;
  return (
    <Box className={classes} borderRadius={2} p={1}>
      <h5>
        <span>
          {teamCode} {releaseType}
        </span>
        {businessUnits && <> on {businessUnits.toUpperCase()}</>}
      </h5>
      <Box component="time" display="block">{time}</Box>
    </Box>
  );
}

export default CalendarListing;
