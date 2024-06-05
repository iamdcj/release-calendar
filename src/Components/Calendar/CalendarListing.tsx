import dayjs from "dayjs";
import { codeToName, nameToCode } from "../../_types";
import { clsx } from "clsx";
import { Box } from "@mui/material";
import { AccessTimeFilledOutlined } from "@mui/icons-material";

const generateFriendlyTime = (startTime: string, endTime: string) => {
  const isSameDay = dayjs(endTime).isSame(startTime, "day");
  const start = dayjs(startTime).format("MM/DD h:mma");
  const end = dayjs(endTime).format(isSameDay ? "h:mma" : "MM/DD h:mma");

  return `${start} - ${end}`;
};

function CalendarListing({
  event,
  isTodayListing = false,
}: {
  event: any;
  isTodayListing: boolean;
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
    [`bg--${nameToCode[teamCode]}`]: isTodayListing,
  });

  return (
    <Box
      flexDirection="column"
      alignItems="start"
      textAlign="left"
      className={classes}
      borderRadius={2}
      p={1}
    >
      <Box component="h5" fontWeight={600} mb={0.5}>
        {isTodayListing && (
          <Box mb={0.5}>
            {codeToName[nameToCode[teamCode]]} {event.title}
          </Box>
        )}
        <span>{releaseType}</span>
        {businessUnits && <> on {businessUnits.toUpperCase()}</>}
      </Box>
      <Box component="time" display="inline-flex" alignItems="center">
        {/* <AccessTimeFilledOutlined fontSize="inherit" />*/} {time} 
      </Box>
    </Box>
  );
}

export default CalendarListing;
