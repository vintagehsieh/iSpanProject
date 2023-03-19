import { createApp } from "vue";

import Activity from "./Activity.vue";
import router from "@/router/activityRouter";
import store from "@/store/index";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(Activity).use(router).use(store).mount("#activity");
