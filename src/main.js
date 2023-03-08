import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import http from '@/plugins/http.js'

createApp(App).use(http).use(store).use(router).mount("#app");
