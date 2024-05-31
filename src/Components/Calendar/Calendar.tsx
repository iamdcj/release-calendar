import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useState } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarEvent";
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";

const Teams = {
  "Spark Video Unit": "SVU",
  "Platform": "PTF",
  "Sports": "FS",
} as any;

const BusinessUnits = {
  FoxWeather: "FW",
  FoxBuiness: "FBN",
  FoxSports: "FS",
  FoxNews: "FNC",
  FoxTV: "FTS",
  Outkick: "OK",
} as any;

const Colors = {
  SVU: "#5757f8",
  PTF: "#43adb3",
  FS: "#f95e5e",
} as any;

interface Event {
  id: any;
  title: any;
  version: any;
  start: any;
  end: any;
  release_type: any;
  team: "Spark Video Unit";
  components: any;
  business_units:
    | "FoxWeather"
    | "FoxBuiness"
    | "FoxSports"
    | "FoxNews"
    | "FoxTV"
    | "Outkick";
  build_owner: any;
}

function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [useDarkMode, setUseDarkMode] = useState(true);
  const [weekendsVisible, setWeekendsVisible] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
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
        business_units: "FoxWeather",
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
        business_units: "FoxWeather",
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
        business_units: "FoxWeather",
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
        business_units: "FoxWeather",
        build_owner: "",
      },
    ].map((event) => {
      const team = Teams[event.team];
      const backgroundColor = Colors[team];
      const business_units = BusinessUnits[event.business_units];

      
      return {
        ...event,
        team,
        business_units,
        backgroundColor,
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

  const toggleWeekends = (event: any) => {
    setWeekendsVisible(event.target.checked);
  };

  return (
    <section className={useDarkMode ? "is--dark-mode" : "is--light-mode"}>
      {/* <FormControlLabel
        control={
          <Switch
            checked={useDarkMode}
            onChange={() => setUseDarkMode(!useDarkMode)}
          />
        }
        label="Dark Mode?"
      /> */}
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
      <EventForm
        closeHandler={setTentativeEvent}
        confirmEvent={handleNewEvent}
        event={tentativeEvent}
      />
      {/* <div>
        <label htmlFor="toggle_weekends">Show Weekend(s)</label>
        <input
          type="checkbox"
          onChange={toggleWeekends}
          name="toggle_weekends"
          id="toggle_weekends"
          checked={weekendsVisible}
        />
      </div> */}
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
        businessHours= {{
          startTime: '09:00', // a start time (10am in this example)
          endTime: '18:00', // an end time (6pm in this example)
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
      />
    </section>
  );
}

export default Calendar;
