<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  INITIAL_EVENTS,
  createEventId,
} from "@/pages/activity/src/event-utils";
import { zhTwLocale } from "@fullcalendar/core/locales-all";
import axios from "axios";

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const currentEvents = ref([]);
    const events = ref([]);

    const calendarOptions = reactive({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
      },
      locale: zhTwLocale,
      initialView: "dayGridMonth",
      initialEvents: events.value,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      select: handleDateSelect,
      eventClick: handleEventClick,
      eventsSet: handleEvents,
    });

    async function fetchEvents() {
      try {
        const response = await axios
          .get("https://localhost:7043/Members/Activities", {
            withCredentials: true,
          })
          .then((res) => {
            events.value = res.data;
            console.log(events.value);
          });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    onMounted(() => {
      fetchEvents();
    });

    function handleWeekendsToggle() {
      calendarOptions.weekends = !calendarOptions.weekends;
    }

    function handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    }

    function handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    }

    function handleEvents(events) {
      currentEvents.value = events;
    }

    return {
      calendarOptions,
      currentEvents,
      handleWeekendsToggle,
    };
  },
});
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar
        class="demo-app-calendar custom-button"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          />
          toggle weekends
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --fc-button: orange;
  --fc-button-primary: orange;
  --fc-pre-button: orange;
}
.demo-app {
  display: flex;
  width: 80%;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  color: white;

  .demo-app-main {
    flex-grow: 1;
    padding: 3em;
    border: 1px solid white;
    .demo-app-calendar {
      .fc-header-toolbar {
        .fc-toolbar-chunck {
          .fc-toolbar-title {
            color: orange !important;
          }
          .fc-button-group {
            .fc-prev-button .fc-button .fc-button-primary {
              background-color: white;
              color: black;
            }
          }
        }
      }
    }
  }
  .demo-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
    .demo-app-sidebar-section {
      padding: 2em;
    }
  }
}

h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  /* used for event dates/times */
  margin-right: 3px;
}
.fc {
  /* the calendar root */
  max-width: 1400px;
  margin: 0 auto;
}
</style>
