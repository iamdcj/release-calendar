import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useRef, useState } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarListing";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Event, nameToCode } from "../../_types";
import CalendarToolbar from "./CalendarToolbar";

import "./styles.css";

function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [tentativeEvent, setTentativeEvent] = useState(null);
  const [events, setEvents] = useState([] as any);
  const [filteredEvents, setFilteredEvents] = useState([] as any);

  const fetchEvents = () => {
    const events: Event[] = [
      {
        id: 4,
        title: "Release 1.1.5",
        version: "2.1.5",
        start: "2024-06-04T12:03:15",
        end: "2024-06-04T14:00:00",
        release_type: "regression",
        team: "Spark Video Unit",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
      {
        id: 8,
        title: "Release 2.1.9",
        version: "2.1.9",
        start: "2024-06-05T13:03:15",
        end: "2024-06-05T22:00:00",
        release_type: "regression",
        team: "Platform",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
      {
        id: 5,
        title: "Release 2.1.5",
        version: "2.1.5",
        start: "2024-06-04T22:03:15",
        end: "2024-06-04T05:00:00",
        release_type: "regression",
        team: "Spark Video Unit",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },

      {
        id: 7,
        title: "Release 2.1.1",
        version: "2.1.1",
        start: "2024-06-05T11:03:15",
        end: "2024-06-06T22:00:00",
        release_type: "regression",
        team: "Sports",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
    ].map((event) => {
      const team = nameToCode[event.team] || event.team.toLowerCase();

      return {
        ...event,
        team,
      };
    });

    setTimeout(() => {
      setEvents(events);
      setFilteredEvents(events)
      setIsLoading(false);
    }, 2000);
  };

  const calendarRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (event: any) => {
    setTentativeEvent(event);
  };

  const handleNewEvent = (event: any) => {
    setEvents([...events, event]);
    setTentativeEvent(null);
  };

  const handleEventClick = (event: any) => {
    setTentativeEvent(event);
  };

  const handleFilter = (key: string, value: any) => {
    const filteredEvents = events.filter((event: any) => {
      return value ? event[key] === value : true
    });

    setFilteredEvents(filteredEvents)
  };


  return (
    <Box
      component="section"
      className="is--dark-mode"
      display="grid"
      gridTemplateColumns="19% 80%"
      columnGap="1%"
    >
      <CalendarToolbar events={events} handleFilter={handleFilter} />
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {tentativeEvent && (
        <EventForm
          closeHandler={setTentativeEvent}
          confirmEvent={handleNewEvent}
          event={tentativeEvent}
        />
      )}
      <FullCalendar
        ref={calendarRef}
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
  );
}

export default Calendar;
