import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext, useState } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarListing";
import { Box } from "@mui/material";
import { Event, nameToCode } from "../../_types";
import CalendarToolbar from "./CalendarToolbar";
import { useTheme } from "@mui/material/styles";
import Loader from "../Loader/Loader";
import "./styles.css";
import AppContext from "../../store";

function Calendar() {
  const theme = useTheme();
  const { showSidebar, events } = useContext(AppContext);
  const [tentativeEvent, setTentativeEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([] as any);

  const handleDateClick = (event: any) => {
    setTentativeEvent(event);
  };

  const handleNewEvent = (event: any) => {
    setTentativeEvent(null);
  };

  const handleEventClick = (event: any) => {
    setTentativeEvent(event);
  };

  return (
    <main className={`is--${theme}-theme`}>
      <Loader />
      <EventForm
        closeHandler={setTentativeEvent}
        confirmEvent={handleNewEvent}
        event={tentativeEvent}
      />
      <Box
        component="section"
        className="is--dark-mode"
        display="grid"
        gridTemplateColumns={showSidebar ? "20% 80%" : "100%"}
      >
        <CalendarToolbar />
        <Box px={3} pt={2}>
          <FullCalendar
            themeSystem="bootstrap5"
            allDaySlot={false}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            slotMinTime="08:00:00"
            slotMaxTime="19:00:00"
            businessHours={{
              startTime: "09:00",
              endTime: "18:00",
            }}
            navLinks={true}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            firstDay={1}
            eventClassNames={(event) => [
              `bg--${nameToCode[event.event.extendedProps.team]}`,
            ]}
            headerToolbar={{
              left: "today,prev,next",
              center: "title",
              right: "timeGridWeek,dayGridMonth,timeGridDay",
            }}
            nowIndicator={true}
            weekends={false}
            events={filteredEvents}
            initialView="timeGridWeek"
            dateClick={handleDateClick}
            eventContent={CalendarListing}
            eventClick={handleEventClick}
          />
        </Box>
      </Box>
    </main>
  );
}

export default Calendar;
