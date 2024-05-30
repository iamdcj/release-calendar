import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

import "./App.css";
import { useState } from "react";

function App() {
  const [events, setEvents] = useState([
    {
      id: 5,
      title: "Release 2.1.5",
      version: "2.1.5",
      start: "2024-05-29T22:03:15",
      end: "2024-05-29T23:00:00",
      release_type: "regression",
      team: "Spark Video Unit",
      components: "V3 Foxipedia External Importer",
      business_units: "FoxWeather",
      build_owner: "",
    },
  ] as any);

  const handleDateClick = (stuff: any) => {
    setEvents([...events, stuff]);
  };

  return (
    <main>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </main>
  );
}

export default App;
