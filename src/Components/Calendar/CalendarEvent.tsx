function CalendarListing(eventInfo: any) {
  console.log(eventInfo.event.extendedProps);

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".25rem"
      }}
    >
      <time>{eventInfo.timeText} |  </time>
      <p>{eventInfo.event.title}</p>
      <p>{eventInfo.event.extendedProps.release_type}</p>
      <p>{eventInfo.event.extendedProps.build_owner}</p>
      <p>{eventInfo.event.extendedProps.components}</p>
      <p>{eventInfo.event.extendedProps.business_units}</p>
    </div>
  );
}

export default CalendarListing;
