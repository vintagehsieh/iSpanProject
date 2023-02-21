import { createApp } from "vue";
import Music from "./Music.vue";
import router from "@/router/musicRouter";

createApp(Music).use(router).mount("#music");
