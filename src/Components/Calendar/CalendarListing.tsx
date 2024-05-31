function CalendarListing(eventInfo: any) {
  console.log(eventInfo);

  const businessUnits = eventInfo.event.extendedProps.business_units
    .split(",")
    .join(",");

  return (
    <div className={`event-content bg--${eventInfo.event.extendedProps.team}`}>
      <h5>
        <span>{eventInfo.event.extendedProps.release_type}</span>
        {businessUnits && <> on {businessUnits.toUpperCase()}</>}
      </h5>
      <time>{eventInfo.timeText}</time>
    </div>
  );
}

export default CalendarListing;
