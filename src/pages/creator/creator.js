
import { createApp } from "vue";
import Creator from "./Creator.vue";
import router from "@/router/creatorRouter";
import Card from "@/components/creatorCard.vue"

createApp(Creator).component('Card', Card).use(router).mount("#creator");
