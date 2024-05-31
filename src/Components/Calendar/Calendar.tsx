import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useState } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarListing";
import { Backdrop, CircularProgress } from "@mui/material";

const Teams = {
  "Spark Video Unit": "svu",
  Platform: "ptf",
  Sports: "fs",
} as any;

export const BusinessUnits = {
  fw: "Fox Weather",
  fbn: "Fox Buiness",
  fs: "Fox Sports",
  fnc: "Fox News",
  fts: "Fox TV",
  otk: "Outkick",
} as any;

interface Event {
  id: any;
  title: string;
  version: string;
  start: string;
  end: string;
  release_type: string;
  team: string;
  components: string;
  business_units: string
  build_owner: string;
}

function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [tentativeEvent, setTentativeEvent] = useState(null);
  const [events, setEvents] = useState([] as any);

  useEffect(() => {
    const events: Event[] = [
      {
        id: 4,
        title: "Release 1.1.5",
        version: "2.1.5",
        start: "2024-05-13T22:03:15",
        end: "2024-05-13T22:00:00",
        release_type: "regression",
        team: "Spark Video Unit",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
      {
        id: 5,
        title: "Release 2.1.5",
        version: "2.1.5",
        start: "2024-05-10T22:03:15",
        end: "2024-05-22T22:00:00",
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
        start: "2024-05-16T13:03:15",
        end: "2024-05-23T22:00:00",
        release_type: "regression",
        team: "Platform",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
      {
        id: 7,
        title: "Release 2.1.1",
        version: "2.1.1",
        start: "2024-05-22T11:03:15",
        end: "2024-05-30T22:00:00",
        release_type: "regression",
        team: "Sports",
        components: "V3 Foxipedia External Importer",
        business_units: "fw",
        build_owner: "",
      },
    ].map((event) => {
      const team = Teams[event.team] || event.team.toLowerCase();

      return {
        ...event,
        team
      };
    });

    setTimeout(() => {
      setEvents(events);
      setIsLoading(false);
    }, 3000);
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


  return (
    <section className="is--dark-mode">
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
      {tentativeEvent && (
        <EventForm
          closeHandler={setTentativeEvent}
          confirmEvent={handleNewEvent}
          event={tentativeEvent}
        />
      )}
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
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        weekends={weekendsVisible}
        events={events}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventContent={CalendarListing}
        eventClick={handleEventClick}
      />
    </section>
  );
}

export default Calendar;
