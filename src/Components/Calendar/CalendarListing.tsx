import dayjs from "dayjs";
import { nameToCode } from "../../_types";
import { clsx } from "clsx";

const generateFriendlyTime = (startTime: string, endTime: string) => {
  const start = dayjs(startTime).format("MMM DD HH:mm");
  const end = dayjs(endTime).format("HH:mm");

  return `${start} to ${end}`;
};

function CalendarListing({
  event,
  isToday = false,
  ...rest
}: {
  event: any;
  isToday: boolean;
}) {
  console.log(rest);
  if (!event) {
    return null;
  }

  
console.log(event);

  const time = event.timeText || generateFriendlyTime(event.start, event.end);
  const teamCode = event.team || event?.event?.extendedProps?.team;
  const releaseType =
    event.release_type || event?.event?.extendedProps?.release_type;
  const businessUnits =
    event.business_units ||
    event?.event?.extendedProps?.business_units.split(",").join(",");

  const classes = clsx({
    "event-content ": true,
    [`bg--${nameToCode[teamCode]}`]: isToday,
  });

  return (
    <div className={classes}>
      <h5>
        <span>
          {teamCode} {releaseType}
        </span>
        {businessUnits && <> on {businessUnits.toUpperCase()}</>}
      </h5>
      <time>- {time}</time>
    </div>
  );
}

export default CalendarListing;
