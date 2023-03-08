import { createApp } from "vue";
import Activity from "./Activity.vue";
import router from "@/router/activityRouter";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(Activity).use(router).mount("#activity");
