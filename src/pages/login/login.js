import { createApp } from "vue";
import Login from "./Login.vue";
import router from "@/router/memberRouter";

createApp(Login).use(router).mount("#login");
