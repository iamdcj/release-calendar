import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import EventForm from "../EventForm/EventForm";
import CalendarListing from "./CalendarListing";
import { Box } from "@mui/material";
import { Event, nameToCode } from "../../_types";
import CalendarToolbar from "./CalendarToolbar";
import { useTheme } from "@mui/material/styles";
import Loader from "../Loader/Loader";
import "./styles.css";
import { useAppContext } from "../../store";
import dayjs from "dayjs";

function Calendar() {
  const theme = useTheme();
  const { showSidebar, events, dispatch } = useAppContext();

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_ENDPOINT as string
      );
      const data = await response.json();
      const events = data.items.map((event: Event) => {
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchEvents();
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
            allDaySlot={false}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            customButtons={{
              addRelease: {
                text: "Add Release  +",
                click() {
                  dispatch({ type: "SET_TENTATIVE_EVENT", value: {} });
                },
              },
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
              center: "title,addRelease",
              right: "timeGridWeek,dayGridMonth,timeGridDay",
            }}
            nowIndicator={true}
            weekends={false}
            events={events}
            initialView="timeGridWeek"
            dateClick={(event) => {
              const now = dayjs();
              if (dayjs(event.dateStr) < now) {
                dispatch({
                  type: "SET_NOTICE",
                  value: {
                    type: "error",
                    content: "Please select a date in the future",
                  },
                });
              } else {
                dispatch({ type: "SET_TENTATIVE_EVENT", value: event });
              }
            }}
            eventContent={CalendarListing}
            datesSet={(currentView) =>
              dispatch({ type: "SET_VIEW", value: currentView?.view?.type })
            }
            eventClick={(event: any) => {
              dispatch({
                type: "SET_ACTIVE_EVENT",
                value: {
                 id: event.event.id,
                 title: event.event.title,
                 start: event.event.start,
                 end: event.event.end,
                  ...event.event.extendedProps,
                },
              });
            }}
          />
        </Box>
      </Box>
    </main>
  );
}

export default Calendar;
