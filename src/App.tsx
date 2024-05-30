import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

import "./App.css";
import { useState } from "react";

function App() {
  const [events, setEvents] = useState([] as any);

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
