import { createApp } from "vue";
import Activity from "./Activity.vue";
import router from "@/router/activityRouter";

createApp(Activity).use(router).mount("#activity");
