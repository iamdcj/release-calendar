import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarListing";
import { Box } from "@mui/material";
import { nameToCode } from "../../_types";
import CalendarToolbar from "./CalendarToolbar";
import { useTheme } from "@mui/material/styles";
import Loader from "../Loader/Loader";
import "./styles.css";
import { useAppContext } from "../../store";

function Calendar() {
  const theme = useTheme();
  const { showSidebar, events, dispatch } = useAppContext();

  useEffect(() => {
    const events: any[] = [
      {
        id: 4,
        title: "Release 1.1.5",
        version: "2.1.5",
        start: "20240604T12:03:15",
        end: "20240604T14:00:00",
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
        start: "20240605T13:03:15",
        end: "20240605T22:00:00",
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
        start: "20240604T22:03:15",
        end: "20240604T05:00:00",
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
        start: "20240605T11:03:15",
        end: "20240606T22:00:00",
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

    dispatch({
      type: "SET_EVENTS",
      value: events,
    });
  }, []);

  return (
    <main className={`is${theme}theme`}>
      <Loader />
      <EventForm />
      <Box
        component="section"
        className="isdarkmode"
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
              `bg${nameToCode[event.event.extendedProps.team]}`,
            ]}
            headerToolbar={{
              left: "today,prev,next",
              center: "title",
              right: "timeGridWeek,dayGridMonth,timeGridDay",
            }}
            nowIndicator={true}
            weekends={false}
            events={events}
            initialView="timeGridWeek"
            dateClick={(event) => dispatch({ type: "SET_TENTATIVE_EVENT", value: event })}
            eventContent={CalendarListing}
            eventClick={(event) =>
              dispatch({ type: "SET_ACTIVE_EVENT", value: event })
            }
          />
        </Box>
      </Box>
    </main>
  );
}

export default Calendar;
