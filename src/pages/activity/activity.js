import { createApp } from "vue";
import Activity from "./Activity.vue";
import router from "@/router/activityRouter";
import store from "@/store/index";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(Activity).use(router).use(store).use(VCalendar).mount("#activity");
