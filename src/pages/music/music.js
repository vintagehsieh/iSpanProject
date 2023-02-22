import { createApp } from "vue";
import Music from "./Music.vue";
import router from "@/router/musicRouter";
import Card from "@/components/Card.vue";

createApp(Music).component('Card', Card).use(router).mount("#music");

