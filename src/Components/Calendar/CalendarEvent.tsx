function CalendarListing(eventInfo: any) {
  return (
    <div className={`event-content bg--${eventInfo.event.extendedProps.team}`}>
      <h5>
        <span>{eventInfo.event.extendedProps.release_type}</span> on
        {' '}{eventInfo.event.extendedProps.business_units}
      </h5>
      <time>{eventInfo.timeText}</time>
    </div>
  );
}

export default CalendarListing;
