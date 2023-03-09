import { createApp } from "vue";
import Login from "./Login.vue";
import store from "@/store/index";
import router from "@/router/loginRouter";

createApp(Login).use(router).use(store).mount("#login");
