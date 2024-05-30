import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useState } from "react";

function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 5,
      title: "Release 2.1.5",
      version: "2.1.5",
      start: "2024-05-29T22:03:15",
      end: "2024-05-30T22:00:00",
      release_type: "regression",
      team: "Spark Video Unit",
      components: "V3 Foxipedia External Importer",
      business_units: "FoxWeather",
      build_owner: "",
    },
  ] as any);

  const handleDateClick = (event: any) => {
    setEvents([...events, event]);
  };

  const toggleWeekends = (event: any) => {
    setWeekendsVisible(event.target.checked);
  };

  return (
    <section>
      <div>
        <label htmlFor="toggle_weekends">Show Weekend(s)</label>
        <input
          type="checkbox"
          onChange={toggleWeekends}
          name="toggle_weekends"
          id="toggle_weekends"
          checked={weekendsVisible}
        />
      </div>
      <FullCalendar
        navLinks={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        weekends={weekendsVisible}
        events={events}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </section>
  );
}

export default Calendar;
