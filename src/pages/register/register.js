import { createApp } from "vue";
import Register from "./Register.vue";
import router from "@/router/registerRouter";

createApp(Register).use(router).mount("#register");
