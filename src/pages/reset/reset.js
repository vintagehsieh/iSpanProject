import { createApp } from "vue";
import Reset from "./Reset.vue";
import router from "@/router/resetRouter";

createApp(Reset).use(router).mount("#reset");
