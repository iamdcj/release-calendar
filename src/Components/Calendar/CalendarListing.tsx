import dayjs from "dayjs";
import { codeToName, nameToCode } from "../../_types";

const generateFriendlyTime = (startTime: string, endTime: string) => {
  const start = dayjs(startTime).format('MMM DD HH:mm');
  const end = dayjs(endTime).format('HH:mm');

  return `${start} to ${end}`;
};

function CalendarListing(event: any) {
  if (!event) {
    return null;
  }

  

  const time = event.timeText || generateFriendlyTime(event.start, event.end);
  const teamCode = event.team || event?.event?.extendedProps?.team;
  const team = codeToName[teamCode];

  console.log(teamCode);
  
  const releaseType =
    event.release_type || event?.event?.extendedProps?.release_type;
  const businessUnits =
    event.business_units ||
    event?.event?.extendedProps?.business_units.split(",").join(",");

  return (
    <div className={`event-content bg--${nameToCode[teamCode]}`}>
      <h5>
        <span>{team}</span>
        <span>{releaseType}</span>
        {businessUnits && <> on {businessUnits.toUpperCase()}</>}
      </h5>
      <time>- {time}</time>
    </div>
  );
}

export default CalendarListing;
