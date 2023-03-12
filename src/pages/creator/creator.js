
import { createApp } from "vue";
import Creator from "./Creator.vue";
import router from "@/router/creatorRouter";

createApp(Creator).use(router).mount("#creator");
