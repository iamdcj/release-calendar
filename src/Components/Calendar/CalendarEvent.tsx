function CalendarListing(eventInfo: any) {
  return (
    <div className="event-content">
      <h5>
        <span>{eventInfo.event.extendedProps.release_type}</span> on
        {' '}{eventInfo.event.extendedProps.business_units}
      </h5>
      <time>{eventInfo.timeText}</time>
    </div>
  );
}

export default CalendarListing;
