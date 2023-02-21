import { createApp } from "vue";
import Shop from "./Shop.vue";
import router from "@/router/shopRouter";

createApp(Shop).use(router).mount("#shop");
